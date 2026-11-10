const configuredSiteUrl = import.meta.env["VITE_SITE_URL"]?.trim();
const siteOrigin = configuredSiteUrl ? new URL(configuredSiteUrl).origin : undefined;

export function absoluteSiteUrl(path: string) {
  return siteOrigin ? new URL(path, `${siteOrigin}/`).toString() : undefined;
}

export const socialPreviewUrl = absoluteSiteUrl("/social-preview.png") ?? "/social-preview.png";

export function pageSeo(path: string, title: string, description: string) {
  const canonicalUrl = absoluteSiteUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
  };
}
