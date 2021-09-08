export const data = {
  "key": "v-3acb98d8",
  "path": "/clients/dotnet/21.2/appending/optimistic-concurrency-and-idempotence.html",
  "title": "Optimistic concurrency and idempotence",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Idempotence",
      "slug": "idempotence",
      "children": [
        {
          "level": 3,
          "title": "If you specify an expected version",
          "slug": "if-you-specify-an-expected-version",
          "children": []
        },
        {
          "level": 3,
          "title": "If you specify ExpectedVersion.Any",
          "slug": "if-you-specify-expectedversion-any",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "clients/dotnet/21.2/appending/optimistic-concurrency-and-idempotence.md",
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
