import type { MetadataRoute } from "next";
import { campaign } from "@/data/campaign";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${campaign.contact.siteUrl}/sitemap.xml`,
    host: campaign.contact.siteUrl,
  };
}
