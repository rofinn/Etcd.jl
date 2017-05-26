module Etcd

using Requests
import HttpCommon: Response

immutable Client
    host::String
    port::Int
    version::String
end

include("constants.jl")
include("requests.jl")
include("api.jl")
include("utils.jl")

"""
    connect(host="localhost", port=2379, version="v2")

Creates an `Etcd.Client` which can then be used for making requests to an etcd cluster.
"""
connect(host::String="localhost", port::Int=2379, version="v2") = Client(host, port, version)

export
    # methods
    machines,
    stats,
    members,
    leader,
    set,
    create,
    update,
    setdir,
    createdir,
    updatedir,
    delete,
    cas,
    cad,
    watch,
    watchloop,

    # Types
    HTTPError,
    EtcdError

end # module
