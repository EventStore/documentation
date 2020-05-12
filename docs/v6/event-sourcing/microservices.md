# Microservices

Over the last few years, the microservices pattern became known and well-adopted. The promise of microservices is appealing - create small autonomous components, eliminate dependencies, enable team autonomy. Low coupling and high cohesion - the holy grail of software development seems feasible to achieve when using microservices. 

However, as the Service-Oriented Architecture (SOA) produced a lot of controversy during the peak of its popularity and beyond, microservices, as "SOA done right" suffer from many misconceptions and fundamentally flawed implementation patterns.

In this section you will learn how the microservices architecture can be enriched with Event Sourcing, what benefits the synergy can bring and what can definitely go wrong.

## Service boundaries

The term "microservice" implies that a service can only be a "microservice" if it is small. The issue is that "small" is a subjective measure. For a codebase with a few millions lines of code for one monolithic application, anything less than ten thousand lines of code would be small. Some say that a microservice should be less than a thousand lines of code, or less than 300. These days, however, developers and architects turned back to the original service definition of SOA and try to define service boundaries that march with business capabilities.

::: el-divider
<i class="el-icon-reading"></i>
:::
_A service is the technical authority for a specific business capability._
_Any piece of data or rule must be owned by only one service._
::: el-divider content-position="right"
Udi Dahan, [The Known Unknowns of SOA](http://udidahan.com/2010/11/15/the-known-unknowns-of-soa/)
:::

