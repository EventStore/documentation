---
outputFileName: index.html
---

# Event Store as a functional database

Much of what we have discussed can be looked at through a functional programming perspective as well. For developers in functional languages such as Scala or Haskell this should feel natural to you, for C# developers it should feel familiar, and for Java developers I hear that Scala is a nice language. All kidding aside…

When we “replay” an event stream we are returning a series of events. An event is essentially a serialized method call. We left fold something that redefines what those methods mean to us today in order to get our current state. This can be seen explicitly when looking at how the projections work in JavaScript. We define a function as:

```text
when([SomePatternMatch], function(state, event) { return new state; });
```

These functions are then chained over the event stream resulting at the end with a state object. The state is passed from one function to the next allowing each function to transform it. Said differently, Current State is a [left fold][6] of previous facts. We can further continue this to say that a snapshot is nothing but a memoization of the left fold. When looked at from this perspective one could state that an Event Store is actually a functional database.
