import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/how-i-work"];
  const studies = getProjects()
    .filter((p) => p.hasCaseStudy)
    .map((p) => `/work/${p.slug}`);
  return [...pages, ...studies].map((path) => ({ url: `${site.url}${path}` }));
}
