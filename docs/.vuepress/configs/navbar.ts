import {instance as ver} from "../lib/versioning";
import type {NavbarOptions} from "@vuepress/theme-default";

export const en: NavbarOptions = [
    {
        text: "Getting started",
        link: "/getting-started.html"
    },
    {
        text: "Server",
        children: ver.linksFor("server")
    },
    {text: "Connectors", link: "/connectors/"},
    {
        text: "Clients & APIs",
        children: [
            {text: "Clients", children: [{text: "EventStoreDB clients", link: "/clients/grpc/"}]},
            {text: "HTTP API", children: ver.linksFor("http-api")},
            {text: "Deprecated", children: [{text: "Legacy TCP clients", link: "/clients/tcp/"}]},
        ]
    },
    {text: "Cloud", link: "/cloud/intro/"},
    {
        text: "Need help?",
        children: [
            {text: "Community forum", link: "https://discuss.eventstore.com"},
            {text: "Articles", link: "https://eventstore.com/blog/articles/"},
            {text: "Webinars", link: "https://eventstore.com/webinars/"},
            {text: "Release notes", link: "https://eventstore.com/blog/release-notes/"},
        ]
    },
    // {text: 'Resources', link: '/resources/'},
    // {text: "Profile", link: "/profile/"}
];
