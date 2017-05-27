using Documenter
using Etcd

makedocs(
    modules=[Etcd],
    format=:html,
    repo="https://github.com/rofinn/Etcd.jl/blob/{commit}{path}#L{line}",
    sitename="Etcd.jl",
    authors="Rory Finnegan and contributor.",
    pages=Any[
        "Home" => "index.md",
        "API" => "api.md",
        "Contributing" => "contributing.md",
    ],
)

deploydocs(
    repo   = "github.com/rofinn/Etcd.jl.git",
    julia  = "0.5",
    target = "build",
    deps = nothing,
    make = nothing,
)
