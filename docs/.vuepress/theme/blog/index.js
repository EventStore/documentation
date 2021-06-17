export function resolveSidebarItems(groupTitle, tags, pluralize) {
    let items = [];

    for (let key in tags._metaMap) {
        let item = tags._metaMap[key];
        let children = [];
        for (let i = 0; i < item.pages.length; i++) {
            const page = item.pages[i];
            children.push({
                type: "page",
                title: page.title,
                path: page.path
            });
        }
        items.push({
            type: "group",
            title: capitalizeFirstLetter(item.key) + (pluralize ? "s" : ""),
            collapsable: true,
            path: item.path,
            children: children
        });
    }
    return items;
}

export function capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}
