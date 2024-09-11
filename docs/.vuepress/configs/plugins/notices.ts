import {NoticePluginOptions} from '@vuepress/plugin-notice';

export const notices: NoticePluginOptions = {
    config: [
        {
            path: "/clients/tcp/dotnet/21.2/",
            title: "This documentation is for the legacy TCP client",
            content: "This client is no longer supported because newer versions of EventStoreDB only support gRPC-based client protocol. Please use the latest client libraries.",
            confirm: true,
            actions: [
                {
                    text: "Migration guide",
                    link: "/clients/tcp/dotnet/21.2/migration-to-gRPC.html"
                }
            ]
        },
        {
            path: "/server/v5/",
            title: "This documentation is for the unsupported EventStoreDB version",
            content: "EventStoreDB v5 and below are out of support. Please migrate to the latest server version.",
            confirm: true,
            actions: [
                {
                    text: "View latest server documentation",
                    link: "/latest.html"
                }
            ]
        },
        {
            path: "/server/v23.10/",
            title: "EventStoreDB v23.10",
            content: "You are reading the documentation for EventStoreDB v23.10 LTS.",
            confirm: true,
            // actions: [
            //     {
            //         text: "View latest server documentation",
            //         link: "/latest.html"
            //     }
            // ]
        },
        {
            path: "/server/v22.10/",
            title: "EventStoreDB v22.10",
            content: "EventStoreDB v22.10 is reaching its end of life. Please migrate to the latest server version.",
            confirm: true,
            actions: [
                {
                    text: "View latest server documentation",
                    link: "/latest.html"
                }
            ]
        }
    ]
}