var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Etcd.jl-1",
    "page": "Home",
    "title": "Etcd.jl",
    "category": "section",
    "text": "(Image: stable) (Image: latest) (Image: Build Status) (Image: codecov)A Julia Etcd client implementation. This client wraps the etcd-v2 REST api. Responses from the etcd server containing valid json are parsed into julia Dicts and Arrays, while a String representation is returned for all other successful HTTP requests. For a detailed summary of the etcd responses please review the etcd api documentation."
},

{
    "location": "index.html#Quickstart-1",
    "page": "Home",
    "title": "Quickstart",
    "category": "section",
    "text": "julia> Pkg.add(\"Etcd\")\n\njulia> using Etcd"
},

{
    "location": "index.html#Configure-the-Etcd-server-1",
    "page": "Home",
    "title": "Configure the Etcd server",
    "category": "section",
    "text": "The library defaults to Etcd server at 127.0.0.1:2379.cli = Etcd.connect(\"127.0.0.1\", 2379, \"v2\")Or you can specify the server ip address and port number.cli = Etcd.connect(\"172.17.42.1\", 5001)"
},

{
    "location": "index.html#Using-Etcd-Client-1",
    "page": "Home",
    "title": "Using Etcd Client",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Get-all-machines-in-the-cluster-1",
    "page": "Home",
    "title": "Get all machines in the cluster",
    "category": "section",
    "text": "julia> Etcd.connect(\"127.0.0.1\", 2379, \"v2\")\n\njulia> machines(cli)"
},

{
    "location": "index.html#Setting-Key-Values-1",
    "page": "Home",
    "title": "Setting Key Values",
    "category": "section",
    "text": "cli = Etcd.connect(\"127.0.0.1\", 2379, \"v2\")Set a value on the /foo/bar key:julia> set(cli, \"/foo/bar\", \"Hello World\")Set a value on the /foo/bar key with a value that expires in 60 seconds:julia> set(cli, \"/foo/bar\", \"Hello World\", ttl=60)Note that the ttl value can be set with all the following commands by specifying ttl=ttl_expiry_time_in_secondsConditionally set a value on /foo/bar if the previous value was \"Hello world\". test_and_set is an alias for compare_and_swap.julia> cas(cli, \"/foo/bar\", \"Goodbye Cruel World\", prev_value=\"Hello World\")You can also conditionally set a value based on the previous etcd index. Conditionally set a value on /foo/bar if the previous etcd index was 1818:julia> cas(cli, \"/foo/bar\",\" Goodbye Cruel World\", prev_index=1818)Create a new key /foo/boo, only if the key did not previously exist:julia> create(cli, \"/foo/boo\", \"Hello World\")Create a new dir /fooDir, only if the directory did not previously exist:julia> createdir(cli, \"/fooDir\")Update an existing key /foo/bar, only if the key already existed:julia> update(cli, \"/foo/boo\", \"Merhaba\")You can also Create (createdir) or update (updatedir) a directory."
},

{
    "location": "index.html#Retrieving-key-values-1",
    "page": "Home",
    "title": "Retrieving key values",
    "category": "section",
    "text": "Get the current value for a single key in the local etcd node:julia> get(cli,\"/foo/bar\")Add recursive=true to recursively list sub-directories.Check for existence of a key:julia> exists(cli,\"/foo/bar\")\ntrue"
},

{
    "location": "index.html#Deleting-keys-1",
    "page": "Home",
    "title": "Deleting keys",
    "category": "section",
    "text": "Delete a key:julia> createdir(cli, \"/foo/qux\")\njulia> delete(cli, \"/foo/boo\")Delete an empty directory:julia> deletedir(cli, \"/foo/qux\")Recursively delete a key and all child keys:julia> get(cli, \"/foo\", recursive=true)\n\njulia> deletedir(cli, \"/foo\", recursive=true)\n\njulia> get(cli, \"/foo\", recursive=true)Conditionally delete /foo/bar if the previous value was \"Hello world\":julia> create(cli, \"/foo/bar\", \"bar value\")\n\njulia> cad(cli, \"/foo/bar\", prev_value=\"bar value\")Conditionally delete /foo/bar if the previous etcd index was 1849:julia>create(cli, \"/foo/bar\", \"Hello World\")\n\njulia> cad(cli, \"/foo/bar\", prev_index=1849)"
},

