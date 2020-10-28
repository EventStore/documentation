module.exports = function(name, tag, attr) {
    return [
        "vuepress-plugin-container",
        {
            type: name,
            before: x => `<${tag}${attr ? " " + attr(x) : ""}>`,
            after: `</${tag}>`,
        },
    ];
}
