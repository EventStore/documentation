export const data = {
  "key": "v-6bc96ce5",
  "path": "/resources/release-notes/tcp-client-5-0-11.html",
  "title": ".NET TCP client 5.0.11",
  "lang": "en-US",
  "frontmatter": {
    "title": ".NET TCP client 5.0.11",
    "date": "2021-04-12T00:00:00.000Z",
    "author": "Hayley Campbell",
    "kind": "Post",
    "tag": [
      "release notes"
    ]
  },
  "excerpt": "<p>The TCP client for .NET release extends the auto-compatibility functionality introduced in v5.0.10 to allow it to work with Gossip Seeds as well as ClusterDNS. We hope that this will simplify the upgrade process from v5 to v20.</p>\n",
  "headers": [
    {
      "level": 2,
      "title": "Changes",
      "slug": "changes",
      "children": [
        {
          "level": 3,
          "title": "Auto-Compatibility Mode",
          "slug": "auto-compatibility-mode",
          "children": []
        },
        {
          "level": 3,
          "title": "Using Auto-Compatibility Mode",
          "slug": "using-auto-compatibility-mode",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Documentation",
      "slug": "documentation",
      "children": []
    },
    {
      "level": 2,
      "title": "Providing Feedback",
      "slug": "providing-feedback",
      "children": []
    }
  ],
  "filePathRelative": "resources/release-notes/tcp-client-5-0-11.md",
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
