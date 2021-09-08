export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "heroText": "EventStoreDB Documentation",
    "tagline": "The stream database built for Event Sourcing",
    "actions": [
      {
        "text": "Database server →",
        "link": "/latest.html"
      },
      {
        "text": "gRPC clients →",
        "link": "/clients/grpc/"
      },
      {
        "text": "Event Store Cloud →",
        "link": "/cloud/"
      }
    ],
    "features": [
      {
        "title": "Event Sourcing",
        "details": "EventStoreDB is built to support Event Sourcing. We support idempotent appending and reading events from individual streams."
      },
      {
        "title": "gRPC for clients",
        "details": "Using gRPC protocol for client-server communication allows us to provide SDKs for a wide range of languages and platforms."
      },
      {
        "title": "Immutable data",
        "details": "EventStoreDB stores your data as a series of immutable events over time, providing one of the strongest audit log options available (characteristics similar to a blockchain)."
      }
    ],
    "footer": "Copyright © 2021 EventStoreDB Limited"
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": 1629299987000,
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