{
    "location": "index.html#Watching-for-changes-1",
    "page": "Home",
    "title": "Watching for changes",
    "category": "section",
    "text": "You can also create asynchronous watch routines with watch or watchloop. These methods will return the executed watch Task.Watch for only the next change on a key:julia> t = watch(resp -> println(\"I'm watching you: $resp\"), cli, \"/foo/bar\")To continuously watch a key:julia> t = watchloop(cli, \"/foo/bar\"; recursive=true) do resp\n    # Run some code with response\nendA termination condition (a Function which takes the etcd response and returns a Bool) can be used to exit the watch loop:julia> predicate(r) = r[\"node\"][\"modifiedIndex\"] > 5\n\njulia> t = watchloop(cli, \"/foo\", predicate; recursive=true) do resp\n    # Run some code with response\nendYou can also specify the following options:recursive=true to watch the key and all it's children.\nwait_index to watch starting with the provided index."
},

{
    "location": "index.html#Getting-cluster-information-1",
    "page": "Home",
    "title": "Getting cluster information",
    "category": "section",
    "text": "You can retrieve Etcd stats by specifying one of store, self or leader.For example to get the store stats:julia> stats(etcd, \"store\")You can also get the current leader with:julia> leader(etcd)or a list of members with:julia> members(etcd)"
},

{
    "location": "api.html#",
    "page": "API",
    "title": "API",
    "category": "page",
    "text": ""
},

{
    "location": "api.html#Etcd.connect",
    "page": "API",
    "title": "Etcd.connect",
    "category": "Function",
    "text": "connect(host=\"localhost\", port=2379, version=\"v2\")\n\nCreates an Etcd.Client which can then be used for making requests to an etcd cluster.\n\n\n\n"
},

{
    "location": "api.html#Base.get-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Base.get",
    "category": "Method",
    "text": "get(cli, key, sort=false, recursive=false) -> Dict\n\nFetches a value from the specified key from the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#get-the-value-of-a-key\n\n\n\n"
},

{
    "location": "api.html#Etcd.cad-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.cad",
    "category": "Method",
    "text": "cad(cli, key; prev_value=nothing, prev_index=-1) -> Dict\n\nPerforms an atomic compare-and-delete on the key in the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#atomic-compare-and-delete\n\n\n\n"
},

{
    "location": "api.html#Etcd.cas-Tuple{Etcd.Client,String,String}",
    "page": "API",
    "title": "Etcd.cas",
    "category": "Method",
    "text": "cas(cli, key, value; prev_value=nothing, prev_index=-1, ttl=-1) -> Dict\n\nPerforms an atomic compare-and-swap with the key and value on the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#atomic-compare-and-swap\n\n\n\n"
},

{
    "location": "api.html#Etcd.create-Tuple{Etcd.Client,String,String}",
    "page": "API",
    "title": "Etcd.create",
    "category": "Method",
    "text": "create(cli, key, value; ttl=-1) -> Dict\n\nCreates a new key/value pair on the etcd cluster, asserting that the key does not already exist.\n\n\n\n"
},

{
    "location": "api.html#Etcd.createdir-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.createdir",
    "category": "Method",
    "text": "createdir(cli, key; ttl=-1) -> Dict\n\nCreates a new directory on the etcd cluster, asserting that the directory does not already exist.\n\n\n\n"
},

{
    "location": "api.html#Etcd.delete-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.delete",
    "category": "Method",
    "text": "delete(cli, key) -> Dict\n\nRemoves the key from the etcd cluster.\n\n\n\n"
},

{
    "location": "api.html#Etcd.deletedir-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.deletedir",
    "category": "Method",
    "text": "deletedir(cli, key; recursive=false) -> Dict\n\nRemoves the directory from the etcd cluster.\n\n\n\n"
},

