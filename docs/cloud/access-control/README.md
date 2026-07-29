---
dir:
  text: "Access Control"
  order: 3
  link: true
---

# Access Control

Every organization in Kurrent Cloud has its own access control. From the
**Access Control** menu of an organization you manage who can access the
organization and what they are allowed to do:

* **Members** and **Invitations** — the people who have access to the
  organization, and the invitations that add them.
* **Groups** — named collections of members that permissions are attached to.
* **Policies** — the permissions that govern which resources a group can act on.
* **[Service accounts](service-accounts.md)** — non-human identities used by
  automation such as CI/CD pipelines, Terraform, and the `esc` CLI.
* **Settings** — organization-wide access controls, including
  **[single sign-on](sso.md)** (let members sign in with your own identity
  provider over SAML or OIDC) and
  **[multi-factor authentication](../ops/account-security.md#require-mfa-for-all-organization-users)**.

Access control is scoped to the organization. Projects inherit the
organization's members and add their own `Project admins` group for
project-level administration.

## Members and invitations

When you create an organization you become its admin by default. To add more
people, open the **Access Control** menu and switch to **Invitations**, then
click **Invite member**. Enter the new member's email address and choose the
group they join when they accept the invitation.

An invitation stays inactive in the **Invitations** list until it is accepted.
If the invitee loses the email, the invitation can be resent from the same list.

## Groups

Groups let you fine-tune access so that not every organization member is an
admin. The `Organization admins` group is created automatically with every new
organization, and its members have full access to the organization. Each project
additionally gets its own `Project admins` group.

Assign members to groups to grant them the permissions attached to those groups.
[Service accounts](service-accounts.md) are not permissioned through groups —
they carry their own [scopes](service-accounts.md#scopes) instead.

## Policies

Policies define what a group can do — which resources its members may view or
change. Attach them to groups rather than to individual members so that access
stays consistent as people join and leave.

## Next steps

* Configure [single sign-on](sso.md) so members authenticate through your
  identity provider.
* Create [service accounts](service-accounts.md) for automation and the `esc`
  CLI.
* Require [multi-factor authentication](../ops/account-security.md#require-mfa-for-all-organization-users)
  for all members of the organization.
