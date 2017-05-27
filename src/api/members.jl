membersuri(cli::Client) = "http://$(cli.host):$(cli.port)/$(cli.version)/members"

"""
    members(cli) -> Dict

Returns a dict (id, member) of members in the etcd cluster.
See the [etcd API](https://github.com/coreos/etcd/blob/master/Documentation/v2/members_api.md#list-members)
for more details.
"""
function members(cli::Client)
    resp = request(Requests.get, membersuri(cli), Dict())
    return map(m -> m["id"] => m, resp["members"]) |> Dict
end
