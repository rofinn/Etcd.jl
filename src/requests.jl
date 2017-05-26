immutable HTTPError <: Exception
    resp::Response
end

response(err::HTTPError) = err.resp

function Base.showerror(io::IO, err::HTTPError)
    msg = readstring(err.resp)
    println(io, "HTTPError: $msg")
end

immutable EtcdError <: Exception
    resp::Dict
end

response(err::EtcdError) = err.resp

function Base.showerror(io::IO, err::EtcdError)
    err_code = err.resp["errorCode"]
    msg = get(err.resp, "message", "Unknown error")
    println(io, "EtcdError: $msg ($err_code).")
end

function request(f::Function, uri::String, opts::Dict; n=5, max_delay=10.0)
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

    data = try
        Requests.json(resp)
    catch _
        readstring(resp)
    end

    if isa(data, Dict) && Base.haskey(data, "errorCode")
        throw(EtcdError(data))
    elseif statuscode(resp) >= 400
        throw(HTTPError(resp))
    end

    return data
end
