const fs = require('fs');

const TRANSCLUDE_WITH = 'TRANSCLUDE_WITH';
const TRANSCLUDE_LINE = 'TRANSCLUDE_LINE';
const TRANSCLUDE_TAG = 'TRANSCLUDE_TAG';
const TRANSCLUDE_INNER = 'TRANSCLUDE_INNER';

module.exports = function (md, options) {
    const _root = options && options.root ? options.root : process.cwd();

    const fileExists = f => {
        return fs.existsSync(f);
    }

    const readFileSync = f => {
        return fileExists(f) ? fs.readFileSync(f).toString() : `Not Found: ${f}`;
    }

    const parseOptions = opts => {
        const _t = {};
        opts.trim().split(' ').forEach(pair => {
            const [opt, value] = pair.split('=');
            _t[opt] = value;
        });
        return _t;
    }

    const dataFactory = (state, pos, max) => {
        const start = pos + 6;
        const end = state.skipSpacesBack(max, pos) - 1;
        const [opts, fullpathWithAtSym] = state.src.slice(start, end).trim().split('](');
        const fullpath = fullpathWithAtSym.replace(/^@/, _root).trim();
        const pathParts = fullpath.split('/');
        const fileParts = pathParts[pathParts.length - 1].split('.');

        return {
            file: {
                resolve: fullpath,
                path: pathParts.slice(0, pathParts.length - 1).join('/'),
                name: fileParts.slice(0, fileParts.length - 1).join('.'),
                ext: fileParts[fileParts.length - 1]
            },
            options: parseOptions(opts),
            content: readFileSync(fullpath),
            fileExists: fileExists(fullpath)
        };
    }

    const optionsMap = ({options}) => ({
        hasHighlight: options.highlight || false,
        hasTransclusion: options.transclude || options.transcludeWith || options.transcludeTag || options.transcludeInner || false,
        get transclusionType() {
            if (options.transcludeWith) return TRANSCLUDE_WITH;
            if (options.transcludeTag) return TRANSCLUDE_TAG;
            if (options.transcludeInner) return TRANSCLUDE_INNER;
            if (options.transclude) return TRANSCLUDE_LINE;
        },
        get meta() {
            return this.hasHighlight ? options.highlight : '';
        }
    })

    const contentTransclusion = ({content, options}, transcludeType) => {
        const lines = content.split('\n');
        let _content = '';

        let spaces = 0;
        let firstLine = true;
        switch (transcludeType) {
            case TRANSCLUDE_LINE:
                const [tStart, tEnd] = options.transclude.replace(/[^\d|-]/g, '').split('-');

                for (let i = tStart; i <= lines.length && i <= tEnd; i++) {
                    const line = lines[i - 1];
                    if (firstLine) {
                        spaces = line.search(/\S/);
                        firstLine = false;
                    }
                    _content += (line.length >= spaces ? line.substr(spaces) : line) + '\n';
                }
                break;
            case TRANSCLUDE_INNER:
                const innerTags = options.transcludeInner.split(',');

                for (let j = 0; j < innerTags.length; j++) {
                    const innerTag = innerTags[j];
                    const innerStart = `<${innerTag}>`;
                    const innerEnd = `</${innerTag}>`;
                    let inside = false;
                    firstLine = true;

                    if (_content !== "") content += "\n";

                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];

                        if (line.includes(innerStart)) {
                            inside = true;
                            continue;
                        }

                        if (inside) {
                            if (line.replace(" ", "").includes(innerEnd)) {
                                break;
                            }

                            if (firstLine) {
                                spaces = line.search(/\S/);
                                firstLine = false;
                            }
                            _content += line.substr(spaces) + '\n';
                        }
                    }
                }
                break;
            case TRANSCLUDE_TAG:
                const t = options.transcludeTag;
                const tag = new RegExp(`${t}>$|^<${t}`);
                let matched = false;

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    if (matched && tag.test(line)) {
                        _content += line + '\n';
                        break;
                    } else if (matched) {
                        _content += line + '\n';
                    } else if (tag.test(line)) {
                        _content += line + '\n';
                        matched = true;
                    }
                }
                break;
            case TRANSCLUDE_WITH:
                const regExp = new RegExp(options.transcludeWith);
                let expressionMatched = false;

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    if (regExp.test(line)) {
                        expressionMatched = !expressionMatched;
                        continue;
                    }

                    if (expressionMatched) {
                        _content += line + '\n';
                    }
                }
                break;
        }

        return _content === '' ? 'No lines matched.' : _content;
    }

    function parser(state, startLine, endLine, silent) {
        // console.log(JSON.stringify(Object.keys(state)));

        const matcher = [64, 91, 99, 111, 100, 101];
        const pos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];

        if (state.sCount[startLine] - state.blkIndent >= 4) {
            return false;
        }

        for (let i = 0; i < 6; ++i) {
            const ch = state.src.charCodeAt(pos + i);
            if (ch !== matcher[i] || pos + i >= max) return false;
        }

        if (silent) return true;

        // handle code snippet include
        const d = dataFactory(state, pos, max);
        const opts = optionsMap(d);

        const token = state.push('fence', 'code', 0);
        token.info = (d.options.lang || d.file.ext) + opts.meta;
        token.content = d.fileExists && opts.hasTransclusion ? contentTransclusion(d, opts.transclusionType) : d.content;
        token.markup = '```';
        token.map = [startLine, startLine + 1];

        state.line = startLine + 1;
        return true;
    }

    md.block.ruler.before('fence', 'snippet', parser)
}
