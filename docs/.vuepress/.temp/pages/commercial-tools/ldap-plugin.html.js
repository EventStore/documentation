export const data = {
  "key": "v-586d801e",
  "path": "/commercial-tools/ldap-plugin.html",
  "title": "LDAP Authentication Plugin for EventStoreDB",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Troubleshooting common problems",
      "slug": "troubleshooting-common-problems",
      "children": [
        {
          "level": 3,
          "title": "Invalid bind credentials specified",
          "slug": "invalid-bind-credentials-specified",
          "children": []
        },
        {
          "level": 3,
          "title": "Exception during search - 'No such Object' or 'The object does not exist'",
          "slug": "exception-during-search-no-such-object-or-the-object-does-not-exist",
          "children": []
        },
        {
          "level": 3,
          "title": "'Server certificate error' or 'Connect Error - The authentication or decryption has failed'",
          "slug": "server-certificate-error-or-connect-error-the-authentication-or-decryption-has-failed",
          "children": []
        },
        {
          "level": 3,
          "title": "The LDAP server is unavailable.",
          "slug": "the-ldap-server-is-unavailable",
          "children": []
        },
        {
          "level": 3,
          "title": "Error authenticating with LDAPS server. System.AggregateException: One or more errors occurred. ---> System.NullReferenceException: Object reference not set to an instance of an object. at Novell.Directory.Ldap.Connection.connect(String host, Int32 port, Int32 semaphoreId)",
          "slug": "error-authenticating-with-ldaps-server-system-aggregateexception-one-or-more-errors-occurred-system-nullreferenceexception-object-reference-not-set-to-an-instance-of-an-object-at-novell-directory-ldap-connection-connect-string-host-int32-port-int32-semaphoreid",
          "children": []
        },
        {
          "level": 3,
          "title": "No errors in server logs but cannot login",
          "slug": "no-errors-in-server-logs-but-cannot-login",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "commercial-tools/ldap-plugin.md",
  "git": {
    "updatedTime": 1629266977000,
    "contributors": [
      {
        "name": "Alexey Zimarev",
        "email": "alex@zimarev.com",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
