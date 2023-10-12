import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "public",
  lang: "en-US",
  // title: "Event Store",
  // description: "The stream database built for Event Sourcing",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
