import {instance as ver} from "../lib/versioning";
import type {NavbarOptions} from "vuepress-theme-hope";

export const navbarEn: NavbarOptions = [
    {
        text: "Getting Started",
        link: "/getting-started/quickstart/",
        icon: "hugeicons:start-up-02"
    },
    {
        text: "Kurrent Cloud",
        link: "/cloud/introduction",
        icon: "hugeicons:cloud"
    },
    {
        text: "KurrentDB",
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
        text: "Resources",
        icon: "material-symbols:support",
        children: [
            {text: "Community forum", link: "https://discuss.eventstore.com"},
            {text: "Community Discord ", link: "https://discord.gg/Phn9pmCw3t"},
            {text: "Blogs", link: "https://eventstore.com/blog/articles/"},
            {text: "Webinars", link: "https://eventstore.com/webinars/"},
            {text: "Event Store Academy", link: "https://academy.eventstore.com"}
        ]
    }
];
