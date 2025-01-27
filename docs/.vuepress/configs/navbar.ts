import {instance as ver} from "../lib/versioning";
import type {NavbarOptions} from "vuepress-theme-hope";

export const navbarEn: NavbarOptions = [
    {
        text: "Getting Started",
        link: "/getting-started/quickstart/",
        icon: "hugeicons:start-up-02"
    },
    {
        text: "Server",
        icon: "ion:server-outline",
        children: [
            {text: "Current", children: ver.linksFor("server", false)},
            {text: "Deprecated", children: ver.linksFor("server", true)}
        ]
    },
    {
        text: "Clients & APIs",
        icon: "material-symbols:sdk",
        children: [
            {text: "Clients", children: [{text: "EventStoreDB clients", link: "/clients/grpc/getting-started"}]},
            {text: "HTTP API", children: ver.linksFor("http-api", false)},
            {text: "Deprecated", children: [{text: "Legacy TCP clients", link: "/clients/tcp/"}]},
        ]
    },
    {
        text: "Cloud",
        link: "/cloud/introduction",
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
            {text: "Event Store Academy", link: "https://academy.eventstore.com"}
        ]
    }
];
