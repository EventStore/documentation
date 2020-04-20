const Token = require('markdown-it/lib/token');
const container = require('markdown-it-container');

function codeToggles(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (t.type === 'container_code_open') {
            // find the close tag
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'container_code_close') {
                    let innerTokens = tokens.slice(i + 1, j);
                    let slotNames = [];
                    let labels = {};

                    codeBlocks(innerTokens, (t, i) => {
                        let slotName;

                        // does the slot have a custom label?
                        let labelMatch = t.info.match(/([^ ]) +(.*)/);
                        if (labelMatch) {
                            // give the slot a random slot name
                            slotName = 'slot'+i;
                            labels[slotName] = labelMatch[2];

                            // remove the label from the code info
                            t.info = t.info.replace(labelMatch[0], labelMatch[1]);
                        } else {
                            // set the slot name to the language (w/out line numbers)
                            slotName = t.info.replace(/{.*}/, '').trim();
                        }

                        slotNames.push(slotName);

                        return [
                            block(`<template slot="${slotName}">`, t.level),
                            t,
                            block('</template>', t.level)
                        ]
                    });

                    let openBlock = block(`<code-toggle :languages='${JSON.stringify(slotNames)}' :labels='${JSON.stringify(labels)}'>`, tokens[i].level);
                    let closeBlock = block('</code-toggle>', tokens[j].level);
                    openBlock.nesting = tokens[i].nesting;
                    closeBlock.nesting = tokens[j].nesting;

                    let replaceTokens = [
                        openBlock,
                        ...innerTokens,
                        closeBlock
                    ];

                    tokens.splice(i, j - i, ...replaceTokens);

                    // skip ahead
                    i += (replaceTokens.length - 1);

                    break;
                }
            }
        }
    }
}

function codeBlocks(tokens, replace) {
    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];
        if (t.type === 'fence' && t.info) {
            let replaceTokens = replace(t, i);
            tokens.splice(i, 1, ...replaceTokens);

            // skip ahead
            i += (replaceTokens.length - 1);
        }
    }
}

function block(tag, level) {
    const t = new Token('html_block', '', 0);
    t.content = `${tag}\n`;
    t.block = true;
    t.level = level || 0;
    return t;
}

module.exports = (md) => {
    // override parse()
    const parse = md.parse;
    md.parse = (...args) => {
        const tokens = parse.call(md, ...args);
        // vPres(tokens);
        // tables(tokens);
        codeToggles(tokens);
        // split(tokens);
        return tokens;
    };

    md.use(container, 'code', {
        render(tokens, idx) {
            return '';
        }
    })
};
