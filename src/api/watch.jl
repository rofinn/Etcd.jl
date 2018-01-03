"""
    watch(f, cli, key; wait_index=-1, recursive=false)

Creates an asynchronous `Task` which watches the `key` on the etcd cluster and runs
function `f` on the response.
See the [etcd API](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#waiting-for-a-change)
for more details.
"""
function watch(f::Function, cli::Client, key::String; wait_index::Int=-1, recursive::Bool=false)
    t = @async begin
        opts = Dict{String, Any}("wait" => true)

        if recursive
            opts["recursive"] = recursive
        end

        if wait_index > 0
            opts["waitIndex"] = wait_index
        end

        resp = get(cli, key, opts; recursive=recursive)
        f(resp)
    end

    return t
end

"""
    watchloop(f, cli, key, [p]; wait_index=-1, recursive=false)

Creates an asynchrous `Task` which continously watches the `key` on the etcd cluster and
runs function `f` on the response.
The predicate function `p` represents a termination condition to exit the loop.
See the [etcd API](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#waiting-for-a-change)
for more details.
"""
function watchloop(
    f::Function, cli::Client, key::String, p::Function=(resp) -> false;
    wait_index::Int=-1, recursive::Bool=false
)
    t = @async begin
        while true
            opts = Dict{String, Any}("wait" => true)

            if recursive
                opts["recursive"] = recursive
            end

            if wait_index > 0
                opts["waitIndex"] = wait_index
            end

            resp = get(cli, key, opts; recursive=recursive)
            f(resp)

            if p(resp)
                break
            end

            if wait_index > 0
                wait_index += 1
            end
        end
    end

    return t
end
