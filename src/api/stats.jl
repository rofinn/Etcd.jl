function statsuri(cli::Client, stats_type::String)
    return "http://$(cli.host):$(cli.port)/$(cli.version)/stats/$(stats_type)"
end

"""
    stats(cli, stats_type) -> Dict

Fetches any stats from the cluster (`stats_type` may be "store", "self" or "leader")

Reference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#statistics
"""
function stats(cli::Client, stats_type::String)
    return request(Requests.get, statsuri(cli, stats_type), Dict())
end
