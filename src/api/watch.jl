function watch(
    f::Function, cli::Client, key::String;
    wait_index::Int=-1, recursive::Bool=false
)
    t = @async begin
        opts = Dict{String, Any}("wait" => true)

        if recursive
            opts["recursive"] = recursive
        end

        if wait_index > 0
            opts["waitIndex"] = wait_index
        end

        resp = get(cli, key, opts)
        f(resp)
    end

    return t
end

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

            resp = get(cli, key, opts)
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
