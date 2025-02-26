import type {NavbarOptions} from "vuepress-theme-hope";
import {instance as ver} from "../lib/versioning";

export const navbarEn: NavbarOptions = [
    {
        text: "Kurrent Cloud",
        icon: "hugeicons:cloud",
        link: "/cloud/introduction",
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
        text: "Official Clients",
        icon: "material-symbols:sdk",
        children: [
            {text: "C#", link: "/clients/grpc/getting-started"},
            {text: "Go", link: "/clients/grpc/getting-started"},
            {text: "Haskell", link: "/clients/grpc/getting-started"},
            {text: "Java", link: "/clients/grpc/getting-started"},
            {text: "NodeJS", link: "/clients/grpc/getting-started"},
            {text: "Rust", link: "/clients/grpc/getting-started"},

        ]
    },
    {
        text: "HTTP APIs",
        icon: "material-symbols:http",
        children: [
            {text: "HTTP API", children: ver.linksFor("http-api", false)},
            {text: "Deprecated", children: [{text: "Legacy TCP clients", link: "/clients/tcp/"}]},
        ]
    },
    
];
