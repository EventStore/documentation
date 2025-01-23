---
title: Account Security
order: 6
---

## Multi-factor Authentication (MFA)

Our MFA solution integrates exclusively with authenticator apps, offering a convenient and secure method for users to verify their identities.  When setting up MFA, ensure your device is ready to use, as the process involves generating and entering authenticator codes.

### User MFA

To enable Multi-factor Authentication (MFA) within the user interface, navigate to the `Preferences` section and click on the `Enable MFA` button.

![Preferences - MFA](./images/intro/mfa-preferences.png)

You will be logged out as part of the MFA enrollment process. Follow the guided prompts to complete the enrollment.

![MFA Setup Process](./images/intro/mfa-setup-process.png)

### Re-generating tokens from `esc` with MFA

Once MFA is enabled, tokens generated with the `esc` command-line tool are invalidated. To regain access, generate new tokens using the following command:

```bash
esc access tokens create
```

You will be prompted for your password and an authenticator code as part of the process.

Alternatively, if you prefer to obtain a token through the Cloud Console, navigate to the [Authentication Tokens](https://console.kurrent.cloud/authentication-tokens) page and click the `Request refresh token` button.

## Audit Log API
The Audit Log API displays an organization's activities as a series of events. It provides access to an audit trail of changes made by the current user or for the entire organization.

Audit logs for an organization are only accessible by organization admins. However, any user can view the changes that he/she made in the cloud.

### Get audit logs for the current user

Usage: `esc audit user get`

Optional Parameters:
* `-o, --org-id`: The organization ID for which to retrieve audit logs.
* `-a, --after`: Only get logs after this timestamp.
* `-b, --before`: Only get logs before this timestamp.
* `-l, --limit`: The maximum number of records to retrieve.

### Get audit logs for an entire organization

Usage: `esc audit organization get -o {orgId}`

Required Parameters:
* `-o, --org-id`: The organization ID for which to retrieve audit logs.

Optional Parameters:
* `-a, --after`: Only get logs after this timestamp.
* `-b, --before`: Only get logs before this timestamp.
* `-l, --limit`: The maximum number of records to retrieve.
