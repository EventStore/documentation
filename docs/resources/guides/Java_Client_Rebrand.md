---
title: Upgrading to the Kurrent Java client
categories:
  - Clients
  - Development
tag:
  - Java
  - Upgrade
---

## Guide: Converting from eventstore to Kurrent Java client.

This guide provides a procedure to easily upgrade from the *com.eventstore* client to the *io.kurrent* client.
<!-- more -->

As [EventStore rebranded to Kurrent](https://www.kurrent.io/blog/event-store-is-evolving-to-kurrent), so did the database clients. For applications using the java client, this causes some effort due to the renaming of packages and classes, as well as configuration parameters.

This guide will walk you through how to use an [OpenRewrite](https://docs.openrewrite.org) recipe to automatically update the Java code to the new Kurrent Java client.

### Requirements
- Java 8 or above
- Maven or Gradle 

### Setup
Create a file named `rewrite.yml` in the root directory of your Java project and copy the following:

```yaml
---
type: specs.openrewrite.org/v1beta/recipe
name: io.kurrent.java.UpgradeClient
displayName: Migrate to Kurrent Client
description: >
  Migrate applications to the latest KurrentDB from EventStoreDB client. This recipe will modify an
  application's pom files, migrate to the new names of classes, update package information and change the connection strings.
tags:
  - KurrentDB
  - Kurrent
recipeList:
  - org.openrewrite.java.dependencies.ChangeDependency:
      oldGroupId: com.eventstore
      oldArtifactId: db-client-java
      newGroupId: io.kurrent
      newArtifactId: kurrentdb-client
      newVersion: 1.0.0
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClientBase
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClientBase
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClient
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClientSettings
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClientSettings
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBConnectionString
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBConnectionString
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBProjectionManagementClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBProjectionManagementClient
  - org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBPersistentSubscriptionsClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBPersistentSubscriptionsClient
  - org.openrewrite.java.ChangePackage:
      oldPackageName: com.eventstore.dbclient
      newPackageName: io.kurrent.dbclient
  - org.openrewrite.java.migrate.ReplaceStringLiteralValue:
      oldLiteralValue: kurrent://
      newLiteralValue: kurrent://
  - org.openrewrite.java.migrate.ReplaceStringLiteralValue:
      oldLiteralValue: kurrent+discover://
      newLiteralValue: kurrent+discover://
  - org.openrewrite.text.FindAndReplace:
      find: kurrent://
      replace: kurrent://
      caseSensitive: true
  - org.openrewrite.text.FindAndReplace:
      find: kurrent+discover://
      replace: kurrent+discover://
      caseSensitive: true
---

```

This file defines a new OpenRewrite recipe named `io.kurrent.java.UpgradeClient`. 

### Execution
The execution is slightly different if you use Maven or Gradle:

:::tabs#execution
@tab Maven
```bash
./mvnw -U org.openrewrite.maven:rewrite-maven-plugin:run -Drewrite.activeRecipes=io.kurrent.java.UpgradeClient -Drewrite.recipeArtifactCoordinates=org.openrewrite.recipe:rewrite-java-dependencies:1.29.0,org.openrewrite.recipe:rewrite-migrate-java:3.3.0
```

@tab Gradle
If using `Gradle`, you'll have to create a [Gradle init script](https://docs.openrewrite.org/running-recipes/running-rewrite-on-a-gradle-project-without-modifying-the-build). Create a `init.gradle` file with the following contents :

```kotlin
initscript {
    repositories {
        maven { url "https://plugins.gradle.org/m2" }
    }
    dependencies {
        classpath("org.openrewrite:plugin:latest.release")
    }
}

rootProject {
    plugins.apply(org.openrewrite.gradle.RewritePlugin)
    dependencies {
        rewrite("org.openrewrite.recipe:rewrite-java-dependencies:latest.release")
        rewrite("org.openrewrite.recipe:rewrite-migrate-java:latest.release")
    }

    afterEvaluate {
        if (repositories.isEmpty()) {
            repositories {
                mavenCentral()
            }
        }
    }
}
```
And then execute 

```bash
gradle rewriteRun --init-script init.gradle -Drewrite.activeRecipe=io.kurrent.java.UpgradeClient
```

:::
### Explanation
The `rewrite.yml` file defines a new OpenRewrite recipe named `io.kurrent.java.UpgradeClient`. This recipe is a collection of the following:

1. Gradle or Maven dependencies
```yaml
- org.openrewrite.java.dependencies.ChangeDependency:
      oldGroupId: com.eventstore
      oldArtifactId: db-client-java
      newGroupId: io.kurrent
      newArtifactId: kurrentdb-client
      newVersion: 1.0.0
```

2. Change use of EventStoreDBClientBase to KurrentDBClientBase
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClientBase
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClientBase
```
3. Change use of EventStoreDBClient to KurrentDBClient
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClient
```
4. Change use of EventStoreDBClientSettings to KurrentDBClientSettings
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBClientSettings
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBClientSettings
```
5. Change use of EventStoreDBConnectionString to KurrentDBConnectionString
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBConnectionString
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBConnectionString
```
6. Change use of EventStoreDBProjectionManagementClient to KurrentDBProjectionManagementClient
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBProjectionManagementClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBProjectionManagementClient
```
7. Change use of EventStoreDBPersistentSubscriptionsClient to KurrentDBPersistentSubscriptionsClient
```yaml
- org.openrewrite.java.ChangeType:
      oldFullyQualifiedTypeName: com.eventstore.dbclient.EventStoreDBPersistentSubscriptionsClient
      newFullyQualifiedTypeName: io.kurrent.dbclient.KurrentDBPersistentSubscriptionsClient
```
8. Change package names
```yaml
- org.openrewrite.java.ChangePackage:
      oldPackageName: com.eventstore.dbclient
      newPackageName: io.kurrent.dbclient
```
9. Replace connection strings of type `esdb://` in java classes
```yaml
- org.openrewrite.java.migrate.ReplaceStringLiteralValue:
      oldLiteralValue: esdb://
      newLiteralValue: kurrent://
```
10.   Replace connection strings of type `esdb+discover://` in java classes
```yaml
- org.openrewrite.java.migrate.ReplaceStringLiteralValue:
      oldLiteralValue: esdb+discover://
      newLiteralValue: kurrent+discover://
```
11.    Replace connection strings of type `esdb://` in text files
```yaml
- org.openrewrite.text.FindAndReplace:
      find: esdb://
      replace: kurrent://
      caseSensitive: true
```
12.   Replace connection strings of type `esdb+discover://` in text files
```yaml
- org.openrewrite.text.FindAndReplace:
      find: esdb+discover://
      replace: kurrent+discover://
      caseSensitive: true
```
