---
order: 10
title: Connect with Tailscale
---

## What is Tailscale?

[Tailscale](https://tailscale.com) is a commercial product built on top of WireGuard®. It allows you to set up a private tunnel VPN in a mesh-style network. In addition to direct connection, Tailscale also has the subnet routing feature using a gateway machine, which should be connected to the target network.

You can use the Solo plan with Tailscale free of charge.

## Get started

First, set up a Tailscale account, then install their client software on your machine. The client will ask you to log in after the installation, and then give you your first machine connected to your private VPN.

Follow the [installation instructions](https://tailscale.com/kb/1017/install) to get started.

## Provision the cloud VM

Next, you need to create a small VM in the cloud, connected to the VPC with the Event Store Cloud.

You can choose the smallest available instance size, like `t4g.nano` in AWS, `f1.micro` in GCP, or `Standard B1ls` in Azure. For this guide we use Ubuntu 20.04 LTS image (18.04 LTS in Azure).

When creating the VM, make sure you:
- Connect the default network interface to the VPC peered with Event Store Cloud
- Enable public IP if you want to connect to the VM from your local machine
- GCP: enable _IP Forwarding_ on the default NIC
- AWS: disable _Source / destination checking_

For existing VMs, you can enable IP forwarding too.

::: tabs#cloud
@tab AWS
Select the EC2 instance in the list of instances and in the `Actions` menu choose `Networking` and then `Change source/destination check`. Ensure that the `Stop` checkbox is _enabled_:

![AWS enable ip forward](./images/aws-ip-forward.png)
@tab GCP
On GCP you can enable IP Forward only when creating the VM instance.

On the new VM instance page and scroll down to the `Management, security, disks, networking, sole tenancy` section, expand it, find the `Network interfaces` section and click on the pen icon. There, set the `IP forwarding` to `On`:

![GCP enable ip forward](./images/gcp-ip-forward.png)
:::

Remember to create the VM instance in the same region as the VPC, which is peered with Event Store Cloud.

## Set up Tailscale subnet routing

When you get the cloud VM instance running, connect to it using SSH. The easiest way is to use the cloud browser console.

After logging in, install the Tailscale client for the Linux distribution used for the cloud VM, following the [Tailscale guidelines](https://tailscale.com/kb/1017/install). Here you can also find required steps for [Ubuntu 20.04 LTS (focal)](https://tailscale.com/download/linux/ubuntu-2004) and [Ubuntu 18.04 LTS (bionic)](https://tailscale.com/download/linux/ubuntu-1804) distributions.

When the initial steps are completed, you should be able to ping the cloud VM using its internal IP address from your local machine.

Next, visit the Event Store Cloud console and open the peering page. There you will find the peering you created when following the provisioning guidelines. Write down the details from the `Local Address` and `Remote Address` fields.

For this example, we will use the following peering details:

![Peering page example](./images/peering-example.png)

With all the necessary details collected, follow these steps on the cloud VM instance:

_Enable IP forwarding on the machine:_
```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

_Restart Tailscale client with subnet routing:_
```bash
sudo tailscale up --advertise-routes=10.164.0.0/20,172.22.101.0/24 --accept-routes
```

In the example above we used both address spaces of both sides of the peering as the `advertise-routes` parameter values (comma-separated).

Next, visit your Tailscale Admin Console, find the cloud VM in the list and use the three dots popup menu to enable subnet routing and disable key expiry.

Now, visit the Event Store Cloud console, switch to the Clusters page and choose the EventStoreDB cluster. In the cluster details select the `Addresses` tab and click on the UI link. You should then get the EventStoreDB Admin UI opened in your local machine browser.

This is how the network looks like when using Tailscale:

![ES_Cloud_Networking_tailsacle](./images/es-cloud-networking-tailscale.svg)

