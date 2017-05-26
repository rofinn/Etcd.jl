function keysuri(cli::Client, key::String)
    return "http://$(cli.host):$(cli.port)/$(cli.version)/keys$(key)"
end

"""
    get(cli, key, sort=false, recursive=false) -> Dict

Fetches a value from the specified `key` from the etcd cluster.

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#get-the-value-of-a-key
"""
function Base.get(cli::Client, key::String; sort::Bool=false, recursive::Bool=false)
    return get(cli, key, Dict{String, Any}(); sort=sort, recursive=recursive)
end

function Base.get(cli::Client, key::String, opts::Dict{String, Any}; sort::Bool=false, recursive::Bool=false)
    opts["sorted"] = sort
    opts["recursive"] = recursive
    opts = filter!((key, val) -> !isa(val, Bool) || val, opts)
    return request(Requests.get, keysuri(cli, key), opts)
end

function put(cli::Client, key::String, opts::Dict{String, Any}; ttl::Int=-1)
    if ttl > 0
        opts["ttl"] = ttl
    end

    return request(Requests.put, keysuri(cli, key), opts)
end

function post(cli::Client, key::String, opts::Dict{String, Any}; ttl::Int=-1)
    if ttl > 0
        opts["ttl"] = ttl
    end

    return request(Requests.post, keysuri(cli, key), opts)
end

function delete(cli::Client, key::String, opts::Dict{String, Any})
    return request(Requests.delete, keysuri(cli, key), opts)
end

"""
    set(cli, key, value; ttl=-1, ordered=false) -> Dict

Sets the `value` for the specified `key` in the etcd cluster.

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#changing-the-value-of-a-key
"""
function set(cli::Client, key::String, value::String; ttl::Int=-1, ordered=false)
    opts = Dict{String, Any}("value" => value)

    if ordered
        return post(cli, key, opts; ttl=ttl)
    else
        return put(cli, key, opts; ttl=ttl)
    end
end

"""
    setdir(cli, key; ttl=-1) -> Dict

Creates a directory with the specified `key` on the etcd cluster.

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#creating-directories
"""
function setdir(cli::Client, key::String; ttl::Int=-1)
    opts = Dict{String, Any}("value" => "", "dir" => true)
    return put(cli, key, opts; ttl=ttl)
end

"""
    create(cli, key, value; ttl=-1) -> Dict

Creates a new key/value pair on the etcd cluster, asserting that the key does not already exist.
"""
function create(cli::Client, key::String, value::String; ttl::Int=-1)
    opts = Dict{String, Any}("value" => value, "prevExist" => false)
    return put(cli, key, opts; ttl=ttl)
end

"""
    update(cli, key, value; ttl=-1) -> Dict

Updates an existing key with a new value on the etcd cluster, asserting that the key must already exist.
"""
function update(cli::Client, key::String, value::String; ttl::Int=-1)
    opts = Dict{String, Any}("value" => value, "prevExist" => true)
    return put(cli, key, opts; ttl=ttl)
end

"""
    createdir(cli, key; ttl=-1) -> Dict

Creates a new directory on the etcd cluster, asserting that the directory does not already exist.
"""
function createdir(cli::Client, key::String; ttl::Int=-1)
    opts = Dict{String, Any}("value" => "", "prevExist" => false, "dir" => true)
    return put(cli, key, opts; ttl=ttl)
end

"""
    updatedir(cli, key; ttl=-1) -> Dict

Updates the name of a direcotry on the etcd cluster, asserting that the directory already exists.
"""
function updatedir(cli::Client, key::String; ttl::Int=-1)
    opts = Dict{String, Any}("value" => "", "prevExist" => true, "dir" => true)
    return put(cli, key, opts; ttl=ttl)
end

"""
    exists(cli, key) -> Bool

Returns whether the `key` exists in the etcd cluster.
"""
function exists(cli::Client, key::String)
    try
        Base.get(cli, key)
        return true
    catch err
        # expect "Key not found"(100) error
        if err.resp["errorCode"] == 100
            return false
        else
            rethrow()
        end
    end
end

Base.haskey(cli::Client, key::String) = exists(cli, key)

"""
    delete(cli, key) -> Dict

Removes the `key` from the etcd cluster.
"""
delete(cli::Client, key::String) = delete(cli, key, Dict())

"""
    deletedir(cli, key; recursive=false) -> Dict

Removes the directory from the etcd cluster.
"""
function deletedir(cli::Client, key::String; recursive::Bool=false)
    opts = Dict{String, Any}("dir" => true, "recursive" => recursive)
    delete(cli, key, filter!((k,v)->v, opts))
end

"""
    cad(cli, key; prev_value=nothing, prev_index=-1) -> Dict

Performs an atomic compare-and-delete on the `key` in the etcd cluster.

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#atomic-compare-and-delete
"""
function cad(
    cli::Client, key::String;
    prev_value::Union{String, Void}=nothing, prev_index::Int=-1,
)
    opts = Dict{String, Any}()
    if prev_value !== nothing
       opts["prevValue"] = prev_value
    end

    if prev_index > 0
       opts["prevIndex"] = prev_index
    end

    return delete(cli, key, opts)
end

"""
    cas(cli, key, value; prev_value=nothing, prev_index=-1, ttl=-1) -> Dict

Performs an atomic compare-and-swap with the `key` and `value` on the etcd cluster.

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#atomic-compare-and-swap
"""
function cas(
    cli::Client, key::String, value::String;
    prev_value::Union{String, Void}=nothing, prev_index::Int=-1, ttl::Int=-1
)
    opts = Dict{String, Any}("value" => value)

    if prev_value !== nothing
       opts["prevValue"] = prev_value
    end

    if prev_index > 0
       opts["prevIndex"] = prev_index
    end

    return put(cli, key, opts; ttl=ttl)
end
