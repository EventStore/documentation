export const data = {
  "key": "v-f32eacec",
  "path": "/clients/grpc/appending-events.html",
  "title": "Appending events",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Append your first event",
      "slug": "append-your-first-event",
      "children": []
    },
    {
      "level": 2,
      "title": "Working with EventData",
      "slug": "working-with-eventdata",
      "children": [
        {
          "level": 3,
          "title": "eventId",
          "slug": "eventid",
          "children": []
        },
        {
          "level": 3,
          "title": "type",
          "slug": "type",
          "children": []
        },
        {
          "level": 3,
          "title": "data",
          "slug": "data",
          "children": []
        },
        {
          "level": 3,
          "title": "metadata",
          "slug": "metadata",
          "children": []
        },
        {
          "level": 3,
          "title": "isJson",
          "slug": "isjson",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Handling concurrency",
      "slug": "handling-concurrency",
      "children": []
    },
    {
      "level": 2,
      "title": "User credentials",
      "slug": "user-credentials",
      "children": []
    }
  ],
  "filePathRelative": "clients/grpc/appending-events.md",
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
