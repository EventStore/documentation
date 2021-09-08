export const data = {
  "key": "v-78b2fcd3",
  "path": "/cloud/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "heroText": "Event Store Cloud",
    "heroImage": "/cloud.png",
    "tagline": "Fully managed EventStoreDB in the cloud",
    "actions": [
      {
        "text": "Get started →",
        "link": "/cloud/intro/"
      }
    ],
    "features": [
      {
        "title": "Managed EventStoreDB",
        "details": "Provision EventStoreDB clusters on demand and connect clusters to your chosen cloud infrastructure provider. Other features include automated vertical scaling, disk resizing, cluster version upgrades, and cluster health management."
      },
      {
        "title": "Multi-cloud",
        "details": "Provision fully-managed EventStoreDB clusters in Amazon Web Services, Google Cloud Platform and Microsoft Azure."
      },
      {
        "title": "Automation",
        "details": "Event Store Cloud provides a first class API for automation. A Terraform provider is currently provided, and Pulumi provider is on the way."
      }
    ],
    "footer": "Copyright © 2020 EventStoreDB Limited"
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "cloud/README.md",
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
