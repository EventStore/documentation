---
outputFileName: index.html
---

# Events as a storage mechanism

When most people consider storage for an object they tend to think about it in a structural sense. That is when considering how to store the sale discussed above they think of it as a "Sale" that has "Line Items" and perhaps "Shipping Information" associated with it. This is not the only way to conceptualize the problem and other solutions offer different and often interesting architectural properties.

Consider the creation of a small "Order" object for a web-based sale system. Most developers would envision something similar to the image below. An "Order" has "n Line Items" and "Shipping Information".

<!-- ![A simplified structural model of an order][1] -->

This is not the only way to view this data. Earlier we discussed the concept of a transaction. Developers deal with the concept of transactions regularly, you can view them as representing the change between a point and the next subsequent point, and they are often referred to as “deltas”.

You can define the delta between two static states, but frequently this is an implicit concept, relegated to a framework such as Hibernate in the Java world or Entity Framework in the Microsoft world. These frameworks save the original state and then calculate the differences with the new state and update the backing data model accordingly. Making these deltas explicit can be valuable for technical and business benefits.

You can see the usage of deltas in many mature business models. The canonical example of delta usage is in the field of accounting. When looking at a ledger such as below, each transaction or delta is recorded. Next to it is a denormalized total of the state of the account at the end of that delta. To calculate this value, the current delta is applied to the last known value. The last known value can be trusted because at any given point you could re-run the transactions from the "beginning of time" for that account to reconcile the validity of that value. A verifiable audit log always exists.

<table class="table">
  <tr>
    <th>Date</th>
    <th>Comment</th>
    <th>Change</th>
    <th>Current Balance</th>
  </tr>

  <tr>
    <td>1/Jan/2000</td>
    <td>Deposit from 1372</td>
    <td>+10,000.00</td>
    <td>10,000.00</td>
  </tr>

  <tr>
    <td>3/Jan/2000</td>
    <td>Check 1</td>
    <td>-4,000.00</td>
    <td>6,000.00</td>
  </tr>

  <tr>
    <td>4/Jan/2000</td>
    <td>Purchase Coffee</td>
    <td>-3.00</td>
    <td>5,997.00</td>
  </tr>

  <tr>
    <td>4/Jan/2000</td>
    <td>Purchase Internet</td>
    <td>-5.00</td>
    <td>5,992.00</td>
  </tr>

  <tr>
    <td>8/Jan/2000</td>
    <td>Deposit from 1373</td>
    <td>+1,000.00</td>
    <td>6,992.00</td>
  </tr>
</table>

Because the transactions or deltas associated with the account exist, you can step through them, verifying the result at each stage. You can derive the “Current Balance” at any point  by looking at the “Current Balance” or by adding up all the “Changes” since the beginning of time for the account. The second property is valuable in a domain such as accounting as accountants are dealing with money and the ability to check that calculations were performed correctly is invaluable. It was more valuable before computers when it was common place to have an exhausted accountant make a mistake in a calculation at 3am when they should be sleeping.

There are other interesting properties to this mechanism of representing state. As an example, it's possible to go back and look at what a state was at a given. Consider for example, that the account has reached a balance below zero and there is a rule that says it's not supposed to. It is relatively easy to view the state the account was in prior to processing the transaction that put it into the invalid state. This makes it far easier to reproduce what often end up as [heisenbugs](https://en.wikipedia.org/wiki/Heisenbug) in other circumstances.

These types of benefits are not only limited to naturally transaction based domains. Every domain is a naturally transaction-based domain when Domain Driven Design is applied. When applying Domain Driven Design there is a heavy focus on behaviours normally coinciding with use cases, Domain Driven Design is interested in how users use the system.

Returning to the order example from earlier, you could represent the same order in the form of a transactional model as below:

<!-- ![Transactional view of an order][2] -->

You can apply this to any type of object. By replaying through the events, you can return the object to the last known state. It is mathematically equivalent to storing the end of the equation or the equation that represents it. There is a structural representation of the object but it exists only by replaying previous transactions to return the structure to its last known state. Data is not persisted in a structure but as a series of transactions.

One interesting possibility is that unlike when storing current state in a structural way, there is no coupling between the representation of current state in the domain and in storage. The representation of current state in the domain can vary without thought of the persistence mechanism.

It is important to note the language in Figure 3. All of the verbs are in the past tense. These are Domain Events. Consider what would happen if the language were in the imperative tense, "Add 2 socks item 137", "Create Cart". What if there were behaviours associated with adding an item, such as reserving it from an inventory system via a webservice call? Should you include these behaviours when reconstituting an object?

What if logic has changed so that this item could no longer be added given the context? This is one of many examples where dual contexts between commands and events are required, there is a contextual difference between returning to a given state and attempting to transition to a new one.

### There is no delete

A common question that arises is how to delete information. It is not possible, as previously, to jump into the time machine and say that an event never happened (e.g. delete a previous event). As such, it is necessary to model a delete explicitly as a new transaction as shown below. Further discussion on the business value of handling deletes in this mechanism can be found in "[Business Value of the Event Log](~/event-sourcing-basics/business-value-of-the-event-log.md)".

<!-- ![Transactional view of an order with delete][3] -->

In the event stream above, the two pairs of socks were added then later removed. The end state is equivalent to not having added the two pairs of socks. However, the data was not deleted, new data was added to bring the object to the state as if the first event had not happened, this process is known as a "Reversal Transaction".

By placing a reversal transaction in the event stream, not only is the object returned to the state as if the item had not been added, the reversal leaves a trail that shows that the object had been in that state at a given point in time.
