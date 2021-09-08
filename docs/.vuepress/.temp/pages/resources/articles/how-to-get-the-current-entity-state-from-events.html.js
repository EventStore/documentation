export const data = {
  "key": "v-e3a92b54",
  "path": "/resources/articles/how-to-get-the-current-entity-state-from-events.html",
  "title": "How to get the current entity state from events?",
  "lang": "en-US",
  "frontmatter": {
    "title": "How to get the current entity state from events?",
    "date": "2021-07-15T00:00:00.000Z",
    "author": "Oskar Dudycz",
    "kind": "Article",
    "original": "https://event-driven.io/en/how_to_get_the_current_entity_state_in_event_sourcing/",
    "summary": "In Event Sourcing, the application state is stored in events. Events are the source of truth. Read more to see how to get the entity state from them.",
    "tags": [
      "Event Sourcing"
    ]
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "resources/articles/how-to-get-the-current-entity-state-from-events.md",
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
