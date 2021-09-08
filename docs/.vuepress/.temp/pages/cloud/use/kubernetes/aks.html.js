export const data = {
  "key": "v-39bc96de",
  "path": "/cloud/use/kubernetes/aks.html",
  "title": "Connect to Azure Kubernetes Services",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "AKS with Azure CNI",
      "slug": "aks-with-azure-cni",
      "children": []
    },
    {
      "level": 2,
      "title": "AKS with kubenet",
      "slug": "aks-with-kubenet",
      "children": []
    }
  ],
  "filePathRelative": "cloud/use/kubernetes/aks.md",
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
