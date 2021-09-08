export const data = {
  "key": "v-23742faa",
  "path": "/resources/articles/replicator.html",
  "title": "Event Store Replicator",
  "lang": "en-US",
  "frontmatter": {
    "title": "Event Store Replicator",
    "date": "2021-06-09T00:00:00.000Z",
    "author": "Alexey Zimarev",
    "kind": "Article",
    "original": "https://www.eventstore.com/blog/event-store-replicator",
    "summary": "Check how the Replicator tool can help you to ease EventStoreDB migration.",
    "tags": [
      "Tools"
    ]
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "resources/articles/replicator.md",
  "git": {
    "updatedTime": 1629466937000,
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
