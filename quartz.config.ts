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
    baseUrl: "quartz.jzhao.xyz",
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
          light: "#fbf1c7",        // gruvbox light bg
          lightgray: "#ebdbb2",    // gruvbox light bg1
          gray: "#a89984",         // gruvbox light gray
          darkgray: "#504945",     // gruvbox light fg4
          dark: "#3c3836",         // gruvbox light fg
          secondary: "#af3a03",    // gruvbox orange
          tertiary: "#79740e",     // gruvbox yellow-green
          highlight: "rgba(215, 153, 33, 0.15)",
          textHighlight: "#d7991288",
        },
        darkMode: {
          light: "#282828",        // gruvbox dark bg
          lightgray: "#3c3836",    // gruvbox dark bg1
          gray: "#665c54",         // gruvbox dark bg4
          darkgray: "#bdae93",     // gruvbox dark fg3
          dark: "#ebdbb2",         // gruvbox dark fg
          secondary: "#fe8019",    // gruvbox orange
          tertiary: "#b8bb26",     // gruvbox green
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
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
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
      // CustomOgImages disabled — emoji in headings causes build failure
      // Plugin.CustomOgImages(),
    ],
  },
}
export default config
