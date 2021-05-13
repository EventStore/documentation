<template>
    <div
            class="theme-container"
            :class="pageClasses"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
    >
        <Navbar
                v-if="shouldShowNavbar"
                @toggle-sidebar="toggleSidebar"
        />

        <div
                class="sidebar-mask"
                @click="toggleSidebar(false)"
        ></div>

        <Sidebar
                :items="sidebarItems"
                @toggle-sidebar="toggleSidebar"
        >
            <template #top>
                <slot name="sidebar-top"/>
            </template>
            <template #bottom>
                <slot name="sidebar-bottom"/>
            </template>
        </Sidebar>

        <BlogPage :sidebar-items="[]">
            <template #top>
            </template>
            <template #bottom>
            </template>
        </BlogPage>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar.vue";
    import BlogPage from "../components/BlogPage.vue";
    import Sidebar from "../components/Sidebar.vue";
    import {resolveSidebarItems} from '../blog';

    export default {
        components: {BlogPage, Sidebar, Navbar},

        data() {
            return {isSidebarOpen: false}
        },

        computed: {
            shouldShowNavbar() {
                const {themeConfig} = this.$site;
                const {frontmatter} = this.$page;

                return frontmatter.navbar === false || themeConfig.navbar === false
                    ? false
                    : (
                        this.$title
                        || themeConfig.logo
                        || themeConfig.repo
                        || themeConfig.nav
                        || this.$themeLocaleConfig.nav
                    );
            },

            shouldShowSidebar() {
                return true;
            },

            sidebarItems() {
                return resolveSidebarItems(this.$themeConfig.blogSidebarGroupTitle, this.$tag)
            },

            pageClasses() {
                const userPageClass = this.$page.frontmatter.pageClass;
                return [
                    {
                        'no-navbar': !this.shouldShowNavbar,
                        'sidebar-open': this.isSidebarOpen,
                        'no-sidebar': !this.shouldShowSidebar
                    },
                    userPageClass
                ]
            }
        },

        mounted() {
            this.$router.afterEach(() => {
                this.isSidebarOpen = false
            })
        },

        methods: {
            toggleSidebar(to) {
                this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
                this.$emit('toggle-sidebar', this.isSidebarOpen)
            },

            // side swipe
            onTouchStart(e) {
                this.touchStart = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            },

            onTouchEnd(e) {
                const dx = e.changedTouches[0].clientX - this.touchStart.x;
                const dy = e.changedTouches[0].clientY - this.touchStart.y;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    this.toggleSidebar(dx > 0 && this.touchStart.x <= 80)
                }
            }
        }
    }
</script>
