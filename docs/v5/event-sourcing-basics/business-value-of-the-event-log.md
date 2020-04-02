---
outputFileName: index.html
---

# Business value of the event log

> [!NOTE]
> The value of an event log is directly correlated with use cases that you would want to use Domain Driven Design in the first place. You should use Domain Driven Design in cases where the business derives competitive advantage. Domain Driven Design itself is difficult and expensive to apply, but a company will receive high ROI on the effort if the domain is complex and if they derive competitive advantage from it. Using an Event Log similarly will have high ROI when dealing with an area of competitive advantage but may have negative ROI in other places.

Storing only current state limits organizations to asking certain kinds of questions about the data. For example consider orders in the stock market. They can change for a few reasons. An order can change the volume to buy/sell, the trading system can automatically adjust the volume of an order, or a trade could occur lowering the volume available on the current order.

If posed with a question regarding current liquidity, such as the price for a given number of shares in the market, it does not matter which of these changes occurred. It does not matter how the data got the way it was. It matters what it is at a given point in time. A vast majority of queries even in the business world are focused on the what labels to send customers mails, how much was sold in April, how many widgets are in the warehouse.

There are however other types of queries that are becoming more and more popular in business. They focus on the how. Examples can commonly be seen in the buzzword “Business Intelligence”. Perhaps there is a correlation between people having done an action and their likelihood of purchasing some product? These types of questions generally focus on how something came into being as opposed to what it came out to be.

It is best to go through an example. There is a development team at a large online retailer. In an iteration planning meeting a domain expert comes up with an idea. He believes that there is a correlation between people having added then removed an item from their cart and their likelihood of responding to suggestions of that product by purchasing it at a later point. The feature is added to the following iteration.

The first hypothetical team is utilizing a stereotypical current state based mechanism for storing state. They plan that in this iteration they will add tracking of items via a fact table that are removed from carts. They plan for the next iteration that they will then build a report. The business will receive after the second iteration a report that can show them information back to the previous iteration when the team released the functionality that began tracking items being removed from carts.

This is a very stereotypical process. At some organizations the report and the tracking may be released simultaneously but this is a relatively small detail in the handling. From a business perspective the domain experts are happy. They made a request of the team and the team was able to quickly fulfill the request. New functionality has been added in a quick and relatively painless way. The second team will however have quite a different result.

The second team has been storing events; they represent their current state by building up off of a series of events. They just like the first team go through and add tracking of items removed from carts via a fact table but they also run this handler from the beginning of the event log to back populate all of the data from the time that the business started. They release the report in the same iteration and the report has data that dates back for years.

The second team can do this because they have managed to store what the system actually did as opposed to what the current state of data is. It is possible to go back and look and interpret the old data in new and interesting ways. It was never considered to track what items were removed from carts or perhaps the number of times a user removes and items from their cart was considered important. These are both examples of new and interesting ways of looking at data.

**As the events represent every action the system has undertaken any possible model describing the system can be built from the events.**

Businesses regularly come up with new and interesting ways of looking at data. It is not possible with any level of confidence to predict how a business will want to look at today’s data in five years. The ability for the business to look at the data in the way that it wants in five years is of an unknown but possibly extremely high value; it has already been stated that this should be done in areas where the business derives its competitive advantage so it is relatively easy to reason that the ability to look at today’s data in an unexpected way could be a competitive advantage for the business. How do you value the possible success or failure of a company based upon an architectural decision now?

How do software teams justify looking at their Magic 8 Ball to predict what the business will need in five or even ten years? Many try to use YAGNI (You Ain’t Gonna Need It) but YAGNI only applies when you actually know that you won’t need it. How can the dynamic world of business and how they may want to look at data in five or ten years be predicted?

-   Is it more expensive to actually model every behavior in the system? **Yes.**
-   Is it more expensive in terms of disk cost and thought process to store every event in the system? **Yes.**

**Are these costs worth the ROI when the business derives a competitive advantage from the data?**
