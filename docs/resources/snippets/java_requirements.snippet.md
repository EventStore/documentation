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
	    <groupId>io.kurrent</groupId>
	    <artifactId>kurrentdb-client</artifactId>
	    <version>1.0.0</version>
    </dependency>
</dependencies>
```
@tab Gradle
```kotlin
dependencies {
  implementation('io.kurrent:kurrentdb-client:1.0.0')
}
```
:::
<!-- #endregion dependencies -->
