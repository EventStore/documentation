module.exports = function (md, options) {

    let prev;

    function myToken(tokens, idx, options, env, self) {
        // console.log(JSON.stringify(env));
        console.log(JSON.stringify(tokens));
        // console.log(JSON.stringify(options));
        options.relativePath = env.relativePath;
        return prev(tokens, idx, options, env, self);
    }

    prev = md.renderer.rules.fence;
    md.renderer.rules.fence = myToken;
}
