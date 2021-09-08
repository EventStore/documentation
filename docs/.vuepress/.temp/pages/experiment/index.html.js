export const data = {
  "key": "v-d5f5698e",
  "path": "/experiment/",
  "title": "Welcome",
  "lang": "en-US",
  "frontmatter": {
    "versions": [
      "20.10",
      "21.2"
    ]
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "experiment/README.md",
  "git": {
    "updatedTime": 1630069940000,
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
