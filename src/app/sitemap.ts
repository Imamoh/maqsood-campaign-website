import type { MetadataRoute } from "next";
import { campaign } from "@/data/campaign";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = campaign.contact.siteUrl;
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gig-workers`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/accessibility`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
