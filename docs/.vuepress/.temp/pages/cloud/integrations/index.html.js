export const data = {
  "key": "v-1f0bde06",
  "path": "/cloud/integrations/",
  "title": "Integrations",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Integration sources",
      "slug": "integration-sources",
      "children": [
        {
          "level": 3,
          "title": "Issues",
          "slug": "issues",
          "children": []
        },
        {
          "level": 3,
          "title": "Notifications",
          "slug": "notifications",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Integration sinks",
      "slug": "integration-sinks",
      "children": [
        {
          "level": 3,
          "title": "Slack sink",
          "slug": "slack-sink",
          "children": []
        },
        {
          "level": 3,
          "title": "OpsGenie sink",
          "slug": "opsgenie-sink",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "cloud/integrations/README.md",
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
