/**
 * Everything on the site that is about Jeffery (not about one project) lives here.
 * Leave a value as an empty string to hide it: the site never shows a dead link
 * or a placeholder.
 */
export const site = {
  name: "Jeffery Liu",
  title: "Jeffery Liu, AI agent engineer",
  description:
    "AI engineer in Toronto building LLM agents with approval controls and evaluation suites.",
  url: "https://jefferyliu.dev",

  // TODO(Jeffery): fill these in. Empty values are hidden on the site.
  email: "", // a public-facing address
  resumeHref: "", // put resume.pdf in /public, then set this to "/resume.pdf"
  portraitSrc: "", // put portrait.jpg in /public, then set this to "/portrait.jpg"
  available: "", // for example "Immediately" or "January 2027"

  linkedin: "https://www.linkedin.com/in/jeffery-liu-ch/",
  github: "https://github.com/JefferyLiu6",

  headline: { before: "I build AI agents you can ", emphasis: "trust", after: " to act." },
  intro:
    "I'm Jeffery, an AI engineer in Toronto. I design assistants that can take real actions, like changing a calendar, and I build the checks that make that safe.",
  introMore:
    "Before this I did machine-learning research in medical imaging, which taught me to distrust a result until I know exactly how it was measured. I bring that habit to every agent I build.",

  facts: [
    { label: "Looking for", value: "AI agent and LLM engineering roles" },
    { label: "Based in", value: "Toronto. Authorized to work in Canada." },
    { label: "Education", value: "MEng, University of Toronto, GPA 3.97/4.0" },
    { label: "Research", value: "Two IEEE conference papers" },
  ],

  quote: {
    text: "An assistant that says “done” and changes nothing is worse than one that fails out loud.",
    note: "So my tests check what was actually saved, not what the assistant said. One of them caught exactly this bug in Kairo.",
  },

  principles: [
    {
      title: "I limit what the model can do",
      text: "The part that reads your request has no power to act. Decisions about what may happen are made by code that can be reviewed and tested.",
    },
    {
      title: "I test outcomes, not answers",
      text: "Every fix comes with two tests: one proving the problem is gone, and one proving the normal version of the same request still works.",
    },
    {
      title: "I say what I have not proven",
      text: "Each project states how many cases were tested, whether the data was synthetic, and what remains unmeasured.",
    },
  ],

  background: [
    { when: "2026 to now", role: "Independent AI agent projects", where: "Building Kairo and LinguaFlow full-time, Toronto", current: true },
    { when: "2025 to 2026", role: "AI/ML Research Engineer, Quantitative Finance", where: "Independent four-person research collaboration, Toronto" },
    { when: "2024", role: "Research Assistant, Machine Learning Engineering", where: "The Hong Kong Polytechnic University. Medical imaging." },
    { when: "Summer 2023", role: "Machine Learning Research Intern", where: "National Taipei University. Speech technology with a hospital partner." },
    { when: "Summer 2023", role: "Software Engineering Intern, Data Systems", where: "The Hong Kong Polytechnic University. Eye-tracking research software." },
    { when: "Summer 2022", role: "Mitacs Globalink Research Intern", where: "École de technologie supérieure, Montréal" },
  ],

  education: [
    { school: "University of Toronto.", detail: "MEng, Mechanical & Industrial Engineering, emphasis in Data Analytics & Machine Learning. GPA 3.97/4.0." },
    { school: "Hong Kong Polytechnic University.", detail: "BEng, Electrical Engineering." },
  ],

  publications: [
    { title: "Predicting Intelligence Profile and Brain Age with Single- and Dual-Channel CNNs.", venue: "IEEE ISBI 2025, second author.", doi: "" },
    { title: "Regional Brain Age Measures Based on Convolutional Neural Networks.", venue: "IEEE EMBC 2025, fourth author.", doi: "https://doi.org/10.1109/EMBC58623.2025.11252950" },
  ],

  contact: {
    recruiter: {
      title: "If you’re a recruiter",
      text: "Everything you need for a first screen is in the one-page resume.",
      // Shown while resumeHref is empty, so the card never points at a missing file.
      textWithoutResume: "LinkedIn is the best way to reach me for now. My resume is available on request.",
    },
    collaborate: {
      title: "If you’d like to collaborate",
      text: "I enjoy working with people who are building or evaluating AI agents. If you have a project, a research idea or an open-source tool where I could help, I’d like to hear about it.",
    },
  },
} as const;

export const AREAS = ["AI agents", "ML engineering", "Data and risk", "Research"] as const;