{
    "location": "api.html#Etcd.exists-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.exists",
    "category": "Method",
    "text": "exists(cli, key) -> Bool\n\nReturns whether the key exists in the etcd cluster.\n\n\n\n"
},

{
    "location": "api.html#Etcd.set-Tuple{Etcd.Client,String,String}",
    "page": "API",
    "title": "Etcd.set",
    "category": "Method",
    "text": "set(cli, key, value; ttl=-1, ordered=false) -> Dict\n\nSets the value for the specified key in the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#changing-the-value-of-a-key\n\n\n\n"
},

{
    "location": "api.html#Etcd.setdir-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.setdir",
    "category": "Method",
    "text": "setdir(cli, key; ttl=-1) -> Dict\n\nCreates a directory with the specified key on the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#creating-directories\n\n\n\n"
},

{
    "location": "api.html#Etcd.update-Tuple{Etcd.Client,String,String}",
    "page": "API",
    "title": "Etcd.update",
    "category": "Method",
    "text": "update(cli, key, value; ttl=-1) -> Dict\n\nUpdates an existing key with a new value on the etcd cluster, asserting that the key must already exist.\n\n\n\n"
},

{
    "location": "api.html#Etcd.updatedir-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.updatedir",
    "category": "Method",
    "text": "updatedir(cli, key; ttl=-1) -> Dict\n\nUpdates the name of a direcotry on the etcd cluster, asserting that the directory already exists.\n\n\n\n"
},

{
    "location": "api.html#Etcd.watch-Tuple{Function,Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.watch",
    "category": "Method",
    "text": "watch(f, cli, key; wait_index=-1, recursive=false)\n\nCreates an asynchronous Task which watches the key on the etcd cluster and runs function f on the response.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#waiting-for-a-change\n\n\n\n"
},

{
    "location": "api.html#Etcd.watchloop",
    "page": "API",
    "title": "Etcd.watchloop",
    "category": "Function",
    "text": "watchloop(f, cli, key, [p]; wait_index=-1, recursive=false)\n\nCreates an asynchrous Task which continously watches the key on the etcd cluster and runs function f on the response. The predicate function p represents a termination condition to exit the loop.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#waiting-for-a-change\n\n\n\n"
},

{
    "location": "api.html#Etcd.machines-Tuple{Etcd.Client}",
    "page": "API",
    "title": "Etcd.machines",
    "category": "Method",
    "text": "machines(cli) -> Array\n\nReturns an array of machines (socket addresses) in the cluster.\n\n\n\n"
},

{
    "location": "api.html#Etcd.stats-Tuple{Etcd.Client,String}",
    "page": "API",
    "title": "Etcd.stats",
    "category": "Method",
    "text": "stats(cli, stats_type) -> Dict\n\nFetches any stats from the cluster (stats_type may be \"store\", \"self\" or \"leader\")\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#statistics\n\n\n\n"
},

{
    "location": "api.html#Etcd.leader-Tuple{Etcd.Client}",
    "page": "API",
    "title": "Etcd.leader",
    "category": "Method",
    "text": "leader(cli) -> Dict\n\nFetchers the stats for the leader of the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md#leader-statistics\n\n\n\n"
},

{
    "location": "api.html#Etcd.members-Tuple{Etcd.Client}",
    "page": "API",
    "title": "Etcd.members",
    "category": "Method",
    "text": "members(cli) -> Dict\n\nReturns a dict (id, member) of members in the etcd cluster.\n\nReference: https://github.com/coreos/etcd/blob/master/Documentation/v2/members_api.md#list-members\n\n\n\n"
},

