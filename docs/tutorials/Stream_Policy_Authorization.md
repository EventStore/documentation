## **Tutorial: Setting up and using Stream Policy Authorization in EventStoreDB**

This step-by-step tutorial guides you through enabling and configuring **Stream Policy Authorization** in EventStoreDB. This feature allows EventStoreDB administrators to define stream access policies based on stream prefixes.

#### **Prerequisites**

* [EventStoreDB 24.10 LTS installed and running.](https://developers.eventstore.com/server/v24.10/quick-start/installation.html)   
* [License key](https://developers.eventstore.com/server/v24.10/quick-start/installation.html#license-keys) for Stream Policy Authorization (a valid license is required to use this feature).  
* Basic understanding of EventStoreDB, stream prefixes, and access control.

### **Step 1: Verify license key**

Ensure you have a valid **license key** to utilize Stream Policy Authorization. Without the license, this feature will not function.

### **Step 2 (optional): Confirm Stream Policy Authorization availability**

By default, Stream Policy Authorization is bundled with EventStoreDB 24.20 LTS. You can confirm its availability in the EventStoreDB logs. Look for the following log message:

`[INF] AuthorizationPolicyRegistryFactory Loaded Authorization Policy plugin: streampolicy`

Refer to the [log documentation](https://developers.eventstore.com/server/v24.10/diagnostics/logs.html) for instructions on accessing EventStoreDB logs.

### **Step 3: Enable Stream Policy Authorization**

***Note:** WhenStream Policy Authorization is enabled, EventStoreDB will not enforce stream [Access Control Lists (ACLs)](https://developers.eventstore.com/server/v24.10/security/user-authorization.html#access-control-lists).*

To enable stream policies, append an event of type `$authorization-policy-changed` to the `$authorization-policy-settings` stream:

::: tabs
@tab HTTP
```http
POST https://localhost:2113/streams/$authorization-policy-settings
Authorization: Basic admin changeit
Content-Type: application/json
ES-EventId: 11887e82-9fb4-4112-b937-aea895b32a4a
ES-EventType: $authorization-policy-changed

{
    "streamAccessPolicyType": "streampolicy"
}
```

@tab Powershell
```powershell
$JSON = @"
{
    "streamAccessPolicyType": "streampolicy"
}
"@ `

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -H "ES-EventId: 11887e82-9fb4-4112-b937-aea895b32a4b" `
  -H "ES-EventType: `$authorization-policy-changed" `
  -u "admin:changeit" `
  -d $JSON `
  https://localhost:2113/streams/%24authorization-policy-settings
```

@tab Bash
```bash
JSON='{
    "streamAccessPolicyType": "streampolicy"
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "ES-EventId: 814f6d67-515c-4bd6-a6d6-8a0235ec719a" \
  -H "ES-EventType: \$authorization-policy-changed" \
  -u "admin:changeit" \
  -d "$JSON" \
  https://localhost:2113/streams/%24authorization-policy-settings
```
:::

And disable stream policies by setting the stream access policy type back to `acl`:

::: tabs
@tab HTTP

```http
### Configure cluster to use acls
POST https://localhost:2113/streams/$authorization-policy-settings
Authorization: Basic admin changeit
Content-Type: application/json
ES-EventId: d07a6637-d9d0-43b7-8f48-6a9a8800af12
ES-EventType: $authorization-policy-changed

{
    "streamAccessPolicyType": "acl"
}
```

@tab Powershell
```Powershell
$JSON = @"
{
    "streamAccessPolicyType": "acl"
}
"@ `

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -H "ES-EventId: 3762c89e-d12e-4a01-83bb-781459c93ebc" `
  -H "ES-EventType: `$authorization-policy-changed" `
  -u "admin:changeit" `
  -d $JSON `
  https://localhost:2113/streams/%24authorization-policy-settings
```
@tab Bash
```bash
JSON='{
    "streamAccessPolicyType": "acl"
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "ES-EventId: d6b3a316-2493-4bcd-9019-e02b5ae4eec3" \
  -H "ES-EventType: \$authorization-policy-changed" \
  -u "admin:changeit" \
  -d "$JSON" \
  https://localhost:2113/streams/%24authorization-policy-settings
```

:::


### **Step 4: Confirm Stream Policy Authorization activation**

After enabling Stream Policy Authorization, you can confirm it is active by checking the log file. You should see the following log messages: 

`[22860,28,17:30:42.247,INF] StreamBasedAuthorizationPolicyRegistry New Authorization Policy Settings event received`  
`[22860,28,17:30:42.249,INF] StreamBasedAuthorizationPolicyRegistry Starting factory streampolicy`  
`...`  
`[22860,28,17:30:42.264,INF] StreamBasedPolicySelector      Existing policy found in $policies stream (0)`  
`[22860,28,17:30:42.269,INF] StreamBasedPolicySelector      Successfully applied policy`  
`[22860,28,17:30:42.271,INF] StreamBasedPolicySelector      Subscribing to $policies at 0`

If no valid license is detected, Stream Policy Authorization logs errors and defaults to the ACL policy settings. Refer to the [Stream Policy Authorization documentation](https://developers.eventstore.com/server/v24.10/security/user-authorization.html#troubleshooting) for a list of potential errors and their resolutions.

### **Step 5: Configure stream policies and rules**

EventStoreDB creates default stream policies by adding a default policy event in the `$policies` stream when the feature is enabled for the first time. The default policies specified in that event include:

* Restricts system streams (i.e., streams that start with `$`) to the `$admins` group.  
* Grants users outside of the `$ops` group access to user streams (i.e., streams created by users of EventStoreDB, excluding system streams) and their metadata.  
* Grants users outside of the `$ops` group read access to the default projection streams (i.e., streams that start with `$ce`,`$et`,`$bc`, `$category`, `$streams`) and their metadata.

You can create custom stream policies if you want to manage access more granularly. To do this, follow these steps:

1. **Identify users or user groups and their access permissions**   
   Start by determining the users and their roles within your system, along with the specific stream access permissions each role requires, such as read, write, or delete.  
     
   For instance, you may identify the following users and their respective access permissions:

    | Users | Streams | Access permissions |
    | :---- | :---- | :---- |
    | Users in the `financeTeam`  | Streams prefixed with `finance-` | Read and metadata read permissions |
    | Users in the `financeAdmin` group | Streams prefixed with `finance-`  | Full permissions |
    | Users in the `salesTeam`  | Streams prefixed with `sales-` | Read, write, and metadata read permissions |
    | Users in the `salesAdmin` group | Streams prefixed with `sales-` | Full permissions |
    | Superuser `ouro` | Streams prefixed with `finance-` or `sales-` | Full permissions |
    | Other users | Any stream | Permissions granted by the default stream policies |

2. **Define custom policies in the** `$policies` **stream**  
   Policies control specific permissions, including read (`$r`), write (`$w`), delete (`$d`), metadata read (`$mr`), and metadata write (`$mw`).   

   In this example, based on the users and permissions you identified in the previous step:   
    * The custom policy `financePolicy` gives users in the `financeTeam` read and metadata read permissions, and superuser `ouro` and users in the `financeAdmin` group full permissions.   
   * Similarly, the custom policy `salesPolicy` gives users in the `salesTeam` read, write, and metadata read permissions, and superuser `ouro` and users in the `salesAdmin` group full permissions.  
  
   ```json
    "streamPolicies": {  
      "financePolicy": {  
        "$r": [“ouro”, "financeAdmin", “financeTeam”],  
        "$w": [“ouro”, "financeAdmin"],  
        "$d": [“ouro”, "financeAdmin"],  
        "$mr": [“ouro”, "financeAdmin", “financeTeam”],  
        "$mw": [“ouro”, "financeAdmin"]  
      },  
      "salesPolicy": {  
        "$r": [“ouro”, "salesAdmin", “salesTeam”],  
        "$w": [“ouro”, "salesAdmin", “salesTeam”],  
        "$d": [“ouro”, "salesAdmin"],  
        "$mr": [“ouro”, "salesAdmin", “salesTeam”],  
        "$mw": [“ouro”, "salesAdmin"]  
      }  
     }
   ```  

3. **Apply policies to stream prefixes**   
   You can apply custom or default policies to specific stream prefixes using `streamRules`. You can also apply the same policy to multiple streams by defining multiple stream rules.  
     
   In this example, streams with the `finance-` and `sales-` prefixes use custom policies, while projection-related streams use the default projection policy.  
     
   ```json
   "streamRules": [  
     {  
       "startsWith": "finance-",  
       "policy": "financePolicy"  
     },
     {  
       "startsWith": "sales-",  
       "policy": "salesPolicy"  
     },
     {  
       "startsWith": "$et-",  
       "policy": "projectionsDefault"  
     },  
     {  
       "startsWith": "$ce-",  
       "policy": "projectionsDefault"  
     },  
     {    
       "startsWith": "$bc-",  
       "policy": "projectionsDefault"  
     },  
     {  
       "startsWith": "$category-",  
       "policy": "projectionsDefault"  
     },  
     {  
       "startsWith": "$streams",  
       "policy": "projectionsDefault"  
     }  
    ]
   ```

4. **Specify default stream rules**    
   You still need to specify default stream rules when you update the `$policies` stream.  

   ```json  
   "defaultStreamRules": {  
       "userStreams": "publicDefault", 
       "systemStreams": "adminsDefault"  
     } 
   ```
    
     Combine the code from these three steps and follow the structure to configure a custom policy. The stream policies now include the custom policies you defined and, unless you want to remove or change them, the default policies created by the EventStoreDB whenStream Policy Authorization is initially enabled.  

   ::: details Click here to view the full JSON code of the example above titled customPolicy.json.
    ```json
    {
      "streamPolicies": {
        "financePolicy": {
          "$r": ["ouro", "financeAdmin", "financeTeam"],
          "$w": ["ouro", "financeAdmin"],
          "$d": ["ouro", "financeAdmin"],
          "$mr": ["ouro", "financeAdmin", "financeTeam"],
          "$mw": ["ouro", "financeAdmin"]
        },
        "salesPolicy": {
          "$r": ["ouro", "salesAdmin", "salesTeam"],
          "$w": ["ouro", "salesAdmin", "salesTeam"],
          "$d": ["ouro", "salesAdmin"],
          "$mr": ["ouro", "salesAdmin", "salesTeam"],
          "$mw": ["ouro", "salesAdmin"]
        },
        "publicDefault": {
          "$r": ["$all"],
          "$w": ["$all"],
          "$d": ["$all"],
          "$mr": ["$all"],
          "$mw": ["$all"]
        },
        "adminsDefault": {
          "$r": ["$admins"],
          "$w": ["$admins"],
          "$d": ["$admins"],
          "$mr": ["$admins"],
          "$mw": ["$admins"]
        },
        "projectionsDefault": {
          "$r": ["$all"],
          "$w": ["$admins"],
          "$d": ["$admins"],
          "$mr": ["$all"],
          "$mw": ["$admins"]
        }
      },
      "streamRules": [
        {
          "startsWith": "finance-",
          "policy": "financePolicy"
        },
        {
          "startsWith": "sales-",
          "policy": "salesPolicy"
        },
        {
          "startsWith": "$et-",
          "policy": "projectionsDefault"
        },
        {
          "startsWith": "$ce-",
          "policy": "projectionsDefault"
        },
        {
          "startsWith": "$bc-",
          "policy": "projectionsDefault"
        },
        {
          "startsWith": "$category-",
          "policy": "projectionsDefault"
        },
        {
          "startsWith": "$streams",
          "policy": "projectionsDefault"
        }
      ],
      "defaultStreamRules": {
        "userStreams": "publicDefault",
        "systemStreams": "adminsDefault"
      }
    }
    ```
   :::      

5. **Add custom policy to the** `$policies` **stream**  
   To add your custom policy configuration to the `$policies` stream, append an event of type `$policy-updated` to the `$policies` stream like below:   
   
   ::: tabs
   @tab HTTP
   ```http
   POST https://localhost:2113/streams/$policies
   Authorization: Basic admin changeit
   Content-Type: application/json
   ES-EventId: b04a64bf-4ac2-4f36-a856-6da9b63e64b7
   ES-EventType: $policy-updated

    ./customPolicy.json
   ```

   @tab Powershell
   ```powershell
   curl.exe -X POST `
     -H "Content-Type: application/json" `
     -H "ES-EventId: 8bc7c581-0f07-4987-bfcb-ab8f9404ca34" `
     -H "ES-EventType: `$policy-updated" `
     -u "admin:changeit" `
     -d @customPolicy.json `
     https://localhost:2113/streams/%24policies
   ```

   @tab Bash
   ```bash
   curl -X POST \
     -H "Content-Type: application/json" \
     -H "ES-EventId: cb6a722d-c775-4831-929b-86870560c68e" \
     -H "ES-EventType: \$policy-updated" \
     -u "admin:changeit" \
     -d @customPolicy.json \
     https://localhost:2113/streams/%24policies

   ```


### **Step 6: Validate the policy configuration**

After updating the `$policies` stream, ensure your policy update is applied correctly by checking the logs. You should see the following log message:

`[INF] StreamBasedPolicySelector      New policy found in $policies stream (1)`  
`[INF] StreamBasedPolicySelector      Successfully applied policy`

If the policy is invalid, EventStoreDB continues running with the previous valid policy, and an error is logged.

### **Step 7 (optional): Testing and monitoring policies**

1. **Validate access controls**  
   Test the permissions by attempting access to streams under various prefixes as different users.   
   For instance, given the code example in the tutorial, you should have the following test results:

    | Test users | Test streams | Access attempts | Expected result for each attempt |
    | :---- | :---- | :---- | :---- |
    | `user1` (a user in the `financeTeam`) | `finance-123` | Read or metadata read | Success |
    | `user1` (a user in the `financeTeam`) | `finance-123`  | Write, delete, or metadata write | Failure |
    | `user2` (a user in the `financeAdmin` group) | `finance-45` | Read, write, delete, metadata read, or metadata write | Success |
    | `ouro` | `finance-6` | Read, write, delete, metadata read, or metadata write | Success |
    | `user4` (a user not in the `financeTeam` or the `financeAdmin` group) | `finance-7` | Read, write, delete, metadata read, or metadata write | Failure |
    | `user3` (a user in the `salesTeam`) | `sales-456` | Read, write, or metadata read  | Success |
    | `user3` (a user in the `salesTeam`) | `sales-456`  | Delete or metadata write | Failure |
    | `user2` (a user in the `salesAdmin` group) | `sales-78` | Read, write, delete, metadata read, or metadata write | Success |
    | `ouro` | `sales-9` | Read, write, delete, metadata read, or metadata write | Success |
    | `user5` (a user not in the `salesTeam` or the `salesAdmin` group) | `sales-10` | Read, write, delete, metadata read, or metadata write | Failure |
     `User6` (any user) | `account-123` | Read, write, delete, metadata read, or metadata write | Success |

2. **Monitor logs for errors**  
   Errors in policy applications are logged. If any issues arise, EventStoreDB maintains the last valid policy configuration. Adjust and repost policies as needed.  
3. **Fallback policy**  
   If custom policies are invalid or the feature fails to load, EventStoreDB restricts access to admins only, ensuring security. To resolve this, either update the `$authorization-policy-settings` stream with valid settings or revert to ACLs as outlined below.

### **Step 8 (optional): Disable Stream Policies Authorization (Reverting to ACLs)**

If you want to disable the stream policies authorization and revert to ACLs, you can post an event to `$authorization-policy-settings` with `streamAccessPolicyType` set to `acl`:

::: tabs
@tab HTTP

```http
### Configure cluster to use acls
POST https://localhost:2113/streams/$authorization-policy-settings
Authorization: Basic admin changeit
Content-Type: application/json
ES-EventId: d07a6637-d9d0-43b7-8f48-6a9a8800af12
ES-EventType: $authorization-policy-changed

{
    "streamAccessPolicyType": "acl"
}
```

@tab Powershell
```Powershell
$JSON = @"
{
    "streamAccessPolicyType": "acl"
}
"@ `

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -H "ES-EventId: 3762c89e-d12e-4a01-83bb-781459c93ebc" `
  -H "ES-EventType: `$authorization-policy-changed" `
  -u "admin:changeit" `
  -d $JSON `
  https://localhost:2113/streams/%24authorization-policy-settings
```
@tab Bash
```bash
JSON='{
    "streamAccessPolicyType": "acl"
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "ES-EventId: d6b3a316-2493-4bcd-9019-e02b5ae4eec3" \
  -H "ES-EventType: \$authorization-policy-changed" \
  -u "admin:changeit" \
  -d "$JSON" \
  https://localhost:2113/streams/%24authorization-policy-settings
```

:::


### **Summary**

By following this tutorial, you should have successfully:

* Enabled the Stream Policy Authorization feature.  
* Configured default and custom stream policies.  
* Applied stream access policies to specific stream prefixes.  
* Validated the stream policy configuration.

This setup ensures that your EventStoreDB instance has tailored access control based on stream prefixes, making it easier to manage permissions and secure access to streams in your environment. 
