---
outputFileName: index.html
---

# Impedance mismatch

Using events as a storage mechanism offers different properties when compared to a typical relational model, as the impedance mismatch that exists between a typical relational model and the object oriented domain model is analyzed. Scott Ambler describes the problem in an essay on agiledata.org as:

> Why does this impedance mismatch exist? The object-oriented paradigm is based on proven software engineering principles. The relational paradigm, however, is based on proven mathematical principles. Because the underlying paradigms are different the two technologies do not work together seamlessly. The impedance mismatch becomes apparent when you look at the preferred approach to access: With the object paradigm you traverse objects via their relationships whereas with the relational paradigm you join the data rows of tables. This fundamental difference results in a non-ideal combination of object and relational technologies, although when have you ever used two different things together without a few hitches? <cite>Ambler</cite>

The impedance mismatch between the domain model and the relational database has a large cost associated with it. There are many tools that aim to help minimize the effects of the impedance mismatch such as Object Relational Mappers (ORMs). They tend to work well in most situations but there is a large cost associated to the impedance mismatch even when using tools such as ORMs.

The cost is that a developer needs to be intimately familiar with both the relational model and the object oriented model. They also need to be familiar with the subtle differences between the two models. Scott identifies this with:

> To succeed using objects and relational databases together you need to understand both paradigms, and their differences, and then make intelligent tradeoffs based on that knowledge. <cite>Ambler</cite>

You can find some of these subtle differences on Wikipedia under the "[Object-Relational Impedance Mismatch](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch)" page but to include some of the major differences:

> 1.  **Declarative vs. imperative interfaces** Relational thinking tends to use data as interfaces, not behaviour as interfaces. It thus has a declarative tilt in design philosophy in contrast to Object-oriented programming’s behavioural tilt. (Some relational proponents propose using triggers, stored procedures, etc. to provide complex behaviour, but this is not a common viewpoint.) <cite>Object-Relational Impedance Mismatch</cite>

> 2.  **Structure vs. behaviour** - Object-oriented programming primarily focuses on ensuring that the structure of the program is reasonable (maintainable, understandable, extensible, reusable, safe), whereas relational systems focus on what kind of behaviour the resulting run-time system has (efficiency, adaptability, fault-tolerance, liveness, logical integrity, etc.). Object-oriented methods generally assume that the primary user of the object-oriented code and its interfaces are the application developers. In relational systems, the end-user’s view of the behaviour of the system is sometimes considered to be more important. However, relational queries and "views" are common techniques to re-represent information in application- or task-specific configurations. Further, relational does not prohibit local or application-specific structures or tables from being created, although many common development tools do not directly provide such a feature, assuming objects will be used instead. This makes it difficult to know whether the stated non-developer perspective of relational is inherent to relational, or merely a product of current practice and tObject-oriented programmingl implementation assumptions. <cite>Object-Relational Impedance Mismatch</cite>

> 3.  **Set vs. graph relationships** The relationship between different items (objects or records) tend to be handled differently between the paradigms. Relational relationships are usually based on idioms taken from set theory, while object relationships lean toward idioms adopted from graph theory (including trees). While each can represent the same information as the other, the approaches they provide to access and manage information differ. <cite>Object-Relational Impedance Mismatch</cite>

There are many other subtle differences such as data types, identity, and how transactions work. The object-relational impedance mismatch can be quite a pain to deal with and it requires a very large amount of knowledge to deal with effectively.

There is not an impedance mismatch between events and the domain model. The events are themselves a domain concept. The idea of replaying events to reach a given state is also a domain concept. The entire system becomes defined in domain terms. Defining everything in domain terms not only lowers the amount of knowledge that developers need to have but it also limits the number of representations of the model needed as the events are directly tied to the domain model itself.
