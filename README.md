# Etcd.jl
[![stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://rofinn.github.io/Etcd.jl/stable/)
[![latest](https://img.shields.io/badge/docs-latest-blue.svg)](https://rofinn.github.io/Etcd.jl/latest/)
[![Build Status](https://travis-ci.org/rofinn/Etcd.jl.svg?branch=master)](https://travis-ci.org/rofinn/Etcd.jl)
[![codecov](https://codecov.io/gh/rofinn/Etcd.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/rofinn/Etcd.jl)

A Julia [Etcd](https://github.com/coreos/etcd) client implementation.
This client wraps the [etcd-v2 REST api](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md).
Responses from the etcd server containing valid json are parsed into julia `Dict`s and `Array`s, while a `String` representation is returned for all other successful HTTP requests.
For a detailed summary of the etcd responses please review the [etcd api documentation](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md).
