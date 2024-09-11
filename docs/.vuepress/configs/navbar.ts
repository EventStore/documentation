import {instance as ver} from "../lib/versioning";
import type {NavbarOptions} from "vuepress-theme-hope";

export const navbarEn: NavbarOptions = [
    {
        text: "Getting started",
        link: "/getting-started.html",
        icon: "hugeicons:start-up-02",
    },
    {
        text: "Server",
        icon: "ion:server-outline",
        children: ver.linksFor("server")
    },
    {
        text: "Connectors",
        link: "/connectors/",
        icon: "carbon:iot-connect"
    },
    {
        text: "Clients & APIs",
        icon: "material-symbols:sdk",
        children: [
            {text: "Clients", children: [{text: "EventStoreDB clients", link: "/clients/grpc/"}]},
            {text: "HTTP API", children: ver.linksFor("http-api")},
            {text: "Deprecated", children: [{text: "Legacy TCP clients", link: "/clients/tcp/"}]},
        ]
    },
    {
        text: "Cloud",
        link: "/cloud/",
        icon: "hugeicons:cloud"
    },
    {
        text: "Need help?",
        icon: "material-symbols:support",
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
