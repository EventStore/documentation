# Cloud quick start

Follow the steps in this guide to get access to the EventStoreDB Cloud console, provision your first cluster and connect it to your cloud infrastructure.

## Get an account

EventStoreDB offers a single sign-on (SSO) for our customers. Using a single account you get access to a variety of free and paid services.

To get an account, proceed to the [Cloud console](https://discuss.eventstore.com)  where you'll the login screen. There you get an option to sign up:

::: card 
![Sign up screen](./images/discuss-signup.png)
:::

::: tip
If you already have an account at our community forum (Discuss), you can use it to log in to Event Store Cloud.
:::

To finalize the sign-up process, you'd need to confirm your email address by clicking the link in the confirmation email. It might happen that the confirmation email doesn't get through, please check the junk email folder in your email client as you might find it there.

## Login to Cloud console

With the new account you can login to the [Cloud console](https://console.eventstore.cloud). From the console you can manage your organisations, users, projects and EventStoreDB clusters.

::: warning Gated provisioning
Since EventStoreDB Cloud is currently in preview, you won't be able to create new cloud resources like networks and clusters. Click on the `Request to enable provisioning` link to get provisioning enabled.
:::

In the console, you first get to the list of organisations, which you have access to.

::: card 
![Cloud organisations](./images/cloud-console-orgs.png)
:::

You start with an empty list, so you'd need to add an organisation.

::: tip
The Cloud console has the concept of Context. You'd normally be in the organisation context, or in the project context.
:::

## Organisations

With your account, you might have more than one organisation. Each organisation has its own billing account and therefore is invoiced separately for all the resources within the organisation. For example, if you have several customers and want to have separate EventStoreDB cluster for each customer and also be able to bill the customer for the cloud resources, you can separate each customer in its own organisation.

When you click on an organisation in the list, you get to the projects screen, where you can see all the projects for the selected organisation.

::: card 
![Projects within the organisation](./images/cloud-org-projects.png)
:::

Within the scope of the organisation, you also have the list of users and roles, billing information, alerts, and so on.

You can always switch to another organisation by clicking on the selected organisation name and either selecting the organisation from the list or clicking on `All organizations` to return to the list.

## Access control

Each organisation has its own access control. It includes the list of users, which have access to the organisation, groups, roles, policies and identity providers.

::: tip Preview functionality is limited
Some features like roles, policies and identity providers are currently not available in Preview. We will roll out all the access control features during the Preview phase, before EventStoreDB Cloud reaches the GA status.
:::

When you create an organisation, you will be the organisation admin by default. To invite more people, click on the `Access control` menu and then switch to `Invitations`. There, you will see the `Invite member` button, which brings the invite screen. You'd need to enter the email address for the new member and also the group, which the invited member gets added to when they accept the invite.

When you invite someone, the invitation will stay in the `Invitations` list and will be inactive until the invite gets accepted. You can always resend the invite if the invitee accidentally removes it from their inbox.

Groups allow you to fine-tune access so not each organisation member would be the admin. The `Organization admins` group gets automatically created when you create a new organisation and members of this group have full access to the organisation.

Each project also gets its own `Project admins` group.

## Projects

An organisation can have multiple projects. Projects serve as a logical grouping of cloud resources. For example, you might create separate projects per environment (test, staging, production) or per application, where each application might have one cluster per environment.

To create a new project, click on the `New project` button. Then, enter the project name and add administrators from the list of organisation users. Each project also gets its own `Project admins` group and all the users, which you add as administrators when creating the new project will become members of this group.

When you click on a project in the projects list, you get to the project context screen.

::: card 
![Project context](./images/cloud-project-screen.png)
:::

Within the project context you can manage project clusters, backups, networks, etc.

By reaching this point, you are now ready to start provisioning cloud resources with EventStoreDB Cloud. Follow one of the available guidelines for your cloud provider:

- [Amazon Web Services (AWS)](../provision/aws)
- [Google Cloud Platform (GCP)](../provision/gcp)
- [Microsoft Azure](../provision/azure)

## Events and notifications

On the Event Console, you will find messages about issues with your provisioned resources in the `Issues` section, and errors that happened during provisioning in the `Notifications` section.

For example, if the network peering failed, you can discover potential causes of the failure in the `Notifications` section of the Event Console:

::: card
![Notifications](./images/event-console.png)
:::





