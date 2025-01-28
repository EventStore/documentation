import type { RedirectOptions } from "@vuepress/plugin-redirect";
import { instance as ver } from "../../lib/versioning";

export const redirect: RedirectOptions = {
  config(app) {
    const latest = `/${ver.latest}`;
    const regex = new RegExp(`^${latest}`);
    const redirects = Object.fromEntries(
        app.pages
          .filter(({ path }) => path.startsWith(latest))
          .map(({ path }) => [path.replace(regex, "/server/latest"), path])
      );
    return redirects;
  },
};
