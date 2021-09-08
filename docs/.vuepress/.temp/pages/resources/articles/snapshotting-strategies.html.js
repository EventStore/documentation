export const data = {
  "key": "v-44678d1c",
  "path": "/resources/articles/snapshotting-strategies.html",
  "title": "Snapshotting Strategies",
  "lang": "en-US",
  "frontmatter": {
    "title": "Snapshotting Strategies",
    "date": "2021-07-16T00:00:00.000Z",
    "author": "Oskar Dudycz",
    "kind": "Article",
    "original": "https://www.eventstore.com/blog/snapshotting-strategies",
    "summary": "Snapshots are the technical optimisation for read model performance. Read more to learn how to apply them in practice when you need them.",
    "tags": [
      "Snapshots"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Storage",
      "slug": "storage",
      "children": []
    },
    {
      "level": 2,
      "title": "Reading",
      "slug": "reading",
      "children": []
    },
    {
      "level": 2,
      "title": "Reading snapshot from the separate stream",
      "slug": "reading-snapshot-from-the-separate-stream",
      "children": []
    },
    {
      "level": 2,
      "title": "Reading snapshot from the same stream",
      "slug": "reading-snapshot-from-the-same-stream",
      "children": []
    },
    {
      "level": 2,
      "title": "Storing snapshots to the separate stream",
      "slug": "storing-snapshots-to-the-separate-stream",
      "children": []
    },
    {
      "level": 2,
      "title": "Storing snapshots to the same stream",
      "slug": "storing-snapshots-to-the-same-stream",
      "children": []
    },
    {
      "level": 2,
      "title": "Separate stream vs the same stream considerations",
      "slug": "separate-stream-vs-the-same-stream-considerations",
      "children": []
    },
    {
      "level": 2,
      "title": "Storing snapshot during the command handling",
      "slug": "storing-snapshot-during-the-command-handling",
      "children": []
    },
    {
      "level": 2,
      "title": "Storing snapshot asynchronously with subscriptions",
      "slug": "storing-snapshot-asynchronously-with-subscriptions",
      "children": []
    },
    {
      "level": 2,
      "title": "When to do snapshots?",
      "slug": "when-to-do-snapshots",
      "children": []
    },
    {
      "level": 2,
      "title": "Final words",
      "slug": "final-words",
      "children": []
    }
  ],
  "filePathRelative": "resources/articles/snapshotting-strategies.md",
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
