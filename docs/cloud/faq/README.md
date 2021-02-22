# FAQ

## No DNS Resolution of the cluster

Some ISP, router and DNS servers will not resolve or filter out answers to DNS queries for  `xxxx.mesdb.eventstore.cloud` because the address resolves to a private IP range.

To check if this is the issue you have, perform the following `nslookup` replacing the domain by your cluster DNS name.
``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud
```
If the answer looks like the following, you're having this issue:
```
Server:         192.168.192.1
Address:        192.168.192.1#53

Non-authoritative answer:
*** Can't find buh63kqrh41nfqpviing.mesdb.eventstore.cloud: No answer
```

To check if the domain exists, perform the same check with a specific DNS server
``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud 1.1.1.1
```
If the answer looks like the following, either change or contact the administrator of the DNS server you use: 
```
Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    buh63kqrh41nfqpviing.mesdb.eventstore.cloud
Addresses:  172.29.98.189
172.29.98.150
172.29.98.108
```