{
    "location": "api.html#Etcd.request",
    "page": "API",
    "title": "Etcd.request",
    "category": "Function",
    "text": "request(f, uri, opts; n=5, max_delay=10.0)\n\nExecutes the HTTP request f with the given uri and opts and returns the response body. JSON responses are parsed with Requests.json otherwise a String is returned. For failed HTTP or etcd requests an HTTPError or EtcdError is thrown respectively.\n\nArguments\n\nf::Function: a valid Requests method (e.g., Requests.get)\nuri::String: the HTTP uri\nopts::Dict: a set of options to be passed to f with the keyword query\nn=5: the number of retry attempts for the request\nmax_delay=10.0: delay in seconds between each retry attempt\n\nThrows\n\nHTTPError: when the HTTP response has a status code >= 400\nEtcdError: when the HTTP response body contains \"errorCode\" which signifies an etcd error\n\nReturns\n\nDict: for most etcd response (the parsed json HTTP response body)\nArray: some etcd responses return a list vs dict when parse the json HTTP response body\nString: all non-json response bodies\n\n\n\n"
},

{
    "location": "api.html#Etcd.HTTPError",
    "page": "API",
    "title": "Etcd.HTTPError",
    "category": "Type",
    "text": "HTTPError <: Exception\n\nWraps a Requests.Response when the response status is >= 400.\n\n\n\n"
},

{
    "location": "api.html#Etcd.EtcdError",
    "page": "API",
    "title": "Etcd.EtcdError",
    "category": "Type",
    "text": "EtcdError <: Exception\n\nWraps an etcd response Dict when the response contains an \"errorCode\".\n\n\n\n"
},

{
    "location": "api.html#Etcd.install",
    "page": "API",
    "title": "Etcd.install",
    "category": "Function",
    "text": "install(force=true)\n\nDownloads and installs a local etcd server (mostly for testing).\n\n\n\n"
},

{
    "location": "api.html#Etcd.start",
    "page": "API",
    "title": "Etcd.start",
    "category": "Function",
    "text": "start(timeout=-1) -> Future\n\nStarts up the local etcd server (mostly for testing). The timeout specifies a number of seconds to run the server for (using timeout or gtimeout).\n\n\n\n"
},

{
    "location": "api.html#API-1",
    "page": "API",
    "title": "API",
    "category": "section",
    "text": "Etcd.connect\nBase.get(::Etcd.Client, ::String)Modules = [Etcd]\nPrivate = false\nPages = [\n    \"api/keys.jl\",\n    \"api/watch.jl\",\n    \"api/machines.jl\",\n    \"api/stats.jl\",\n    \"api/leaders.jl\",\n    \"api/members.jl\"\n]Etcd.request\nHTTPError\nEtcdError\nEtcd.install\nEtcd.start"
},

{
    "location": "contributing.html#",
    "page": "Contributing",
    "title": "Contributing",
    "category": "page",
    "text": ""
},

{
    "location": "contributing.html#Get-started-contributing-1",
    "page": "Contributing",
    "title": "Get started contributing",
    "category": "section",
    "text": "Detailed docs on contributing to Julia packages can be found here."
},

{
    "location": "contributing.html#Code-and-docs-1",
    "page": "Contributing",
    "title": "Code and docs",
    "category": "section",
    "text": "To start hacking code or writing docs, simply:julia> Pkg.add(\"Etcd\"); Pkg.checkout(\"Etcd\")\n???\n~~Profit~~ Share with the world!"
},

{
    "location": "contributing.html#Bugs,-features,-and-requests-1",
    "page": "Contributing",
    "title": "Bugs, features, and requests",
    "category": "section",
    "text": "Feel free to file issues when you encounter bugs, think of interesting features you'd like to see, or when there are important changes not yet included in a release and you'd like us to tag a new version."
},

{
    "location": "contributing.html#Submitting-your-contributions-1",
    "page": "Contributing",
    "title": "Submitting your contributions",
    "category": "section",
    "text": "By contributing code to Etcd.jl, you are agreeing to release your work under the MIT License.We love contributions in the form of pull requests! Assuming you've been working in a repo checked out as above, this should be easy to do. For a detailed walkthrough, check here, otherwise:Navigate to Etcd.jl and create a fork.\ngit remote add origin https://github.com/user/Etcd.jl.git\ngit push origin master\nSubmit your changes as a pull request!"
},

]}
