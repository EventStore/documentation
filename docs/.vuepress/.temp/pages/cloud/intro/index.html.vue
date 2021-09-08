<template><h2 id="what-s-event-store-cloud" tabindex="-1"><a class="header-anchor" href="#what-s-event-store-cloud" aria-hidden="true">#</a> What's Event Store Cloud?</h2>
<p>Event Store Cloud allows you to deploy a managed EventStoreDB cluster in AWS, GCP, and Azure. The cloud cluster is optimised for the specific cloud provider and provisioned as a multi-zone VM set.</p>
<div class="custom-container tip"><p class="custom-container-title">Learn more</p>
<p>Not using Event Store Cloud and want to learn more? Find more information and sign up links <a href="https://www.eventstore.com/event-store-cloud" target="_blank" rel="noopener noreferrer">on our website<OutboundLink/></a>.</p>
</div>
<p>As a customer of Event Store Cloud you get access to the <a href="https://console.eventstore.cloud" target="_blank" rel="noopener noreferrer">Cloud console<OutboundLink/></a>, where you can provision and manage EventStoreDB clusters, back and up restore your data, establish the connection between Event Store Cloud networks and your own cloud infrastructure.</p>
<p>The Cloud console uses the <RouterLink to="/cloud/automation/api.html">API</RouterLink>, which is also available for customers. Using the API, you can execute any operation available in the console, programmatically. We also offer the <a href="https://github.com/EventStore/terraform-provider-eventstorecloud" target="_blank" rel="noopener noreferrer">Terraform provider<OutboundLink/></a> and the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">CLI tool<OutboundLink/></a> which is built on top of the same API.</p>
<p>The roadmap can be found <a href="https://www.eventstore.com/event-store-cloud" target="_blank" rel="noopener noreferrer">here<OutboundLink/></a>.</p>
<h2 id="cloud-quick-start" tabindex="-1"><a class="header-anchor" href="#cloud-quick-start" aria-hidden="true">#</a> Cloud quick start</h2>
<p>Follow the steps in this guide to get access to the Event Store Cloud console, provision your first cluster and connect it to your cloud infrastructure.</p>
<h3 id="get-an-account" tabindex="-1"><a class="header-anchor" href="#get-an-account" aria-hidden="true">#</a> Get an account</h3>
<p>EventStoreDB offers a single sign-on (SSO) for our customers. Using a single account you get access to a variety of free and paid services.</p>
<p>To get an account, proceed to the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud console<OutboundLink/></a>  where you'll see the login screen. There you get an option to sign up:</p>
<Card><template #content><p><img src="@source/cloud/intro/images/discuss-signup.png" alt="Sign up screen"></p>
</template></Card><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>If you already have an account at our community forum (Discuss), you can use it to log in to Event Store Cloud.</p>
</div>
<p>To finalize the sign-up process, you'd need to confirm your email address by clicking the link in the confirmation email. It might happen that the confirmation email doesn't get through, please check the junk email folder in your email client as you might find it there.</p>
<h3 id="login-to-cloud-console" tabindex="-1"><a class="header-anchor" href="#login-to-cloud-console" aria-hidden="true">#</a> Login to Cloud console</h3>
<p>With the new account you can login to the <a href="https://console.eventstore.cloud" target="_blank" rel="noopener noreferrer">Cloud console<OutboundLink/></a>. From the console you can manage your organisations, users, projects and EventStoreDB clusters.</p>
<div class="custom-container warning"><p class="custom-container-title">Gated provisioning</p>
<p>You won't be able to create new cloud resources like networks and clusters. Click on the <code>Request to enable provisioning</code> link to get provisioning enabled.</p>
</div>
<p>In the console, you first get to the list of organisations that you have access to.</p>
<Card><template #content><p><img src="@source/cloud/intro/images/cloud-console-orgs.png" alt="Cloud organisations"></p>
</template></Card><p>You start with an empty list, so you'll need to add an organisation.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The Cloud console has the concept of Context. You'd normally be in the organisation context or in the project context.</p>
</div>
<h3 id="organisations" tabindex="-1"><a class="header-anchor" href="#organisations" aria-hidden="true">#</a> Organisations</h3>
<p>With your account, you might have more than one organisation. Each organisation has its own billing account and therefore is invoiced separately for all the resources within the organisation. For example, if you have several customers and want to have a separate EventStoreDB cluster for each customer and also be able to bill the customer for the cloud resources, you can separate each customer into its own organisation.</p>
<p>When you click on an organisation in the list, you get to the projects screen, where you can see all the projects for the selected organisation.</p>
<Card><template #content><p><img src="@source/cloud/intro/images/cloud-org-projects.png" alt="Projects within the organisation"></p>
</template></Card><p>Within the scope of the organisation, you also have the list of users and roles, billing information, alerts, and so on.</p>
<p>You can always switch to another organisation by clicking on the selected organisation name and either selecting the organisation from the list or clicking on <code>All organizations</code> to return to the list.</p>
<h3 id="access-control" tabindex="-1"><a class="header-anchor" href="#access-control" aria-hidden="true">#</a> Access control</h3>
<p>Each organisation has its own access control. It includes the list of users, which have access to the organisation, groups, roles, policies and identity providers.</p>
<p>When you create an organisation, you will be the organisation admin by default. To invite more people, click on the <code>Access control</code> menu and then switch to <code>Invitations</code>. There, you will see the <code>Invite member</code> button, which brings the invite screen. You'd need to enter the email address for the new member and also the group, which the invited member gets added to when they accept the invite.</p>
<p>When you invite someone, the invitation will stay in the <code>Invitations</code> list and will be inactive until the invite gets accepted. You can always resend the invite if the invitee accidentally removes it from their inbox.</p>
<p>Groups allow you to fine-tune access so not each organisation member would be the admin. The <code>Organization admins</code> group gets automatically created when you create a new organisation and members of this group have full access to the organisation.</p>
<p>Each project also gets its own <code>Project admins</code> group.</p>
<h3 id="projects" tabindex="-1"><a class="header-anchor" href="#projects" aria-hidden="true">#</a> Projects</h3>
<p>An organisation can have multiple projects. Projects serve as a logical grouping of cloud resources. For example, you might create separate projects per environment (test, staging, production) or per application, where each application might have one cluster per environment.</p>
<p>To create a new project, click on the <code>New project</code> button. Then, enter the project name and add administrators from the list of organisation users. Each project also gets its own <code>Project admins</code> group and all the users, which you add as administrators when creating the new project will become members of this group.</p>
<p>When you click on a project in the projects list, you get to the project context screen.</p>
<Card><template #content><p><img src="@source/cloud/intro/images/cloud-project-screen.png" alt="Project context"></p>
</template></Card><p>Within the project context you can manage project clusters, backups, networks, etc.</p>
<p>By reaching this point, you are now ready to start provisioning cloud resources with Event Store Cloud. Follow one of the available guidelines for your cloud provider:</p>
<ul>
<li><a href="../provision/aws">Amazon Web Services (AWS)</a></li>
<li><a href="../provision/gcp">Google Cloud Platform (GCP)</a></li>
<li><a href="../provision/azure">Microsoft Azure</a></li>
</ul>
<h3 id="events-and-notifications" tabindex="-1"><a class="header-anchor" href="#events-and-notifications" aria-hidden="true">#</a> Events and notifications</h3>
<p>On the Event Console, you will find messages about issues with your provisioned resources in the <code>Issues</code> section, and errors that happened during provisioning in the <code>Notifications</code> section.</p>
<p>For example, if the network peering failed, you can discover potential causes of the failure in the <code>Notifications</code> section of the Event Console:</p>
<Card><template #content><p><img src="@source/cloud/intro/images/event-console.png" alt="Notifications"></p>
</template></Card><h2 id="operational-status" tabindex="-1"><a class="header-anchor" href="#operational-status" aria-hidden="true">#</a> Operational status</h2>
<p>You can check and subscribe to the current status of the Event Store Cloud Console at <a href="https://status.eventstore.cloud" target="_blank" rel="noopener noreferrer">status.eventstore.cloud<OutboundLink/></a> or by using our <a href="https://twitter.com/esc_status" target="_blank" rel="noopener noreferrer">twitter account<OutboundLink/></a>.</p>
<p>Should there be any outage of the console it will be shown and updated here.</p>
</template>
