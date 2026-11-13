import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { AREAS } from "./site";

const DIR = path.join(process.cwd(), "content", "projects");

const stat = z.object({ value: z.string(), caption: z.string() });

/** The header block every project file must have. The build fails if one is wrong. */
const schema = z.object({
  title: z.string(),
  area: z.enum(AREAS),
  year: z.string(),
  /** Used for ordering, newest first. Format YYYY-MM. */
  date: z.string().regex(/^\d{4}-\d{2}$/),
  /** One plain sentence a non-engineer can follow. */
  summary: z.string(),
  /** The single result you would defend, with its conditions. */
  result: z.string(),
  code: z.string().url().optional(),
  codeLabel: z.string().optional(),
  demo: z.string().url().optional(),
  results: z.string().url().optional(),
  private: z.boolean().default(false),
  /** Languages, frameworks and models, in the words a recruiter searches for. */
  stack: z.array(z.string()).optional(),

  /** Set featured to 1, 2 or 3 to show the project on the home page. */
  featured: z.number().int().min(1).max(3).optional(),
  detail: z.string().optional(),
  stat: stat.optional(),
  steps: z.array(z.string()).length(3).optional(),
  /** A real screenshot in /public. Shown on the home page instead of the steps. */
  image: z
    .object({
      src: z.string().startsWith("/"),
      alt: z.string().min(20),
      caption: z.string().optional(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),

  /** Case study header. Only used when the file has body text. */
  kicker: z.string().optional(),
  lede: z.string().optional(),
  meta: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  stats: z.array(stat).optional(),
  statsNote: z.string().optional(),
  limits: z.array(z.string()).optional(),
  /** The system as a left-to-right chain of stages, drawn as a diagram on the case study. */
  flow: z.array(z.object({ who: z.string(), does: z.string() })).optional(),
});

export type Project = z.infer<typeof schema> & {
  slug: string;
  body: string;
  hasCaseStudy: boolean;
};

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `content/projects/${file} has an invalid header:\n${parsed.error.issues
          .map((i) => `  ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`,
      );
    }
    const body = content.trim();
    const p = parsed.data;
    if (p.image && !fs.existsSync(path.join(process.cwd(), "public", p.image.src))) {
      throw new Error(`content/projects/${file}: image ${p.image.src} is not in /public.`);
    }
    if (p.featured && !(p.detail && p.stat && (p.image || p.steps))) {
      throw new Error(`content/projects/${file} is featured, so it needs detail, stat, and an image or steps.`);
    }
    return { ...p, slug, body, hasCaseStudy: body.length > 0 };
  });
  cache = projects.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return cache;
}

export function getFeatured(): Project[] {
  return getProjects()
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
