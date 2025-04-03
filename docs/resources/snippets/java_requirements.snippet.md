<!-- #region JavaVersion -->
### Requirements
- Java 8 or above
- An instance of KurrentDB running - see [local in Docker](./Start_DB_local.md) or [cloud](/cloud/introduction.md) guides.
<!-- #endregion JavaVersion -->

<!-- #region dependencies -->

### Dependencies

Whether you are using Maven or Gradle, add the following dependencies.

::: code-tabs#builders

@tab Maven
```xml
<dependencies>
    <dependency>
	    <groupId>com.eventstore</groupId>
	    <artifactId>db-client-java</artifactId>
	    <version>5.4.3</version>
    </dependency>
</dependencies>
```
@tab Gradle
```kotlin
dependencies {
  implementation('com.eventstore:db-client-java:5.4.3')
}
```
:::
<!-- #endregion dependencies -->
