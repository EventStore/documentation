import type {NavbarConfig} from "@vuepress/theme-default";
import {instance as ver} from "../lib/versioning";

export const en: NavbarConfig = [
    {
        text: "Getting started",
        link: "/latest.html"
    },
    {
        text: "Server",
        children: ver.linksFor("server", "introduction/")
    },
    {
        text: "Clients & APIs",
        children: [
            {text: "gRPC", link: "/clients/grpc/"},
            {text: "TCP", children: ver.linksFor("dotnet-client")},
            {text: "HTTP", children: ver.linksFor("http-api", "introduction/")},
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
