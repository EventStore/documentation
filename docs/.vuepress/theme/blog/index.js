export function resolveSidebarItems(groupTitle, tags) {
    let items = [];

    for (let key in tags._metaMap) {
        let item = tags._metaMap[key];
        items.push({
            type: 'page',
            title: capitalizeFirstLetter(item.key),
            path: item.path
        });
    }
    return [{
        type: "group",
        title: groupTitle,
        collapsable: false,
        path: "/tag/",
        children: items
    }];
}

export function capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}
