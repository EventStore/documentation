export const data = {
  "key": "v-1efec42f",
  "path": "/resources/articles/whats-the-difference-between-a-command-and-an-event.html",
  "title": "What's the difference between a command and an event?",
  "lang": "en-US",
  "frontmatter": {
    "title": "What's the difference between a command and an event?",
    "date": "2021-05-10T00:00:00.000Z",
    "author": "Oskar Dudycz",
    "kind": "Article",
    "original": "https://event-driven.io/en/whats_the_difference_between_event_and_command/",
    "summary": "The distinction between command and an event may seem apparent. However, if analysed in detail, it's not straightforward. Read more to learn the heuristics of how to use them in your project.",
    "tags": [
      "Event Sourcing"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "What's the difference between a command and an event?",
      "slug": "what-s-the-difference-between-a-command-and-an-event",
      "children": []
    },
    {
      "level": 2,
      "title": "What the event and the command have in common?",
      "slug": "what-the-event-and-the-command-have-in-common",
      "children": []
    }
  ],
  "filePathRelative": "resources/articles/whats-the-difference-between-a-command-and-an-event.md",
  "git": {
    "updatedTime": 1629468391000,
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
