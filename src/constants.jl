global const ETCD_VER = "v3.2.12"
global const ETCD_DEPS_PATH = joinpath(dirname(dirname(@__FILE__)), "deps")
global const ETCD_SRC_PATH = if is_apple()
    joinpath(ETCD_DEPS_PATH, "etcd-$(ETCD_VER)-darwin-amd64.zip")
elseif is_linux()
    joinpath(ETCD_DEPS_PATH, "etcd-$(ETCD_VER)-linux-amd64.tar.gz")
end

global const ETCD_DEST_PATH = if is_apple()
    joinpath(ETCD_DEPS_PATH, "etcd-$(ETCD_VER)-darwin-amd64")
elseif is_linux()
    joinpath(ETCD_DEPS_PATH, "etcd-$(ETCD_VER)-linux-amd64")
end

global const ETCD_BIN = joinpath(ETCD_DEST_PATH, "etcd")

global const ETCD_DOWNLOAD_URI = if is_apple()
    "https://github.com/coreos/etcd/releases/download/$(ETCD_VER)/etcd-$(ETCD_VER)-darwin-amd64.zip"
elseif is_linux()
    "https://github.com/coreos/etcd/releases/download/$(ETCD_VER)/etcd-$(ETCD_VER)-linux-amd64.tar.gz"
else
    ""
end
