import type {NavbarOptions} from "vuepress-theme-hope";
import {instance as ver} from "../lib/versioning";

export const navbarEn: NavbarOptions = [
    {text: "Getting Started", link: "/getting-started/introduction.html"},
    {text: "Kurrent Cloud", link: "/cloud/introduction"},
    {
        text: "KurrentDB",
        children: [
            {text: "KurrentDB Server", link: "/server/latest/"},
            {text: "Kubernetes Operator", link: "/server/kubernetes-operator/"},
        ],
    },
    {
        text: "Clients & APIs",
        children: [
            {
                text: "Clients",
                children: [
                    {text: ".NET", link: "/clients/dotnet/"},
                    {text: "Python", link: "/clients/python/"},
                    {text: "Node.js", link: "/clients/node/"},
                    {text: "Java", link: "/clients/java/"},
                    {text: "Go", link: "/clients/golang/"},
                    {text: "Rust", link: "/clients/rust/"},
                ]
            },
            {
                text: "Deprecated",
                children: [{text: "Legacy TCP clients", link: "/clients/tcp/"}],
            }
        ],
    },
    {
        text: "Tooling",
        children: [
            {text: "Gaffer (Projections tooling)", link: "https://gaffer.kurrent.io"},
        ],
    },
    {
        text: "Developer Resources",
        children:
            [
                {text: "Tutorials & Use cases", link: "/dev-center/"},
                {text: "Community forum", link: "https://discuss.kurrent.io/"},
                {text: "Community Discord ", link: "https://discord.gg/Phn9pmCw3t"},
                {text: "Blogs", link: "https://www.kurrent.io/blog"},
                {text: "Webinars", link: "https://www.kurrent.io/webinars"},
                {text: "Kurrent Academy", link: "https://academy.kurrent.io"},
            ],
    }
];
