---
title: Encryption-At-Rest
order: 2
---

## Tutorial: Setting up and using Encryption-At-Rest in KurrentDB

The **Encryption-At-Rest** feature provides encryption for KurrentDB to secure database chunk files, ensuring data protection even if an attacker gains access to the physical disk. This step-by-step guide will walk you through the process of enabling and configuring this feature, including generating master keys and applying encryption.

#### Prerequisites:

* [KurrentDB 25.0 or later, or EventStoreDB 24.10  installed and running.](@server/quick-start/installation.md)  
* [License key](@server/quick-start/installation.md#license-keys) for Encryption-At-Rest (a valid license is required to use this feature).  
* Basic understanding of KurrentDB, encryption principles, and key management.

### Step 1: Verify license key

Ensure you have a valid **license key** to use the Encryption-At-Rest feature. Without this license, the feature will not be functional.

### Step 2 (optional): Confirm Encryption-At-Rest availability

By default, Encryption-At-Rest is bundled with KurrentDB 25.0 or later, or EventStoreDB 24.20 LTS. You can confirm its availability in the KurrentDB logs. Look for the following log message:

```text:no-line-numbers
[INF] ClusterVNodeHostedService Loaded SubsystemsPlugin plugin: encryption-at-rest 24.10.0.1316
```

Refer to the [log documentation](@server/diagnostics/logs.md) for instructions on accessing KurrentDB logs.

### Step 3: Generate a master key

To encrypt the data, you must first generate a **master key** using the `es-cli` tool ([available to be downloaded in Cloudsmith](https://cloudsmith.io/~eventstore/repos/eventstore/packages/?q=es-cli)). This key is used to derive the data keys that will encrypt chunk files.

Run the following command to generate a master key:  

```bash:no-line-numbers
es-cli encryption generate-master-key
```

Place the generated master key in a secure directory on a **separate drive** from the database files, ensuring enhanced security. The key should be stored in the directory you will configure in the next step, for example, `/secure/keys/`.

### Step 4: Configure and enable Encryption-At-Rest

#### Step 4.1: Add the configuration file

1. Navigate to the `config` directory within the KurrentDB installation.  
   There are multiple [configuration mechanisms](@server/configuration/) available. Since options set in a JSON configuration override those set in a YAML configuration, here is an example using JSON. You can also find a [YAML configuration file example in the documentation](@server/security/#configuration).   
     
   Create a new JSON configuration file (e.g., `encryption-config.json`) with the following content:   
   ```json
   {
     "EventStore": {  
       "Plugins": {  
         "EncryptionAtRest": {  
           "Enabled": true,  
           "MasterKey": { 
             "File": {  
               "KeyPath": "/secure/keys/"  // Update with the actual path to your keys  
             }  
           },  
           "Encryption": {  
             "AesGcm": {  
               "Enabled": true,  
               "KeySize": 256  // Optional: 128, 192, 256 bits (default is 256)  
             }  
           }  
         }  
       } 
     }  
   }  
   ```
2. Make sure to replace `/secure/keys/` with the actual path where the generated master key is stored.

#### Step 4.2: Set the encryption algorithm

In the main KurrentDB configuration file, add the following line to specify the encryption transformation:

```bash:no-line-numbers
Transform: aes-gcm
```

This ensures that the **AES Galois Counter Mode (AES-GCM)** encryption algorithm is applied to new chunks.

### Step 5: Confirm Encryption-At-Rest activation

After configuring Encryption-At-Rest, you can confirm it is enabled and active by checking the log file. You should see the following log messages: 

```text:no-line-numbers
...
[141828, 1,11:42:45.325,INF] Encryption-At-Rest: Loaded master key source: "File"
[141828, 1,11:42:45.340,INF] Encryption-At-Rest: (File) Loaded master key: 1 (256 bits)
[141828, 1,11:42:45.345,INF] Encryption-At-Rest: Active master key ID: 1
[141828, 1,11:42:45.345,INF] Encryption-At-Rest: Loaded encryption algorithm: "AesGcm"
[141828, 1,11:42:45.347,INF] Encryption-At-Rest: (AesGcm) Using key size: 256 bits
[141828, 1,11:42:45.401,INF] Loaded the following transforms: Identity, Encryption_AesGcm
[141828, 1,11:42:45.402,INF] Active transform set to: Encryption_AesGcm
...
```

### Step 6 (optional): Verify encryption

Once Encryption-At-Rest is enabled, new chunk files created or scavenged will be encrypted using the configured encryption algorithm. You can verify encryption with the following tests:

* **New chunks test**:  
  * Create or scavenge chunk files and verify by checking the logs to confirm that new chunks have been encrypted.   
  * Example log message that indicates the active encryption mechanism is operational:  
    `[141828, 1,11:42:45.401,INF] Active transform set to: Encryption_AesGcm`  
* **Unauthorized access test**:  
  * Attempt to access encrypted files without proper keys to confirm they cannot be read.  
  * For example, you can attempt to read encrypted chunk files directly using a text editor, hexadecimal viewer, or unsupported tool. Without the proper master key, the contents should appear garbled or unreadable.

### Step 7: Important considerations

* **Irreversible encryption:** Once encryption is enabled, you **cannot revert** to an unencrypted state if any new chunk file has been created or scavenged. To decrypt the encrypted chunks, special tooling would be required (currently unavailable).
* **Master key management:**  
  * If your master key is compromised, the entire database can be decrypted. Always secure the key on a different drive than your database files.  
  * If your master key is lost or corrupted, you’ll lose access to your data. Always keep a backup of your master key in a safe place.  
* **Scope of protection**: Encryption-At-Rest encrypts chunk files but does not encrypt index files. Additionally, this feature does not protect against memory-dump-based attacks, which require separate mitigation strategies.

### Summary

By following this tutorial, you have successfully configured and enabled Encryption-At-Rest in KurrentDB. This encryption setup ensures that your chunk files are securely encrypted, protecting your data from potential disk-based attacks.
