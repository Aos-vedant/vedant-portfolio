export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  whatItIs: string;
  whyIMadeIt: string;
  whatIExplored: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  year: string;
  status?: string;
}

export interface ExploreCategory {
  id: string;
  title: string;
  tag: string;
  description: string;
  topics: {
    name: string;
    description: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Vedant Bhanushali",
    role: "COMPUTER ENGINEERING STUDENT",
    tagline: "Computer Engineering Student · Technology Explorer · Builder",
    location: "Mumbai, India",
    status: "Exploring & Building",
    statusAvailable: true,
    email: "Vedantbhanushaliofficial@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    heroHeadline: "I like turning ideas into something real.",
    heroSubhead: "I enjoy exploring technology, experimenting with ideas, and figuring out how to make things work.",
    aboutIntro: "I'm a Computer Engineering student who enjoys exploring technology in different ways — from building small digital experiences to experimenting with new tools and ideas.",
    aboutPhilosophy: "I like learning by actually trying things, figuring out what works, and seeing where an idea can go.",
    aboutClosing: "Rather than simply reading about concepts in isolation, I enjoy the hands-on process: tinkering with code, experimenting with modern tools, and continuously learning through trial and error."
  },

  howIExplore: [
    {
      step: "01",
      title: "Explore",
      tag: "CURIOSITY",
      description: "Diving into new tools, programming paradigms, and modern frameworks with an open mind and genuine curiosity.",
      icon: "Compass"
    },
    {
      step: "02",
      title: "Experiment",
      tag: "TESTING",
      description: "Writing quick scratch code, testing edge cases, and breaking things on purpose to discover how they work.",
      icon: "FlaskConical"
    },
    {
      step: "03",
      title: "Build",
      tag: "CREATION",
      description: "Assembling functional tools and clean interfaces that solve practical questions or daily workflows.",
      icon: "Hammer"
    },
    {
      step: "04",
      title: "Learn",
      tag: "GROWTH",
      description: "Reflecting on what worked, debugging the quirks, and carrying the lessons forward into the next build.",
      icon: "BookOpen"
    }
  ],

  thingsILikeExploring: [
    {
      id: "code-web",
      title: "Code & Web",
      tag: "01 / INTERFACES",
      description: "Building responsive, tactile interfaces and exploring modern web standards.",
      topics: [
        { name: "JavaScript & TypeScript", description: "Writing clean logic, understanding async flows, and building with type safety." },
        { name: "React Ecosystem", description: "Component state architecture, hooks, and clean user interface patterns." },
        { name: "Tailwind CSS & Design Systems", description: "Responsive layouts, clean design tokens, and smooth micro-interactions." },
        { name: "HTML5 & Web APIs", description: "Semantic markup, Canvas 2D, localStorage, and browser APIs." }
      ]
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      tag: "02 / INTELLIGENCE",
      description: "Using modern AI capabilities and scripts to streamline workflows and build smarter tools.",
      topics: [
        { name: "LLM APIs & Prompting", description: "Integrating model endpoints into web applications and exploring structured outputs." },
        { name: "Workflow Automation", description: "Creating small scripts to automate repetitive digital tasks and data formatting." },
        { name: "AI-Augmented Development", description: "Using AI assistants for rapid ideation, code reviews, and learning new libraries." }
      ]
    },
    {
      id: "digital-creation",
      title: "Digital Creation",
      tag: "03 / AESTHETICS",
      description: "Focusing on the visual details that make software feel thoughtful, mature, and approachable.",
      topics: [
        { name: "UI/UX Composition", description: "Spacing systems, intentional typography, and visual hierarchy on mobile and desktop." },
        { name: "Dark Theme Aesthetics", description: "Layered charcoal tones, subtle borders, and balanced contrast." },
        { name: "Micro-Interactions", description: "Subtle hover states, tactile feedback, and smooth non-distracting transitions." }
      ]
    },
    {
      id: "experiments-tools",
      title: "Experiments & Tools",
      tag: "04 / ENVIRONMENT",
      description: "The tools and environment that make the engineering process smooth and enjoyable.",
      topics: [
        { name: "Git & Version Control", description: "Branching, committing regularly, and maintaining clean project histories." },
        { name: "Linux & Terminal", description: "Command-line navigation, shell scripting, and customizing development environments." },
        { name: "Vite & Bundlers", description: "Fast local dev servers, modern ES modules, and optimized builds." }
      ]
    },
    {
      id: "interactive-gaming",
      title: "Interactive / Gaming",
      tag: "05 / PLAYGROUND",
      description: "Exploring playful logic, game mechanics, and engaging visual feedback.",
      topics: [
        { name: "Canvas & Interactive Graphics", description: "Particle grids, interactive animations, and responsive visual canvases." },
        { name: "Logic & Game Mechanics", description: "Turn-based loops, state machines, and interactive puzzle rules." },
        { name: "Tactile Digital Physics", description: "Cards with 3D perspective tilt, spring-like press states, and cursor reactivity." }
      ]
    },
    {
      id: "online-communities",
      title: "Communities & Organizing",
      tag: "06 / COLLABORATION",
      description: "Connecting with peers, sharing progress, and helping organize collaborative events.",
      topics: [
        { name: "Collaborative Building", description: "Teaming up with fellow students for hackathons and group learning sessions." },
        { name: "Organizing & Logistics", description: "Helping plan college technical workshops and peer study initiatives." },
        { name: "Knowledge Sharing", description: "Documenting learnings, sharing useful tools, and learning from other builders." }
      ]
    }
  ] as ExploreCategory[],

