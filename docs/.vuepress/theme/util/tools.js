/**
 * @param {VNode[]} [vNodes]
 * @param {string} [find]
 * @param {string} [replace]
 */
export function replaceVNode(vNodes, find, replace) {
    vNodes.forEach(x => {
        if (typeof x.text == "string" && x.text.includes(find)) {
            x.text = x.text.replaceAll(find, replace);
        }
        if (x.children) {
            replaceVNode(x.children, find, replace);
        }
    });
}
