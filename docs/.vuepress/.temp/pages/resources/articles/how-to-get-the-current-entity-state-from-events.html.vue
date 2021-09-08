<template><p><img src="@source/resources/articles/images/how-to-get-the-current-entity-state-from-events/how-to-get-the-current-entity-state-from-events-1.svg" alt="cover"></p>
<p>In Event Sourcing, the application state is stored in events. When we add an event, it is placed at the end of a structure called an append-only log (read more in this post <a href="https://event-driven.io/en/relational_databases_are_event_stores/" target="_blank" rel="noopener noreferrer">What if I told you that Relational Databases are in fact Event Stores?<OutboundLink/></a>). Events are the source of truth. This has many advantages, such as:</p>
<ul>
<li>the history of changes in our system,</li>
<li>easier diagnostics,</li>
<li>closeness to business, as our code structures correspond to business facts.</li>
</ul>
<p>However, it does not have to cause an automatic revolution in our code. We can still use aggregates/entities. In Event Sourcing, events are logically grouped linked into streams. Streams are ordered sequences of events. One stream includes all events for a given business object, e.g. <em>InvoiceInitiated</em>, <em>InvoiceIssued</em>, <em>InvoiceSent</em>.</p>
<p>Many people believe that Snapshots are a must-have in an Event-Sourced system. Instead of retrieving all stream events to rebuild the state, we could retrieve one record and use it for our business logic. It sounds promising and can be useful as a technical optimisation technique, but should not be consistently used as a starting point. Isn’t loading more than one event a performance issue? Frankly, it’s not. Downloading even a dozen, or several dozens of small events is not a significant overhead. Events are concise, containing only the information needed. Event Stores are optimised for such operations, and the reads scale well (read more in this article <a href="https://www.eventstore.com/blog/snapshots-in-event-sourcing" target="_blank" rel="noopener noreferrer">Snapshots in Event Sourcing<OutboundLink/></a>).</p>
<p>Thus recommended approach is to build the current state from events. To we need to perform the following steps:</p>
<ol>
<li>Get all events for a given stream. We choose them based on the stream identifier (derived from the business object/record id).</li>
<li>Sort them in the order of occurrence.</li>
<li>Create a default, empty entity (e.g. using the default constructor).</li>
<li>Apply each event sequentially to the entity.</li>
</ol>
<p>The first three points are, I think it’s obvious, but what does &quot;apply an event&quot; mean? There are two ways:</p>
<ul>
<li>Use the <em>When</em> function. We’re passing a generic event object as an input parameter. Inside the method, we can use “pattern matching” to determine what logic applies to the specific event type. It is a framework-independent solution. You have to write a bit more yourself, but there is less magic.</li>
<li>Some frameworks provide convention-based solutions that simplify handling and make it a bit more magical. You could build a convention based mechanism that would read events and apply them internally.</li>
</ul>
<p>This process is also called stream aggregation. Let’s focus for now on the general approach to understand the flow properly. In C#, it might look like this:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">record</span> <span class="token function">Person</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Name<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Address
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name">record</span> <span class="token function">InvoiceInitiated</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">double</span></span> Amount<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Number<span class="token punctuation">,</span>
    <span class="token class-name">Person</span> IssuedTo<span class="token punctuation">,</span>
    <span class="token class-name">DateTime</span> InitiatedAt
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name">record</span> <span class="token function">InvoiceIssued</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> IssuedBy<span class="token punctuation">,</span>
    <span class="token class-name">DateTime</span> IssuedAt
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">InvoiceSendMethod</span>
<span class="token punctuation">{</span>
    Email<span class="token punctuation">,</span>
    Post
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name">record</span> <span class="token function">InvoiceSent</span><span class="token punctuation">(</span>
    <span class="token class-name">InvoiceSendMethod</span> SentVia<span class="token punctuation">,</span>
    <span class="token class-name">DateTime</span> SentAt
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">InvoiceStatus</span>
<span class="token punctuation">{</span>
    Initiated <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    Issued <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
    Sent <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Invoice</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span><span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Amount <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Number <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">InvoiceStatus</span> Status <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">Person</span> IssuedTo <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> InitiatedAt <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> IssuedBy <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> IssuedAt <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">InvoiceSendMethod</span> SentVia <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> SentAt <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">When</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> @<span class="token keyword">event</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>@<span class="token keyword">event</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token class-name">InvoiceInitiated</span> invoiceInitiated<span class="token punctuation">:</span>
                <span class="token function">Apply</span><span class="token punctuation">(</span>invoiceInitiated<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token class-name">InvoiceIssued</span> invoiceIssued<span class="token punctuation">:</span>
                <span class="token function">Apply</span><span class="token punctuation">(</span>invoiceIssued<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token class-name">InvoiceSent</span> invoiceSent<span class="token punctuation">:</span>
                <span class="token function">Apply</span><span class="token punctuation">(</span>invoiceSent<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token class-name">InvoiceInitiated</span> @<span class="token keyword">event</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>Number<span class="token punctuation">;</span>
        Amount <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>Amount<span class="token punctuation">;</span>
        Number <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>Number<span class="token punctuation">;</span>
        IssuedTo <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>IssuedTo<span class="token punctuation">;</span>
        InitiatedAt <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>InitiatedAt<span class="token punctuation">;</span>
        Status <span class="token operator">=</span> InvoiceStatus<span class="token punctuation">.</span>Initiated<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token class-name">InvoiceIssued</span> @<span class="token keyword">event</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        IssuedBy <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>IssuedBy<span class="token punctuation">;</span>
        IssuedAt <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>IssuedAt<span class="token punctuation">;</span>
        Status <span class="token operator">=</span> InvoiceStatus<span class="token punctuation">.</span>Issued<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token class-name">InvoiceSent</span> @<span class="token keyword">event</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        SentVia <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>SentVia<span class="token punctuation">;</span>
        SentAt <span class="token operator">=</span> @<span class="token keyword">event</span><span class="token punctuation">.</span>SentAt<span class="token punctuation">;</span>
        Status <span class="token operator">=</span> InvoiceStatus<span class="token punctuation">.</span>Sent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div><p>The usage as follows:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> invoiceInitiated <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvoiceInitiated</span><span class="token punctuation">(</span>
    <span class="token number">34.12</span><span class="token punctuation">,</span>
    <span class="token string">"INV/2021/11/01"</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Oscar the Grouch"</span><span class="token punctuation">,</span> <span class="token string">"123 Sesame Street"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    DateTime<span class="token punctuation">.</span>UtcNow
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> invoiceIssued <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvoiceIssued</span><span class="token punctuation">(</span>
    <span class="token string">"Cookie Monster"</span><span class="token punctuation">,</span>
    DateTime<span class="token punctuation">.</span>UtcNow
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> invoiceSent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvoiceSent</span><span class="token punctuation">(</span>
    InvoiceSendMethod<span class="token punctuation">.</span>Email<span class="token punctuation">,</span>
    DateTime<span class="token punctuation">.</span>UtcNow
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 1,2. Get all events and sort them in the order of appearance</span>
<span class="token class-name"><span class="token keyword">var</span></span> events <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>invoiceInitiated<span class="token punctuation">,</span> invoiceIssued<span class="token punctuation">,</span> invoiceSent<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 3. Construct empty Invoice object</span>
<span class="token class-name"><span class="token keyword">var</span></span> invoice <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Invoice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 4. Apply each event on the entity.</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> @<span class="token keyword">event</span> <span class="token keyword">in</span> events<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    invoice<span class="token punctuation">.</span><span class="token function">When</span><span class="token punctuation">(</span>@<span class="token keyword">event</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>If you prefer, you can add the base class with an abstract method to make sure that classes follow the convention and write the more generalised logic.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Aggregate<span class="token punctuation">&lt;</span>TId<span class="token punctuation">></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">TId</span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">protected</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">When</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> @<span class="token keyword">event</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Having that, we could write such a method for <a href="https://developers.eventstore.com/" target="_blank" rel="noopener noreferrer">EventStoreDB<OutboundLink/></a> to retrieve the aggregate state from events:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>TAggregate<span class="token punctuation">?</span><span class="token punctuation">></span></span> <span class="token generic-method"><span class="token function">Find</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TAggregate<span class="token punctuation">,</span> TId<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">Guid</span> id<span class="token punctuation">,</span> <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span>
    <span class="token keyword">where</span> <span class="token class-name">TAggregate</span><span class="token punctuation">:</span> Aggregate<span class="token operator">&lt;</span>TId<span class="token operator">></span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> readResult <span class="token operator">=</span> eventStore<span class="token punctuation">.</span><span class="token function">ReadStreamAsync</span><span class="token punctuation">(</span>
        Direction<span class="token punctuation">.</span>Forwards<span class="token punctuation">,</span>
        <span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Name</span><span class="token punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">id</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
        StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>
        <span class="token named-parameter punctuation">cancellationToken</span><span class="token punctuation">:</span> cancellationToken
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> aggregate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TAggregate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> @<span class="token keyword">event</span> <span class="token keyword">in</span> readResult<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> eventData <span class="token operator">=</span> <span class="token function">Deserialize</span><span class="token punctuation">(</span>@<span class="token keyword">event</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        aggregate<span class="token punctuation">.</span><span class="token function">When</span><span class="token punctuation">(</span>eventData<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> aggregate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Of course, this is a highly imperative approach. However, if we prefer a functional approach, we could use a pattern described in this article <a href="https://event-driven.io/en/partial_typescript/" target="_blank" rel="noopener noreferrer">Why Partial is an extremely useful TypeScript feature?<OutboundLink/></a></p>
<p>In the functional approach, we don’t need base classes. We don’t need aggregates. Instead, we’re splitting the behaviour (functions) from the state (entity).</p>
<p>In TypeScript, having event and entity defined as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Event<span class="token operator">&lt;</span>
  EventType <span class="token keyword">extends</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  EventData <span class="token keyword">extends</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span><span class="token punctuation">,</span>
  EventMetadata <span class="token keyword">extends</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span>
<span class="token operator">></span></span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventType<span class="token operator">></span><span class="token punctuation">;</span>
  data<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventData<span class="token operator">></span><span class="token punctuation">;</span>
  metadata<span class="token operator">?</span><span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventMetadata<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  address<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token operator">></span>

<span class="token keyword">type</span> <span class="token class-name">InvoiceInitiated</span> <span class="token operator">=</span> Event<span class="token operator">&lt;</span>
  <span class="token string">'invoice-initiated'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    amount<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    issuedTo<span class="token operator">:</span> Person<span class="token punctuation">;</span>
    initiatedAt<span class="token operator">:</span> Date<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">InvoiceIssued</span> <span class="token operator">=</span> Event<span class="token operator">&lt;</span>
  <span class="token string">'invoice-issued'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    issuedBy<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    issuedAt<span class="token operator">:</span> Date<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">InvoiceSent</span> <span class="token operator">=</span> Event<span class="token operator">&lt;</span>
  <span class="token string">'invoice-sent'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    sentVia<span class="token operator">:</span> InvoiceSendMethod<span class="token punctuation">;</span>
    sentAt<span class="token operator">:</span> Date<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">InvoiceEvent</span> <span class="token operator">=</span>
  <span class="token operator">|</span> InvoiceInitiated 
  <span class="token operator">|</span> InvoiceIssued 
  <span class="token operator">|</span> InvoiceSent<span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Invoice</span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  amount<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  status<span class="token operator">:</span> InvoiceStatus<span class="token punctuation">;</span>

  issuedTo<span class="token operator">:</span> Person<span class="token punctuation">;</span>
  initiatedAt<span class="token operator">:</span> Date<span class="token punctuation">;</span>

  issued<span class="token operator">?</span><span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
    by<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    at<span class="token operator">?</span><span class="token operator">:</span> Date<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span>

  sent<span class="token operator">?</span><span class="token operator">:</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
    via<span class="token operator">?</span><span class="token operator">:</span> InvoiceSendMethod<span class="token punctuation">;</span>
    at<span class="token operator">?</span><span class="token operator">:</span> Date<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div><p>We can define the <em>When</em> method as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">when</span><span class="token punctuation">(</span>
  currentState<span class="token operator">:</span> Partial<span class="token punctuation">,</span>
  event<span class="token operator">:</span> CashRegisterEvent
<span class="token punctuation">)</span><span class="token operator">:</span> Partial <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">'invoice-initiated'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token builtin">number</span><span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token builtin">number</span><span class="token punctuation">,</span>
        amount<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>amount<span class="token punctuation">,</span>
        status<span class="token operator">:</span> InvoiceStatus<span class="token punctuation">.</span><span class="token constant">INITIATED</span><span class="token punctuation">,</span>
        issuedTo<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>issuedTo<span class="token punctuation">,</span>
        initiatedAt<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>initiatedAt<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">'invoice-issued'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
        status<span class="token operator">:</span> InvoiceStatus<span class="token punctuation">.</span><span class="token constant">ISSUED</span><span class="token punctuation">,</span>
        issued<span class="token operator">:</span> <span class="token punctuation">{</span>
          by<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>issuedBy<span class="token punctuation">,</span>
          at<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>issuedAt<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token string">'invoice-sent'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
        status<span class="token operator">:</span> InvoiceStatus<span class="token punctuation">.</span><span class="token constant">SENT</span><span class="token punctuation">,</span>
        sent<span class="token operator">:</span> <span class="token punctuation">{</span>
          via<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>sentVia<span class="token punctuation">,</span>
          at<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>sentAt<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>Using the reduce method and partial type described in the previously mentioned article, we can define the generic stream aggregation method as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">aggregateStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>Aggregate<span class="token punctuation">,</span> StreamEvents <span class="token keyword">extends</span> Event<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  events<span class="token operator">:</span> StreamEvents<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function-variable function">when</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    currentState<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
    event<span class="token operator">:</span> StreamEvents
  <span class="token punctuation">)</span> <span class="token operator">=></span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
  check<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> state <span class="token keyword">is</span> Aggregate
<span class="token punctuation">)</span><span class="token operator">:</span> Aggregate <span class="token punctuation">{</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> events<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">reduce</span><span class="token generic class-name"><span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">>></span></span></span><span class="token punctuation">(</span>when<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>check<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'No type check method was provided in the aggregate method'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>Aggregate<span class="token operator">></span>state<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">check</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">'Aggregate state is not valid'</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> state<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Then we could use it as follows to rebuild the current state:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> resolvedEvents <span class="token operator">=</span> <span class="token keyword">await</span> eventStore<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">invoice-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>invoiceId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> events <span class="token operator">=</span> resolvedEvents
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
      data<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span>
      metadata<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">?.</span>metadata<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> invoice <span class="token operator">=</span> <span class="token generic-function"><span class="token function">aggregateStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>Invoice<span class="token punctuation">,</span> InvoiceEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    events<span class="token punctuation">,</span>
    when<span class="token punctuation">,</span>
    isInvoice
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Object-oriented way brings more ceremony. However, it has an advantage against the functional approach, keeping object state and behaviour grouped together.</p>
<p>Stream aggregation is a simple but powerful pattern. It allows for easy debugging, writing unit tests and better control over what is happening. It's also the basis for doing the essence of Event Sourcing, so treating events as the source of truth.</p>
<p>Check out the detailed samples in these repositories:</p>
<ul>
<li><a href="https://github.com/oskardudycz/EventSourcing.NetCore" target="_blank" rel="noopener noreferrer">https://github.com/oskardudycz/EventSourcing.NetCore<OutboundLink/></a></li>
<li><a href="https://github.com/oskardudycz/EventSourcing.NodeJS" target="_blank" rel="noopener noreferrer">https://github.com/oskardudycz/EventSourcing.NodeJS<OutboundLink/></a></li>
</ul>
</template>
