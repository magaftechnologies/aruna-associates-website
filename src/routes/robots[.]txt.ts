import { createFileRoute } from "@tanstack/react-router";
import { absoluteSiteUrl } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const sitemapUrl =
          absoluteSiteUrl("/sitemap.xml") ?? new URL("/sitemap.xml", request.url).toString();
        const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
        return new Response(robots, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
