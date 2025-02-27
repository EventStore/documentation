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
            {text: "Deprecated", children: ver.linksFor("server", true)},
            {text: "Kubernetes Operator", children: ver.linksFor("kubernetes-operator", false)},
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
        text: "Tutorials & Guides",
        link: "/resources/README.md",
        icon: "hugeicons:mentoring",
        // children:[
        //     {
        //         text: "Tutorials",
        //         link: "/resources/tutorials",
        //         icon:"hugeicons:mentoring"
        //     },
        //     {
        //         text: "Guides",
        //         link: "/resources/guides",
        //         icon:"hugeicons:mentoring"
        //     }
        // ]
    },
    {
        text: "Resources",
        icon: "material-symbols:support",
        children: [
            {text: "Community forum", link: "https://discuss.kurrent.io/"},
            {text: "Community Discord ", link: "https://discord.gg/Phn9pmCw3t"},
            {text: "Blogs", link: "https://www.kurrent.io/blog"},
            {text: "Webinars", link: "https://www.kurrent.io/webinars"},
            {text: "Kurrent Academy", link: "https://academy.kurrent.io"}
        ]
    }
];
