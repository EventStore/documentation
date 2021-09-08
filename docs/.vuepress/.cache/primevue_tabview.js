import {
  DomHandler
} from "./chunk-RNMZ2YWA.js";
import {
  Fragment,
  createBlock,
  createCommentVNode,
  createVNode,
  openBlock,
  renderList,
  resolveDirective,
  resolveDynamicComponent,
  vShow,
  withDirectives
} from "./chunk-IUXSF24O.js";
import {
  toDisplayString
} from "./chunk-ZUVI2KYV.js";
import {
  init_define_MZ_ZOOM_OPTIONS,
  init_define_VERSIONS
} from "./chunk-ROTBIGRN.js";

// dep:primevue_tabview
init_define_MZ_ZOOM_OPTIONS();
init_define_VERSIONS();

// node_modules/primevue/tabview/tabview.esm.js
init_define_MZ_ZOOM_OPTIONS();
init_define_VERSIONS();

// node_modules/primevue/ripple/ripple.esm.js
init_define_MZ_ZOOM_OPTIONS();
init_define_VERSIONS();
function bindEvents(el) {
  el.addEventListener("mousedown", onMouseDown);
}
function unbindEvents(el) {
  el.removeEventListener("mousedown", onMouseDown);
}
function create(el) {
  let ink = document.createElement("span");
  ink.className = "p-ink";
  el.appendChild(ink);
  ink.addEventListener("animationend", onAnimationEnd);
}
function remove(el) {
  let ink = getInk(el);
  if (ink) {
    unbindEvents(el);
    ink.removeEventListener("animationend", onAnimationEnd);
    ink.remove();
  }
}
function onMouseDown(event) {
  let target = event.currentTarget;
  let ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === "none") {
    return;
  }
  DomHandler.removeClass(ink, "p-ink-active");
  if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
    let d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
    ink.style.height = d + "px";
    ink.style.width = d + "px";
  }
  let offset = DomHandler.getOffset(target);
  let x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
  let y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
  ink.style.top = y + "px";
  ink.style.left = x + "px";
  DomHandler.addClass(ink, "p-ink-active");
}
function onAnimationEnd(event) {
  DomHandler.removeClass(event.currentTarget, "p-ink-active");
}
function getInk(el) {
  for (let i = 0; i < el.children.length; i++) {
    if (typeof el.children[i].className === "string" && el.children[i].className.indexOf("p-ink") !== -1) {
      return el.children[i];
    }
  }
  return null;
}
var Ripple = {
  mounted(el, binding) {
    if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
      create(el);
      bindEvents(el);
    }
  },
  unmounted(el) {
    remove(el);
  }
};
var ripple_esm_default = Ripple;

// node_modules/primevue/tabview/tabview.esm.js
var script = {
  name: "TabView",
  emits: ["update:activeIndex", "tab-change", "tab-click"],
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  updated() {
    this.updateInkBar();
  },
  mounted() {
    this.updateInkBar();
  },
  methods: {
    onTabClick(event, i) {
      if (!this.isTabDisabled(this.tabs[i]) && i !== this.d_activeIndex) {
        this.d_activeIndex = i;
        this.$emit("update:activeIndex", this.d_activeIndex);
        this.$emit("tab-change", {
          originalEvent: event,
          index: i
        });
      }
      this.$emit("tab-click", {
        originalEvent: event,
        index: i
      });
    },
    onTabKeydown(event, i) {
      if (event.which === 13) {
        this.onTabClick(event, i);
      }
    },
    updateInkBar() {
      let tabHeader = this.$refs.nav.children[this.d_activeIndex];
      this.$refs.inkbar.style.width = DomHandler.getWidth(tabHeader) + "px";
      this.$refs.inkbar.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.$refs.nav).left + "px";
    },
    getKey(tab, i) {
      return tab.props && tab.props.header ? tab.props.header : i;
    },
    isTabDisabled(tab) {
      return tab.props && tab.props.disabled;
    },
    isTabPanel(child) {
      return child.type.name === "TabPanel";
    }
  },
  computed: {
    tabs() {
      const tabs = [];
      this.$slots.default().forEach((child) => {
        if (this.isTabPanel(child)) {
          tabs.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach((nestedChild) => {
            if (this.isTabPanel(nestedChild)) {
              tabs.push(nestedChild);
            }
          });
        }
      });
      return tabs;
    }
  },
  directives: {
    "ripple": ripple_esm_default
  }
};
var _hoisted_1 = { class: "p-tabview p-component" };
var _hoisted_2 = {
  ref: "nav",
  class: "p-tabview-nav",
  role: "tablist"
};
var _hoisted_3 = {
  key: 0,
  class: "p-tabview-title"
};
var _hoisted_4 = {
  ref: "inkbar",
  class: "p-tabview-ink-bar"
};
var _hoisted_5 = { class: "p-tabview-panels" };
var _hoisted_6 = {
  key: 0,
  class: "p-tabview-panel",
  role: "tabpanel"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createBlock("div", _hoisted_1, [
    createVNode("ul", _hoisted_2, [
      (openBlock(true), createBlock(Fragment, null, renderList($options.tabs, (tab, i) => {
        return openBlock(), createBlock("li", {
          role: "presentation",
          key: $options.getKey(tab, i),
          class: [{ "p-highlight": $data.d_activeIndex === i, "p-disabled": $options.isTabDisabled(tab) }]
        }, [
          withDirectives(createVNode("a", {
            role: "tab",
            class: "p-tabview-nav-link",
            onClick: ($event) => $options.onTabClick($event, i),
            onKeydown: ($event) => $options.onTabKeydown($event, i),
            tabindex: $options.isTabDisabled(tab) ? null : "0",
            "aria-selected": $data.d_activeIndex === i
          }, [
            tab.props && tab.props.header ? (openBlock(), createBlock("span", _hoisted_3, toDisplayString(tab.props.header), 1)) : createCommentVNode("", true),
            tab.children && tab.children.header ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.header), { key: 1 })) : createCommentVNode("", true)
          ], 40, ["onClick", "onKeydown", "tabindex", "aria-selected"]), [
            [_directive_ripple]
          ])
        ], 2);
      }), 128)),
      createVNode("li", _hoisted_4, null, 512)
    ], 512),
    createVNode("div", _hoisted_5, [
      (openBlock(true), createBlock(Fragment, null, renderList($options.tabs, (tab, i) => {
        return openBlock(), createBlock(Fragment, {
          key: $options.getKey(tab, i)
        }, [
          ($props.lazy ? $data.d_activeIndex === i : true) ? withDirectives((openBlock(), createBlock("div", _hoisted_6, [
            (openBlock(), createBlock(resolveDynamicComponent(tab)))
          ], 512)), [
            [vShow, $props.lazy ? true : $data.d_activeIndex === i]
          ]) : createCommentVNode("", true)
        ], 64);
      }), 128))
    ])
  ]);
}
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = "\n.p-tabview-nav {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.p-tabview-nav-link {\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    text-decoration: none;\n    overflow: hidden;\n}\n.p-tabview-ink-bar {\n    display: none;\n    z-index: 1;\n}\n.p-tabview-nav-link:focus {\n    z-index: 1;\n}\n.p-tabview-title {\n    line-height: 1;\n}\n";
styleInject(css_248z);
script.render = render;
var tabview_esm_default = script;

// dep:primevue_tabview
var primevue_tabview_default = tabview_esm_default;
export {
  primevue_tabview_default as default
};
//# sourceMappingURL=primevue_tabview.js.map
