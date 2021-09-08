export const data = {
  "key": "v-8aad724a",
  "path": "/cloud/use/",
  "title": "Using Event Store Cloud",
  "lang": "en-US",
  "frontmatter": {
    "title": "Using Event Store Cloud"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Networking",
      "slug": "networking",
      "children": [
        {
          "level": 3,
          "title": "Cloud network peering",
          "slug": "cloud-network-peering",
          "children": []
        },
        {
          "level": 3,
          "title": "TailScale",
          "slug": "tailscale",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Data migration",
      "slug": "data-migration",
      "children": []
    },
    {
      "level": 2,
      "title": "Cluster connection",
      "slug": "cluster-connection",
      "children": []
    },
    {
      "level": 2,
      "title": "Connect with Tailscale",
      "slug": "connect-with-tailscale",
      "children": [
        {
          "level": 3,
          "title": "What is Tailscale?",
          "slug": "what-is-tailscale",
          "children": []
        },
        {
          "level": 3,
          "title": "Get started",
          "slug": "get-started",
          "children": []
        },
        {
          "level": 3,
          "title": "Provision the cloud VM",
          "slug": "provision-the-cloud-vm",
          "children": []
        },
        {
          "level": 3,
          "title": "Set up Tailscale subnet routing",
          "slug": "set-up-tailscale-subnet-routing",
          "children": []
        },
        {
          "level": 3,
          "title": "Future plans",
          "slug": "future-plans",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "cloud/use/README.md",
  "git": {
    "updatedTime": 1629304953000,
    "contributors": [
      {
        "name": "Alexey Zimarev",
        "email": "alex@zimarev.com",
        "commits": 3
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
