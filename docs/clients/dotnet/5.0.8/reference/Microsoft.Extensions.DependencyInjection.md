---
title: Microsoft.Extensions.DependencyInjection
---

# Namespace: Microsoft.Extensions.DependencyInjection
## Class `EventStoreClientServiceCollectionExtensions`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class EventStoreClientServiceCollectionExtensions
```

### Method `AddEventStoreClient(IServiceCollection, Uri, Func<HttpMessageHandler>)`

#### Syntax
```csharp
public static IServiceCollection AddEventStoreClient(this IServiceCollection services, Uri address, Func<HttpMessageHandler> createHttpMessageHandler = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`services` | `IServiceCollection` | 
`address` | `Uri` | 
`createHttpMessageHandler` | `System.Func<HttpMessageHandler>?` | 

#### Returns
Type | Description
--- | ---
`IServiceCollection` | 



### Method `AddEventStoreClient(IServiceCollection, Action<EventStoreClientSettings>)`

#### Syntax
```csharp
public static IServiceCollection AddEventStoreClient(this IServiceCollection services, Action<EventStoreClientSettings> configureSettings = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`services` | `IServiceCollection` | 
`configureSettings` | `System.Action<EventStoreClientSettings>?` | 

#### Returns
Type | Description
--- | ---
`IServiceCollection` | 


