"""
    HTTPError <: Exception

Wraps a `Requests.Response` when the response status is >= 400.
"""
immutable HTTPError <: Exception
    resp::Response
end

response(err::HTTPError) = err.resp

function Base.showerror(io::IO, err::HTTPError)
    msg = readstring(err.resp)
    print(io, "HTTPError: $msg")
end

"""
    EtcdError <: Exception

Wraps an etcd response `Dict` when the response contains an `"errorCode"`.
"""
immutable EtcdError <: Exception
    resp::Dict
end

response(err::EtcdError) = err.resp

function Base.showerror(io::IO, err::EtcdError)
    err_code = err.resp["errorCode"]
    msg = get(err.resp, "message", "Unknown error")
    print(io, "EtcdError: $msg ($err_code).")
end

"""
    request(f, uri, opts; n=5, max_delay=10.0)

Executes the HTTP request `f` with the given `uri` and `opts` and returns the response body.
JSON responses are parsed with `Requests.json` otherwise a `String` is returned.
For failed HTTP or etcd requests an `HTTPError` or `EtcdError` is thrown respectively.

# Arguments
- `f::Function`: a valid `Requests` method (e.g., `Requests.get`)
- `uri::String`: the HTTP uri
- `opts::Dict`: a set of options to be passed to `f` with the keyword `query`
- `n=5`: the number of retry attempts for the request
- `max_delay=10.0`: delay in seconds between each retry attempt

# Throws
- `HTTPError`: when the HTTP response has a status code >= 400
- `EtcdError`: when the HTTP response body contains "errorCode" which signifies an etcd error

# Returns
- `Dict`: for most etcd response (the parsed json HTTP response body)
- `Array`: some etcd responses return a list vs dict when parse the json HTTP response body
- `String`: all non-json response bodies
"""
function request(f::Function, uri::String, opts::Dict; n=5, max_delay=10.0)
    logger = get_logger(current_module())

    retry_cond(resp) = in(statuscode(resp), 300:400) && haskey(resp.headers, "Location")
    retry_func() = isempty(opts) ? f(uri) : f(uri; query=opts)


    resp = @static if VERSION < v"0.6.0-dev.2042"
        retry(retry_func, retry_cond; n=n, max_delay=max_delay)()
    else
        retry(
            retry_func;
            delays=Base.ExponentialBackOff(n=n, max_delay=max_delay),
            check=retry_cond
        )()
    end

    debug(logger, readstring(resp))

    data = try
        Requests.json(resp)
    catch _
        readstring(resp)
    end

    if isa(data, Dict) && Base.haskey(data, "errorCode")
        error(logger, EtcdError(data))
    elseif statuscode(resp) >= 400
        error(logger, HTTPError(resp))
    end

    return data
end
