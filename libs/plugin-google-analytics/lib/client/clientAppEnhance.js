import { defineClientAppEnhance } from '@vuepress/client';
import { useGoogleAnalytics } from './composables';
const id = __GA_ID__;
export default defineClientAppEnhance(() => {
    if (__VUEPRESS_SSR__)
        return;
    useGoogleAnalytics(id);
});
