**[Quickstart](#quickstart)** |
**[Configure the Etcd server](#configure-the-etcd-server)** |
**[Using Etcd Client](#using-etcd-client)**

# Etcd.jl
[![stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://rofinn.github.io/Etcd.jl/stable/)
[![latest](https://img.shields.io/badge/docs-latest-blue.svg)](https://rofinn.github.io/Etcd.jl/latest/)
[![Build Status](https://travis-ci.org/rofinn/Etcd.jl.svg?branch=master)](https://travis-ci.org/rofinn/Etcd.jl)
[![codecov](https://codecov.io/gh/rofinn/Etcd.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/rofinn/Etcd.jl)

A Julia [Etcd](https://github.com/coreos/etcd) client implementation.
This client wraps the [etcd-v2 REST api](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md).
Responses from the etcd server containing valid json are parsed into julia `Dict`s and `Array`s, while a `String` representation is returned for all other successful HTTP requests.
For a detailed summary of the etcd responses please review the [etcd api documentation](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md).

## Quickstart

```julia
julia> Pkg.add("Etcd")

julia> using Etcd
```

### Configure the Etcd server

The library defaults to Etcd server at 127.0.0.1:2379.


```julia
cli = Etcd.connect("127.0.0.1", 2379, "v2")
```

Or you can specify the server ip address and port number.

```julia
cli = Etcd.connect("172.17.42.1", 5001)
```

### Using Etcd Client

#### Get all machines in the cluster

```julia
julia> Etcd.connect("127.0.0.1", 2379, "v2")

julia> machines(cli)
```

#### Setting Key Values


```julia
cli = Etcd.connect("127.0.0.1", 2379, "v2")
```

Set a value on the `/foo/bar` key:

```julia
julia> set(cli, "/foo/bar", "Hello World")
```

Set a value on the `/foo/bar` key with a value that expires in 60 seconds:

```julia
julia> set(cli, "/foo/bar", "Hello World", ttl=60)
```

Note that the ttl value can be set with all the following commands by specifying `ttl=ttl_expiry_time_in_seconds`

Conditionally set a value on `/foo/bar` if the previous value was "Hello world". `test_and_set` is an alias for `compare_and_swap`.

```julia
julia> cas(cli, "/foo/bar", "Goodbye Cruel World", prev_value="Hello World")
```

You can also conditionally set a value based on the previous etcd index.
Conditionally set a value on `/foo/bar` if the previous etcd index was 1818:

```julia
julia> cas(cli, "/foo/bar"," Goodbye Cruel World", prev_index=1818)
```

Create a new key `/foo/boo`, only if the key did not previously exist:

```julia
julia> create(cli, "/foo/boo", "Hello World")
```

Create a new dir `/fooDir`, only if the directory did not previously exist:

```julia
julia> createdir(cli, "/fooDir")
```

Update an existing key `/foo/bar`, only if the key already existed:

```julia
julia> update(cli, "/foo/boo", "Merhaba")
```

You can also Create (`createdir`) or update (`updatedir`) a directory.

#### Retrieving key values

Get the current value for a single key in the local etcd node:

```julia
julia> get(cli,"/foo/bar")
```

Add `recursive=true` to recursively list sub-directories.

Check for existence of a key:

```julia
julia> exists(cli,"/foo/bar")
true
```

#### Deleting keys

Delete a key:

```julia
julia> createdir(cli, "/foo/qux")
julia> delete(cli, "/foo/boo")
```

Delete an empty directory:

```julia
julia> deletedir(cli, "/foo/qux")
```

Recursively delete a key and all child keys:

```julia
julia> get(cli, "/foo", recursive=true)

julia> deletedir(cli, "/foo", recursive=true)

julia> get(cli, "/foo", recursive=true)
```

Conditionally delete `/foo/bar` if the previous value was "Hello world":

```julia
julia> create(cli, "/foo/bar", "bar value")

julia> cad(cli, "/foo/bar", prev_value="bar value")
```

Conditionally delete `/foo/bar` if the previous etcd index was 1849:

```julia
julia>create(cli, "/foo/bar", "Hello World")

julia> cad(cli, "/foo/bar", prev_index=1849)
```

#### Watching for changes

You can also create asynchronous watch routines with `watch` or `watchloop`.
These methods will return the executed watch `Task`.

Watch for only the next change on a key:

```julia
julia> t = watch(resp -> println("I'm watching you: $resp"), cli, "/foo/bar")
```

To continuously watch a key:

```julia
julia> t = watchloop(cli, "/foo/bar"; recursive=true) do resp
    foo(resp)
end
```

A termination condition (a `Function` which takes the etcd response and returns a `Bool`) can be used to exit the watch loop:

```julia
julia> predicate(r) = r["node"]["modifiedIndex"] > 5

julia> t = watchloop(cli, "/foo", predicate; recursive=true) do
    bar(resp)
end
```

You can also specify the following options:

- `recursive=true` to watch the key and all it's children.
- `wait_index` to watch starting with the provided index.


#### Getting cluster information

You can retrieve Etcd stats by specifying one of `store`, `self` or `leader`.

For example to get the `store` stats:

```julia
julia> stats(etcd, "store")
```

You can also get the current leader with:

```julia
julia> leader(etcd)
```

or a list of members with:
```julia
julia> members(etcd)
```
