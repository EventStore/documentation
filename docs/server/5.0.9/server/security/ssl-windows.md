# Setting up SSL on Windows

The steps to set up SSL on Windows are as follows.

First, create a certificate using PowerShell, and copy the thumbprint from the output

```powershell
New-SelfSignedCertificate -DnsName eventstore.com, localhost -CertStoreLocation cert:\CurrentUser\My
```

To trust the new certificate, the certificate you have to import the certificate into the Trusted Root Certification Authorities:

1.  Press _WindowsKey + R_, and enter 'certmgr.msc'.

::: el-card :body-style="{ padding: '0px' }" 
![Open certmgr.msc](./images/ssl-step1.png)
:::

2.  Navigate to _Certificates -> Current User -> Personal -> Certificates_.
3.  Locate the certificate 'eventstore.com'.

::: el-card :body-style="{ padding: '0px' }" 
![Find certificate](./images/ssl-step2.png)
:::

4.  _Right click_ on the certificate and click on _All Tasks -> Export_. Follow the prompts.

::: el-card :body-style="{ padding: '0px' }" 
![Export certificate](./images/ssl-step3.png)
:::

5.  Navigate to _Certificates -> Current User -> Trusted Root Certification Authorities -> Certificates_.
6.  _Right click_ on the Certificates folder menu item and click _All Tasks -> Import_. Follow the prompts.

::: el-card :body-style="{ padding: '0px' }" 
![Find certificate](./images/ssl-step4.png)
:::

Start Event Store with the following configuration in [a configuration file](../command-line-arguments.md#yaml-files):

```yaml
CertificateStoreLocation: CurrentUser
CertificateStoreName: My
CertificateThumbPrint: {Insert Thumb Print from Step 1}
CertificateSubjectName: CN=eventstore.com
ExtSecureTcpPort: 1115
```

Connect to Event Store:

::::: tabs
:::: tab .NET API

```csharp
var settings = ConnectionSettings.Create().UseSslConnection("eventstore.com", true);

using var conn = EventStoreConnection.Create(settings, new IPEndPoint(IPAddress.Loopback, 1115));
await conn.ConnectAsync();
```

::::
:::: tab HTTP API

```bash
curl -vk --cert <PATH_TO_CERT> --key <PATH_TO_KEY> -i -d "@event.json" "http://127.0.0.1:2113/streams/newstream" -H "Content-Type:application/vnd.eventstore.events+json"
```

::::
:::::
