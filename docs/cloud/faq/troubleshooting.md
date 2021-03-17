# Troubleshooting

### The cluster DNS name does not resolve on my machine, what do I do? 

Some Interner providers, routers, and DNS servers will not resolve or filter out answers to DNS queries for `xxxx.mesdb.eventstore.cloud` because the DNS name resolves to a private IP range.

You can check if that's the issue you're experiencing, run the following `nslookup` query. Replace the domain name by your cluster DNS name.

``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud
```

If the answer looks like the following, you're having the issue we just described:

```
Server:         192.168.192.1
Address:        192.168.192.1#53

Non-authoritative answer:
*** Can't find buh63kqrh41nfqpviing.mesdb.eventstore.cloud: No answer
```

To check if the domain exists, perform the same check with a specific DNS server:

``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud 1.1.1.1
```

Most probably, you will get a proper DNS resolution answer:

```
Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    buh63kqrh41nfqpviing.mesdb.eventstore.cloud
Addresses:  172.29.98.189
172.29.98.150
172.29.98.108
```

If the cluster DNS name resolves using an external DNS server, but your local DNS server fails or rejects to resolve it, you can try the following:

- If the issue is in the router, and you can configure it, check the router documentation to allow DNS queries, which resolve to private IP ranges.
- When you are sure that the router is fine, it might be your Interner provider, which is blocking such queries. Try getting in touch with them to resolve the issue.
- You can also reconfigure your router, or your machine, to use public DNS servers like `1.1.1.1` or `8.8.8.8`.
