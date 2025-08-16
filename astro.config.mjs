// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "YeJi's Notes",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dpwl35",
        },
      ],
    }),
  ],
  site: "https://dpwl35.github.io",
});
