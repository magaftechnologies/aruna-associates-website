import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("page SEO metadata", () => {
  it("uses the configured site origin for canonical and social URLs", async () => {
    vi.stubEnv("VITE_SITE_URL", "https://www.example.test/");
    vi.resetModules();
    const { absoluteSiteUrl, pageSeo, socialPreviewUrl } = await import("./seo");
    const metadata = pageSeo("/loans", "Loan Solutions", "Explore loan options.");

    expect(absoluteSiteUrl("/contact")).toBe("https://www.example.test/contact");
    expect(socialPreviewUrl).toBe("https://www.example.test/social-preview.png");
    expect(metadata.links).toEqual([{ rel: "canonical", href: "https://www.example.test/loans" }]);
    expect(metadata.meta).toContainEqual({
      property: "og:url",
      content: "https://www.example.test/loans",
    });
  });

  it("does not invent canonical URLs when the site origin is not configured", async () => {
    vi.stubEnv("VITE_SITE_URL", "");
    vi.resetModules();
    const { absoluteSiteUrl, pageSeo } = await import("./seo");
    const metadata = pageSeo("/", "Aruna Associates", "Financial services in Hyderabad.");

    expect(absoluteSiteUrl("/")).toBeUndefined();
    expect(metadata.links).toEqual([]);
    expect(metadata.meta.some((entry) => "property" in entry && entry.property === "og:url")).toBe(false);
  });
});
