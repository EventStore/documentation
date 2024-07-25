import type {NavItemOptions, SidebarLinkOptions} from "@vuepress/theme-default";

export interface EsSidebarGroupOptions extends NavItemOptions{
    group?: string;
    collapsible?: boolean;
    title?: string;
    version?: string;
    children: EsSidebarItemOptions[] | string[];
}

export type EsSidebarItemOptions = SidebarLinkOptions | EsSidebarGroupOptions | string;
export type EsSidebarArrayOptions = EsSidebarItemOptions[];
export type EsSidebarObjectOptions = Record<string, EsSidebarArrayOptions>;
export type EsSidebarOptions = EsSidebarArrayOptions | EsSidebarObjectOptions;

export type ImportedSidebarArrayOptions = EsSidebarGroupOptions[];