  // Empty array as requested: no projects made till now, ready to add later
  projects: [] as Project[],

  // Short, compact currently snapshot
  currently: {
    learning: "Computer Engineering @ SAKEC · Web Fundamentals",
    exploring: "Modern Tools · AI & Workflow Automation",
    building: "Initial projects & interactive web experiments",
    statusNote: "Learning by trying things and building step-by-step."
  },

  beyondTheScreen: {
    intro: "Outside of studying and coding, here are some things I enjoy doing that keep me energized, curious, and grounded.",
    interests: [
      {
        title: "Gaming & Strategy",
        category: "Interactive",
        description: "Enjoying competitive and strategic games that challenge spatial reasoning, timing, and teamwork.",
        badge: "Strategy & Focus"
      },
      {
        title: "Cricket & Badminton",
        category: "Sports",
        description: "Playing and following cricket and badminton — great ways to stay active, competitive, and step away from screens.",
        badge: "Active"
      },
      {
        title: "Chess",
        category: "Mindset",
        description: "Appreciating the tactical patience of chess — anticipating moves, evaluating positions, and analyzing endgames.",
        badge: "Tactics"
      },
      {
        title: "Exploring Places & City Walks",
        category: "Life",
        description: "Wandering through Mumbai, finding quiet cafes, noticing architectural details, and trying new foods with friends.",
        badge: "Curiosity"
      }
    ]
  },

  education: [
    {
      period: "2026 — Present",
      degree: "B.Tech in Computer Engineering",
      institution: "Shah and Anchor ( SAKEC ) , Chembur",
      location: "Chembur, Mumbai, India",
      notes: "Currently exploring core engineering fundamentals, algorithms, and practical programming."
    },
    {
      period: "2026",
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Maharashtra State Board",
      location: "Mumbai, India",
      notes: "Science & Mathematics background (Physics, Chemistry, and Mathematics)."
    }
  ],

  contact: {
    heading: "Let's make something interesting.",
    supportingCopy: "Have an idea, something interesting to build, or just want to connect?",
    email: "Vedantbhanushaliofficial@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    socials: [
      { name: "Email", url: "mailto:Vedantbhanushaliofficial@gmail.com", handle: "Vedantbhanushaliofficial@gmail.com" },
      { name: "GitHub", url: "https://github.com", handle: "@vedantbhanushali" },
      { name: "LinkedIn", url: "https://linkedin.com", handle: "vedant-bhanushali" }
    ]
  }
};
