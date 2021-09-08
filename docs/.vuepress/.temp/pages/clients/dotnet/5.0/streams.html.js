export const data = {
  "key": "v-de8f6c0e",
  "path": "/clients/dotnet/5.0/streams.html",
  "title": "Stream metadata",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Read stream metadata",
      "slug": "read-stream-metadata",
      "children": []
    },
    {
      "level": 2,
      "title": "Writing metadata",
      "slug": "writing-metadata",
      "children": []
    },
    {
      "level": 2,
      "title": "Deleting a stream",
      "slug": "deleting-a-stream",
      "children": [
        {
          "level": 3,
          "title": "Soft delete",
          "slug": "soft-delete",
          "children": []
        },
        {
          "level": 3,
          "title": "Hard delete",
          "slug": "hard-delete",
          "children": []
        },
        {
          "level": 3,
          "title": "Deleted events and subscriptions",
          "slug": "deleted-events-and-subscriptions",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "clients/dotnet/5.0/streams.md",
  "git": {
    "updatedTime": 1629469352000,
    "contributors": [
      {
        "name": "Alexey Zimarev",
        "email": "alex@zimarev.com",
        "commits": 2
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
