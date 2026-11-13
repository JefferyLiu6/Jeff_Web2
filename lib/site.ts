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

  // Leave any of these empty to hide it on the site.
  email: "jefferyliu6@gmail.com",
  resumeHref: "/Jeffery-Liu-Resume.pdf", // the file lives in /public
  portraitSrc: "", // put portrait.jpg in /public, then set this to "/portrait.jpg"
  available: "Immediately",

  linkedin: "https://www.linkedin.com/in/jeffery-liu-ch/",
  github: "https://github.com/JefferyLiu6",

  headline: { before: "I build AI agents you can ", emphasis: "trust", after: " to act." },
  intro:
    "I'm Jeffery, an AI engineer in Toronto. I design assistants that can take real actions, like changing a calendar, and I build the checks that make that safe.",
  introMore:
    "Before this I did machine-learning research in medical imaging, which taught me to distrust a result until I know exactly how it was measured. I bring that habit to every agent I build.",

  facts: [
    { label: "Looking for", value: "Early-career AI agent and LLM engineering roles (new grad to 2 years)" },
    { label: "Based in", value: "Toronto. Authorized to work in Canada." },
    { label: "Education", value: "MEng, University of Toronto, GPA 3.97/4.0" },
    { label: "Research", value: "Two IEEE conference papers" },
    { label: "Works with", value: "Python, TypeScript, LangGraph, LangChain, FastAPI, PostgreSQL, PyTorch" },
  ],

  quote: {
    text: "An assistant that says “done” and changes nothing is worse than one that fails out loud.",
    note: "So my tests check what was actually saved, not what the assistant said.",
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
    {
      when: "Mar 2026 – now",
      role: "Independent AI agent projects",
      where: "Self-directed, Toronto. Part-time until April 2026, full-time since May.",
      did: "Started as side projects during the research role below. Designed, built and deployed Kairo and LinguaFlow end to end, and fine-tuned an open model for structured output.",
      current: true,
    },
    {
      when: "Nov 2025 – Apr 2026",
      role: "AI/ML Research Engineer, Quantitative Finance",
      where: "Unpaid research collaboration for an outside sponsor. Team of four, Toronto.",
      did: "Built an arbitrage detection API and rewrote its search in C++, about 25 times faster in benchmarks. Built the evaluation pipeline for an option-pricing study.",
    },
    {
      when: "Feb 2024 – Aug 2024",
      role: "Research Assistant, Machine Learning Engineering",
      where: "The Hong Kong Polytechnic University",
      did: "Built the deep-learning pipeline for 1,703 MRI scans and 18 regional brain-age models. Co-authored two IEEE papers.",
    },
    {
      when: "Jul 2023 – Aug 2023",
      role: "Machine Learning Research Intern",
      where: "National Taipei University",
      did: "Ran and monitored model training for an eight-person team building assistive speech technology with a hospital partner.",
    },
    {
      when: "Jun 2023 – Jul 2023",
      role: "Software Engineering Intern, Data Systems",
      where: "The Hong Kong Polytechnic University",
      did: "Built eye-tracking data software used across 5+ studies, cutting manual preparation from about 10 minutes to 2 per session.",
    },
    {
      when: "Jul 2022 – Sep 2022",
      role: "Mitacs Globalink Research Intern",
      where: "École de technologie supérieure, Montréal",
      did: "Designed and tested wireless power transfer prototypes.",
    },
  ],

  education: [
    {
      school: "University of Toronto, 2024 – 2025.",
      detail: "MEng, Mechanical & Industrial Engineering, emphasis in Data Analytics & Machine Learning. GPA 3.97/4.0.",
    },
    { school: "Hong Kong Polytechnic University, 2019 – 2024.", detail: "BEng, Electrical Engineering." },
  ],

  publications: [
    { title: "Predicting Intelligence Profile and Brain Age with Single- and Dual-Channel CNNs.", venue: "IEEE ISBI 2025, second author.", doi: "https://doi.org/10.1109/ISBI60581.2025.10981090" },
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
