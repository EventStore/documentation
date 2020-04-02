---
outputFileName: index.html
---

# Event Sourcing Basics

## What is an Event Store?

Event Store is a database that supports the concept of Event Sourcing, which is an old idea that has recently become popular again

> [!NOTE]
> If you are familiar with functional programming you may wish to jump to the [Event Store viewed as a functional database section](event-store-as-a-functional-database.md).

Production systems often rely on storing their current state to process transactions, but this has not always been the case. Before the general acceptance of relational database management systems (RDBMS) as the center of system architectures many did not store the current state. This was especially true in high performance, mission critical, and highly secure systems. If you look at the inner workings of an RDBMS you will find that most do not themselves work by managing current state.

### What is an event?

An event is something that happened in the past, and so you should represent events as verbs in the past tense such as `CustomerRelocated`, `CargoShipped`, or `InventoryLossageRecorded`. If you are taking a [domain driven design](https://en.wikipedia.org/wiki/Domain-driven_design) approach, it's imperative that events are verbs in the past tense, as they are part of the Ubiquitous Language.

Consider the differences with ubiquitous language when relocating a customer. An event makes the concept explicit where previously the changes would occur within an aggregate or between multiple aggregates and were left as an implicit concept that you needed to explore and define.

In most applications, a developer discovers that a side effect occurred with a tool such as Hibernate or Entity Framework. If there is a change to the side effects of a use case, it is an implicit concept. The introduction of the event makes the concept explicit and part of the Ubiquitous Language. Relocating a customer does not change something, relocating a customer produces a `CustomerRelocatedEvent` event which is explicitly defined within the language.

In code an event is a data holding structure such as the following:

```csharp
public class InventoryItemDeactivated {
	public readonly Guid InventoryItemId;
	public readonly string Reason;

	public InventoryItemDeactivated(inventoryItemId, reason)
	{
		InventoryItemId = inventoryItemId;
		Reason = reason;
	}
}
```

### Other definitions of domain events

There is a concept related to a Domain Event defined in [Streamlined Object Modeling](http://www.streamlinedmodeling.com) (SOM). The term “Domain Event” is often used in SOM when discussing “The Event Principle”.

> Model the event of people interacting at a place with a thing with a transaction object. Model a point-in-time interaction as a transaction with a single timestamp; model a time-interval interaction as a transaction with multiple timestamps. <cite>Jill Nicola, 2002ll, p. 23</cite>

Although people use the term Domain Event to describe this concept the term does not have the same definition as a Domain Event in the context of this document. SOM uses another term for the concept that better describes what the object is, a transaction. The concept of a transaction object is an important one in a domain and deserves a name. An example of such a transaction might be a player swinging a bat. This is an action that occurred at a given point and you should model as such in the domain, but this is not the same as a Domain Event.

This also differs from Martin Fowler’s example of what a Domain Event is:

> Example: I go to Babur’s for a meal on Tuesday, and pay by credit card. This might be modeled as an event, whose type is “Make Purchase”, whose subject is my credit card, and whose occurred date is Tuesday. If Babur’s uses an old manual system and doesn’t transmit the transaction until Friday, then the noticed date would be Friday. <cite>Fowler</cite>

Furthermore

> By funneling inputs of a system into streams of Domain Events you can keep a record of all the inputs to a system. This helps you to organize your processing logic, and also allows you to keep an audit log of the system. <cite>Fowler</cite>

What Martin is actually describing here is a "command". The language “Make Purchase” is wrong if we are to consider this as an event. A purchase was made, therefore it makes more sense to introduce a `PurchaseMade` event.

Martin did make a purchase at the location, they did charge his credit card, and he ate and enjoyed his food. All these events are in the past tense. They have already happened and cannot be undone.

An example such as the sales example given tends to lead towards a secondary problem when built within a system. The problem is that the domain may be responsible for filling in parts of the event. Consider a system where the domain processes the sale itself. How much is the sales tax? Often the domain would calculate this. This leads to a dual definition of the event. There is the event as sent from the client without the sales tax, and then the domain would receive it and add in the sales tax. It causes the event to have multiple definitions, as well as forcing mutability on some attributes. Dual events can sidestep this issue (one for the client with just what it provides and another for the domain including what it enriched the event from the client with) but this is the command event model, and the linguistic problems still exist.

You can see a further example of the linguistic problems involved in error conditions. How should the domain handle the fact that a client told it to do something that it cannot? This condition can exist for many reasons but let’s imagine a simple one of the client not having enough information to source the event in a known correct way.

Linguistically the command/event separation makes more sense here as the command arrives in the imperative “Place Sale” while the event is in the past tense “Sale Completed”. It's natural for the domain to reject a client attempting to “Place a sale”, it's not natural for the domain to tell the client that something in the past tense no longer happened. Consider the discussion with a domain expert. Does the domain have a time machine? Parallel realities are far too complex and costly to model in most business systems.

These are the problems that led to the separation of the concepts of Commands and Events. This separation makes the language much clearer and although subtle, it tends to lead developers towards a clearer understanding of context based solely on the language used. Dual definitions of a concept force the developer to recognize and distinguish context. This weight can translate into both ramp up time for new developers on a project and another thing a member of the team needs to remember. Anytime a team member needs to remember something to distinguish context there is a higher probability that they will overlook it or mistaken for another context. Being explicit in the language and avoiding dual definitions helps make things clearer both for domain experts, the developers, and anyone who may be consuming the API.

## Further reading

-   [DDD CQRS Video](https://www.youtube.com/watch?v=whCk1Q87_ZI)
-   [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html)
-   [Getting Started](~/getting-started/index.md)

[1]: ../img/structural-model.png "A simplified structural model of an order"

[2]: ../img/transactional-model.png "Transactional view of an order"

[3]: ../img/transactional-model-with-delete.png "Transactional view of an order with delete"

[4]: ../img/replaying-without-snapshot.png "An event stream"

[5]: ../img/replaying-with-snapshot.png "An event stream with embedded snapshot"

[6]: http://en.wikipedia.org/wiki/Fold_%28higher-order_function%29
