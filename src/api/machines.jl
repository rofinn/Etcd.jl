machinesuri(cli::Client) = "http://$(cli.host):$(cli.port)/$(cli.version)/machines"

"""
    machines(cli) -> Array

Returns an array of machines (socket addresses) in the cluster.
"""
function machines(cli::Client)
    resp = request(Requests.get, machinesuri(cli), Dict())
    return map(strip, split(resp, ','))
end
