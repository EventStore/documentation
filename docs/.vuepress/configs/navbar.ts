import type {NavbarConfig} from "@vuepress/theme-default";
import {instance as ver} from "../lib/versioning";

export const en: NavbarConfig = [
    {
        text: "Getting started",
        link: "/getting-started.html"
    },
    {
        text: "Server",
        children: ver.linksFor("server")
    },
    {
        text: "Clients & APIs",
        children: [
            {text: "Clients", link: "/clients/grpc/"},
            {text: "HTTP API", children: ver.linksFor("http-api")},
            {text: "Deprecated Clients", link: "/clients/tcp/" },
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
