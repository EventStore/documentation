import { useHeaders } from "@vuepress/helper/client";
import { useToggle, useWindowSize, watchImmediate } from "@vueuse/core";
import Bowser from "bowser";
import type { PropType, SlotsType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  resolveComponent,
  shallowRef,
  Teleport,
  toRef,
} from "vue";
import type { GetHeadersOptions, PageHeader } from "vuepress/client";
import {
  ClientOnly,
  RouteLink,
  usePageFrontmatter,
  useRoute,
} from "vuepress/client";
import PrintButton from "vuepress-theme-hope/modules/info/components/PrintButton";
import { useMetaLocale } from "vuepress-theme-hope/modules/info/composables/index";

import "../styles/toc.scss";

const TABLET_BREAKPOINT = 1440;

export default defineComponent({
  name: "TOC",

  props: {
    items: Array as PropType<PageHeader[]>,
    options: Object as PropType<GetHeadersOptions>,
  },

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    /* ------------------------- */
    /* TOC Original Function  */
    /* ------------------------- */
    const headerOptions = toRef(props, "options");
    const headers = useHeaders(headerOptions);
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const [isExpanded, toggleExpanded] = useToggle();
    const { width } = useWindowSize();
    const isMobile = computed(() => width.value < TABLET_BREAKPOINT);

    const toc = shallowRef<HTMLElement>();
    const tocMarkerTop = ref("-1.7rem");

    const scrollTo = (top: number): void => {
      toc.value?.scrollTo({ top, behavior: "smooth" });
    };

    const updateTocMarker = (): void => {
      if (toc.value) {
        const activeTocItem = document.querySelector(".vp-toc-item.active");
        if (activeTocItem) {
          tocMarkerTop.value = `${
            activeTocItem.getBoundingClientRect().top -
            toc.value.getBoundingClientRect().top +
            toc.value.scrollTop
          }px`;
        } else {
          tocMarkerTop.value = "-1.7rem";
        }
      }
    };

    onMounted(() => {
      // Scroll to active toc item when route hash changes
      watchImmediate(
        () => route.hash,
        (hash): void => {
          if (toc.value) {
            const activeTocItem = document.querySelector(
              `#toc a.vp-toc-link[href$="${hash}"]`
            );
            if (!activeTocItem) return;
            const { top: tocTop, height: tocHeight } =
              toc.value.getBoundingClientRect();
            const { top: activeTocItemTop, height: activeTocItemHeight } =
              activeTocItem.getBoundingClientRect();

            if (activeTocItemTop < tocTop) {
              scrollTo(toc.value.scrollTop + activeTocItemTop - tocTop);
            } else if (
              activeTocItemTop + activeTocItemHeight >
              tocTop + tocHeight
            ) {
              scrollTo(
                toc.value.scrollTop +
                  activeTocItemTop +
                  activeTocItemHeight -
                  tocTop -
                  tocHeight
              );
            }
          }
        },
        { flush: "post" }
      );

      watchImmediate(() => route.fullPath, updateTocMarker, { flush: "post" });
    });

    const renderHeader = ({ title, level, slug }: PageHeader): VNode =>
      h(
        RouteLink,
        {
          to: `#${slug}`,
          class: ["vp-toc-link", `level${level}`],
          onClick: () => toggleExpanded(),
        },
        () => title
      );

    const renderChildren = (headers: PageHeader[]): VNode | null =>
      headers.length
        ? h("ul", { class: "vp-toc-list" }, [
            ...headers.map((header) => {
              const children = renderChildren(header.children);
              return [
                h(
                  "li",
                  {
                    class: [
                      "vp-toc-item",
                      { active: route.hash === `#${header.slug}` },
                    ],
                  },
                  renderHeader(header)
                ),
                children ? h("li", children) : null,
              ];
            }),
          ])
        : null;

    /* ----------------------------- */
    /* Survey Form State & Logic  */
    /* ----------------------------- */
    const thumbsValue = ref<string | null>(null);
    const radioValue = ref<string>("");
    const freeText = ref<string>("");
    const email = ref<string>("");
    const submitted = ref(false);
    // New honeypot field for spam prevention
    const honeyPot = ref<string>("");

    // Global error message (for radio selection, etc.)
    const errorMessage = ref<string>("");

    // New email-specific error message for inline display
    const emailError = ref<string>("");

    // Determine survey options and placeholder text
    const surveyOptions = computed(() => {
      if (thumbsValue.value === "up") {
        return ["Easy to understand", "Solved my problem", "Other"];
      } else if (thumbsValue.value === "down") {
        return [
          "Hard to understand",
          "Did not solve my problem",
          "Not accurate",
          "Other",
        ];
      }
      return [];
    });

    const placeholderText = computed(() =>
      thumbsValue.value === "up"
        ? "What went well?"
        : thumbsValue.value === "down"
        ? "What can we do better?"
        : ""
    );

    const frontmatter = usePageFrontmatter();
    const enableIcon = computed(
      () =>
        frontmatter.value.breadcrumbIcon ??
        metaLocale.value.breadcrumbIcon ??
        true
    );

    // Submit function with validations
    const submitForm = async () => {
      // Clear previous error messages
      errorMessage.value = "";
      // Note: emailError is not cleared here because we want to show it until the user types again.

      // Check the honeypot field – if filled, ignore submission
      if (honeyPot.value) {
        console.warn("Spam submission detected, ignoring.");
        return;
      }

      // Validate that a radio option is selected
      if (!radioValue.value) {
        errorMessage.value = "Please select an option before submitting.";
        return;
      }

      // If an email is provided, validate it using a basic regex
      if (email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          emailError.value = "Invalid e-mail.";
          return;
        }
      }

      const browserParser = Bowser.getParser(window.navigator.userAgent);
      const browserName = browserParser.getBrowserName();
      const platformType = browserParser.getPlatformType();

      const data = {
        thumbs: thumbsValue.value,
        option: radioValue.value,
        freeText: freeText.value,
        email: email.value,
        submittedAt: new Date().toString(),
        userAgent: navigator.userAgent,
        browserName,
        platformType,
        pageUrl: window.location.href,
      };

      try {
        await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("Survey submission failed", err);
      }
      submitted.value = true;
    };

    const hoveredThumb = ref<"up" | "down" | null>(null);

    const renderThumbButton = (thumb: "up" | "down") => {
      const iconName =
        thumb === "up"
          ? "material-symbols:thumb-up"
          : "material-symbols:thumb-down";
      return h(
        "button",
        {
          onClick: () => {
            thumbsValue.value = thumb;
          },
          onMouseenter: () => {
            hoveredThumb.value = thumb;
          },
          onMouseleave: () => {
            hoveredThumb.value = null;
          },
          class: "survey-thumb-button",
        },
        [
          enableIcon.value
            ? h(resolveComponent("VPIcon"), {
                icon: iconName,
                size: "1.5rem",
                color:
                  hoveredThumb.value === thumb || thumbsValue.value === thumb
                    ? "var(--theme-color)"
                    : "var(--vp-c-text-mute)",
              })
            : null,
        ]
      );
    };

    // Render the survey form
    const renderSurveyForm = (): VNode => {
      if (submitted.value) {
        return h(
          "div",
          { class: "survey-thank-you" },
          "Thank you for helping improve Kurrent's documentation! ✅"
        );
      }

      return h("div", { class: "survey-form" }, [
        h("p", { class: "survey-question" }, "Was this helpful?"),
        h("div", { class: "survey-thumbs" }, [
          renderThumbButton("up"),
          renderThumbButton("down"),
        ]),
        thumbsValue.value
          ? h("div", { class: "survey-details" }, [
              // Global error message for other validations
              errorMessage.value
                ? h(
                    "div",
                    {
                      class: "survey-error",
                      style: { color: "red", marginBottom: "0.5rem" },
                    },
                    errorMessage.value
                  )
                : null,
              // --- Honey-pot field (hidden) ---
              h("input", {
                type: "text",
                value: honeyPot.value,
                onInput: (e: Event) => {
                  honeyPot.value = (e.target as HTMLInputElement).value;
                },
                style: { display: "none" },
                tabindex: -1,
                autocomplete: "off",
              }),
              // Radio options
              ...surveyOptions.value.map((option) =>
                h("label", { class: "survey-option-label" }, [
                  h("input", {
                    type: "radio",
                    name: "survey-option",
                    value: option,
                    checked: radioValue.value === option,
                    onChange: (e: Event) => {
                      radioValue.value = (e.target as HTMLInputElement).value;
                    },
                    required: true,
                  }),
                  " " + option,
                ])
              ),
              h("textarea", {
                placeholder: placeholderText.value,
                value: freeText.value,
                onInput: (e: Event) => {
                  freeText.value = (e.target as HTMLTextAreaElement).value;
                },
                class: "survey-textarea",
              }),
              // Email field with inline error message for invalid email
              h("label", { class: "survey-email-label" }, [
                "Leave your email if you wish to be contacted (Optional)",
                h("input", {
                  type: "email",
                  placeholder: "you@email.com",
                  value: email.value,
                  onInput: (e: Event) => {
                    email.value = (e.target as HTMLInputElement).value;
                    // Clear the email error when the user starts typing
                    if (emailError.value) emailError.value = "";
                  },
                  class: "survey-email",
                }),
                emailError.value
                  ? h(
                      "div",
                      {
                        class: "survey-email-error",
                        style: { color: "red", marginTop: "0.25rem" },
                      },
                      emailError.value
                    )
                  : null,
              ]),
              h(
                "button",
                {
                  onClick: submitForm,
                  class: "survey-submit-button",
                  disabled: !radioValue.value,
                },
                "Submit"
              ),
            ])
          : null,
      ]);
    };

    /* ----------------------------- */
    /*    Final Render               */
    /* ----------------------------- */
    return () => {
      const tocHeaders = props.items?.length
        ? renderChildren(props.items)
        : renderChildren(headers.value);
      const before = slots.before?.();
      const after = slots.after?.();

      const tocContent =
        tocHeaders || before || after
          ? h("div", { class: "vp-toc-placeholder" }, [
              h("aside", { id: "toc", "vp-toc": "" }, [
                // Optional "before" slot
                before,
                // The TOC itself
                tocHeaders
                  ? [
                      h(
                        "div",
                        { class: "vp-toc-header", onClick: toggleExpanded },
                        [
                          metaLocale.value.toc,
                          h(PrintButton),
                          h("div", {
                            class: ["arrow", isExpanded.value ? "down" : "end"],
                          }),
                        ]
                      ),
                      h(
                        "div",
                        {
                          class: [
                            "vp-toc-wrapper",
                            isExpanded.value ? "open" : "",
                          ],
                          ref: toc,
                        },
                        [
                          tocHeaders,
                          h("div", {
                            class: "vp-toc-marker",
                            style: { top: tocMarkerTop.value },
                          }),
                        ]
                      ),
                    ]
                  : null,
                // Optional "after" slot
                after,
                // On desktop: render survey form inside the TOC container
                !isMobile.value
                  ? h("div", { class: "toc-survey-section" }, [
                      renderSurveyForm(),
                    ])
                  : null,
              ]),
            ])
          : null;

      return h(ClientOnly, () =>
        h("div", {}, [
          tocContent,
          // On mobile: teleport the survey form to the element with class "theme-hope-content"
          isMobile.value
            ? h(Teleport, { to: ".theme-hope-content" }, [renderSurveyForm()])
            : null,
        ])
      );
    };
  },
});
