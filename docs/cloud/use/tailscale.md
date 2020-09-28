# Connect with Tailscale

In many organisations, which work with the cloud you can find the connection between the cloud networks and your local network already established using a Virtual Private Gateway or Site-to-Site VPN connection. However, if you starting on the side and want to keep things simple, you can use Tailscale to connect to the Event Store Cloud cluster.

## What is Tailscale?

[Tailscale](https://tailscale.com) is a commercial product built on top of WireGuard®. It allows you to set up a private tunnel VPN in a mesh-style network. In addition to direct connection, Tailscale also has the subnet routing feature using a gateway machine, which should be connected to the target network. 

You can use the Solo plan with Tailscale free of charge.

## Get started

You need a Tailscale account first and then install their client software on your machine. The client will ask you to log in after the installation and then you get your first machine connected to your private VPN.

Follow the [installation instructions](https://tailscale.com/kb/1017/install) to get started.

## Provision the cloud VM

Next, you'd need to create a small VM in the cloud, connected to the VPC with the Event Store Cloud.

You can choose the smallest available instance size, like `t4g.nano` in AWS or `f1.micro` in GCP. For this guide we use Ubuntu 20.04 LTS image.

When creating the VM, ensure to:
- Connect the default network interface to the VPC peered with Event Store Cloud
- Enable public ip if you want to connect to the VM from your local machine
- GCP: enable _IP Forwarding_ on the default NIC
- AWS: disable _Source / destination checking_

For existing VMs, you can enable IP forwarding too.

::::: el-tabs
:::: el-tab-pane label="AWS"
Select the EC2 instance in the list of instances and in the `Actions` menu choose `Networking` and then `Change source/destination check`. Ensure that the `Stop` checkbox is _enabled_:
::: el-card :body-style="{ padding: '0px' }" 
![AWS enable ip forward](./images/aws-ip-forward.png)
:::
::::
:::: el-tab-pane label="GCP"
On GCP you can enable IP Forward only when creating the VM instance.

On the new VM instance page and scroll down to the `Management, security, disks, networking, sole tenancy` section, expand it, find the `Network interfaces` section and click on the pen icon. There, set the `IP forwarding` to `On`:
::: el-card :body-style="{ padding: '0px' }" 
![GCP enable ip forward](./images/gcp-ip-forward.png)
:::
::::
:::::

Remember to create the VM instance in the same region as the VPC, which is peered with Event Store Cloud.

## Set up Tailscale subnet routing

When you get the cloud VM instance running, connect to it using SSH. The easiest way is to use the cloud browser console.

After logging in, install the Tailscale client for the Linux distribution used for the cloud VM, following the [Tailscale guidelines](https://tailscale.com/kb/1017/install). [Here (direct link)](https://tailscale.com/kb/1039/install-ubuntu-2004) you can also find required steps for Ubuntu 20.04 LTS (focal) distribution.

When the initial steps are completed, you should be able to ping the cloud VM using its internal IP address from your local machine.

Next, visit the Event Store Cloud console and open the peering page. There you will find the peering you created when following the provisioning guidelines. Write down the details from the `Local Address` and `Remote Address` fields.

For this example we will use the following peering details:
::: el-card :body-style="{ padding: '0px' }"
![Peering page example](./images/peering-example.png)
:::

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

## Future plans

In the nearest future we want to add out-of-the-box Tailscale network peering, which will create a nano-VM inside Event Store Cloud and set up routing to your Tailscale account automatically.
