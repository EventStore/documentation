# Security

### Certificate options

| Command line parameter | Environment variable prefixed with `EVENTSTORE_` | Config file YAML | Description |
|:-----------|:-------------|:--------|:-------|
| -AuthenticationType<br/>--authentication-type=VALUE<br/> | AUTHENTICATION_TYPE | AuthenticationType | The type of authentication to use. (Default: internal) |
| -AuthenticationConfig<br/>--authentication-config=VALUE<br/> | AUTHENTICATION_CONFIG | AuthenticationConfig | Path to the configuration file for authentication configuration (if applicable). |
| -CertificateStoreLocation<br/>--certificate-store-location=VALUE<br/> | CERTIFICATE_STORE_LOCATION | CertificateStoreLocation | The certificate store location name. |
| -CertificateStoreName<br/>--certificate-store-name=VALUE<br/> | CERTIFICATE_STORE_NAME | CertificateStoreName | The certificate store name. |
| -CertificateSubjectName<br/>--certificate-subject-name=VALUE<br/> | CERTIFICATE_SUBJECT_NAME | CertificateSubjectName | The certificate subject name. |
| -CertificateThumbprint<br/>--certificate-thumbprint=VALUE<br/> | CERTIFICATE_THUMBPRINT | CertificateThumbprint | The certificate fingerprint/thumbprint. |
| -CertificateFile<br/>--certificate-file=VALUE<br/> | CERTIFICATE_FILE | CertificateFile | The path to certificate file. |
| -CertificatePassword<br/>--certificate-password=VALUE<br/> | CERTIFICATE_PASSWORD | CertificatePassword | The password to certificate in file. |

