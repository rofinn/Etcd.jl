# API

```@docs
Etcd.connect
Base.get(::Etcd.Client, ::String)
```

```@autodocs
Modules = [Etcd]
Private = false
Pages = [
    "api/keys.jl",
    "api/watch.jl",
    "api/machines.jl",
    "api/stats.jl",
    "api/leaders.jl",
    "api/members.jl"
]
```

```@docs
Etcd.request
HTTPError
EtcdError
Etcd.install
Etcd.start
```
