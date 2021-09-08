export const data = {
  "key": "v-d02913da",
  "path": "/resources/articles/snapshots-in-event-sourcing.html",
  "title": "Snapshots in Event Sourcing",
  "lang": "en-US",
  "frontmatter": {
    "title": "Snapshots in Event Sourcing",
    "date": "2021-05-21T00:00:00.000Z",
    "author": "Oskar Dudycz",
    "kind": "Article",
    "original": "https://www.eventstore.com/blog/snapshots-in-event-sourcing",
    "summary": "The article explains the general rules for temporal modelling and when (not) to use snapshots.",
    "tags": [
      "Snapshots"
    ]
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "resources/articles/snapshots-in-event-sourcing.md",
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
