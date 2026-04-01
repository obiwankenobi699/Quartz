import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🧠 Neural Vault",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,

    analytics: {
      provider: "plausible",
    },

    locale: "en-US",

    // ✅ FIXED (critical for Vercel)
    baseUrl: "/",

    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",

    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,

      typography: {
        header: "JetBrains Mono",
        body: "Inter",
        code: "JetBrains Mono",
      },

      colors: {
        lightMode: {
          light: "#fbf1c7",
          lightgray: "#ebdbb2",
          gray: "#a89984",
          darkgray: "#504945",
          dark: "#3c3836",
          secondary: "#af3a03",
          tertiary: "#79740e",
          highlight: "rgba(215, 153, 33, 0.15)",
          textHighlight: "#d7991288",
        },

        darkMode: {
          light: "#282828",
          lightgray: "#3c3836",
          gray: "#665c54",
          darkgray: "#bdae93",
          dark: "#ebdbb2",
          secondary: "#fe8019",
          tertiary: "#b8bb26",
          highlight: "rgba(254, 128, 25, 0.15)",
          textHighlight: "#d7991288",
        },
      },
    },
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),

      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),

      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "one-dark-pro",
        },
        keepBackground: true,
      }),

      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
      }),

      Plugin.GitHubFlavoredMarkdown(),

      Plugin.TableOfContents(),

      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
      }),

      Plugin.Description(),

      Plugin.Latex({
        renderEngine: "katex",
      }),
    ],

    filters: [
      Plugin.RemoveDrafts(),
    ],

    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),

      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),

      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),

      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),

      // Disabled intentionally (causes issues with emojis)
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config