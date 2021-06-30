module.exports = options => ({
    // https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
    extendPageData($page) {
        $page.path = $page.path.replace("/generated/", "/");
    }
});
