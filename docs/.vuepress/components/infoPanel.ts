import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

import { DropTransition } from "vuepress-theme-hope/components/transitions/index";
import BloggerInfo from "vuepress-theme-hope/modules/blog/components/BloggerInfo";
import InfoList from "./blogInfos";

import "vuepress-theme-hope/modules/blog/styles/info-panel.scss";

const InfoPanel: FunctionalComponent = (): VNode =>
  //h("aside", { class: "vp-blog-info-wrapper" }, [
    //h(DropTransition, () => h(BloggerInfo)),
    h(DropTransition, { delay: 0.04 }, () => h(InfoList));
  //]);

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;