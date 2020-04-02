---
split: true
code:
  - csharp
  - go
---

# Page switcher

This page is configured to have one switcher for C# and Go. The switcher
 appears at the top of the page. It affects all code snippets that have Go
  and C# code, but has no effect on code in other languages.

## First block

These are configured languages:

::: code
@[code lang=go](@/samples/sample.go)
@[code lang=csharp](@/samples/sample.cs)
:::

## Second block

These are configured languages:

::: code
@[code lang=go](@/samples/sample.go)
@[code lang=csharp](@/samples/sample.cs)
:::

## Other languages

Here is the block of code in not configured languages:

::: code
```typescript
const blah = "TypeScript";
```
```js
var bhal = "JavaScript";
```
:::
