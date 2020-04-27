# Setting up Varnish in Linux

::: tip
This guide uses the Ubuntu 18.04 LTS
:::

You use a reverse proxy to limit access to Event Store without breaking HTTP caching (authenticate to the proxy not to Event Store itself). Since Event Store runs HTTP only on the loopback adapter, users must enter through the reverse proxy to reach Event Store. This document provides a brief guide on how to install Event Store with the varnish reverse proxy in a Linux environment. For more information on how to properly configure varnish for your requirements, read the [Varnish documentation](https://www.varnish-cache.org/trac/wiki/Introduction).

[Ben Clark's Gist](https://gist.github.com/benclark/2695148) contains a varnish configuration that includes basic authentication as well as some other niceties such as adding headers for hits/misses.

## Install Varnish

```bash
sudo apt-get update
sudo apt-get install varnish
```

## Configure Varnish

Open _/etc/default/varnish_ and edit the section that looks like the below to the port with the port you want to run on:

```bash
DAEMON_OPTS="-a :80 \
             -T localhost:6082 \
             -f /etc/varnish/default.vcl \
             -S /etc/varnish/secret \
             -s malloc,256m"
```

Open _/etc/varnish/default.vcl_ and edit the `backend` section to match Event Store:

```bash
backend default {
    .host = "127.0.0.1";
    .port = "2114";
}
```

Finally use `sudo service varnish restart` to restart varnish and Event Store should be running with a reverse proxy in front of it. If you want to check the status of varnish, use `varnishstat`.
