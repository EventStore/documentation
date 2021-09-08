export const data = {
  "key": "v-3e0bb4be",
  "path": "/clients/dotnet/21.2/security/",
  "title": "Security",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Authentication",
      "slug": "authentication",
      "children": [
        {
          "level": 3,
          "title": "User authentication and authorization",
          "slug": "user-authentication-and-authorization",
          "children": []
        },
        {
          "level": 3,
          "title": "Secure EventStoreDB node",
          "slug": "secure-eventstoredb-node",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "clients/dotnet/21.2/security/README.md",
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
