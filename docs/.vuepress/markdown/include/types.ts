export interface IncludePluginOptions {
    root: string;
    getRootDir?: (options: IncludePluginOptions) => string;
    includeRe: RegExp;
    throwError: boolean;
    bracesAreOptional: boolean;
    notFoundMessage: string;
    circularMessage: string;
}
