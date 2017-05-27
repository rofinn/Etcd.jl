leaderuri(cli::Client) = "http://$(cli.host):$(cli.port)/$(cli.version)/stats/leader"

"""
    leader(cli) -> Dict

Fetchers the stats for the leader of the etcd cluster.
See the [etcd API](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#leader-statistics)
for more details.
"""
function leader(cli::Client)
    leader_id = request(Requests.get, leaderuri(cli), Dict())["leader"]
    return members(cli)[leader_id]
end
