export const data = {
  "key": "v-7b31590a",
  "path": "/cloud/automation/terraform.html",
  "title": "Terraform provider",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Installation",
      "slug": "installation",
      "children": [
        {
          "level": 3,
          "title": "Terraform 0.13+",
          "slug": "terraform-0-13",
          "children": []
        },
        {
          "level": 3,
          "title": "Terraform 0.12",
          "slug": "terraform-0-12",
          "children": []
        },
        {
          "level": 3,
          "title": "Building from source",
          "slug": "building-from-source",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Provider configuration",
      "slug": "provider-configuration",
      "children": [
        {
          "level": 3,
          "title": "Obtaining the access token",
          "slug": "obtaining-the-access-token",
          "children": []
        },
        {
          "level": 3,
          "title": "Obtaining the organisation ID",
          "slug": "obtaining-the-organisation-id",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Resources",
      "slug": "resources",
      "children": [
        {
          "level": 3,
          "title": "Projects",
          "slug": "projects",
          "children": []
        },
        {
          "level": 3,
          "title": "Networks",
          "slug": "networks",
          "children": []
        },
        {
          "level": 3,
          "title": "Network peerings",
          "slug": "network-peerings",
          "children": []
        },
        {
          "level": 3,
          "title": "Managed EventStoreDB",
          "slug": "managed-eventstoredb",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Data sources",
      "slug": "data-sources",
      "children": [
        {
          "level": 3,
          "title": "Project",
          "slug": "project",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "FAQ",
      "slug": "faq",
      "children": []
    }
  ],
  "filePathRelative": "cloud/automation/terraform.md",
  "git": {
    "updatedTime": 1629445718000,
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
