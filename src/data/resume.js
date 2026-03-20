// Content extracted from resume.md

export const profile = {
  name: "Chumlung Nip Khoyahang Limbu",
};

export const social = {
  email: "chumlung.khoyahang@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/chumlunglimbu",
  githubUrl: "https://github.com/chumlunglimbu",
};

export const skills = [
  {
    heading: "languages",
    label: "Languages",
    items: [
      {
        label: "JavaScript",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        label: "TypeScript",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        label: "Golang",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
      }
    ],
  },
  {
    heading: "frameworks",
    label: "Frameworks & Libraries",
    items: [
      {
        label: "ReactJS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        label: "NodeJS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        label: "NestJS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
      },
      {
        label: "NextJS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
    ],
  },
  {
    heading: "ui",
    label: "UI/UX & Styling",
    items: [
      {
        label: "HTML5",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        label: "CSS3",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        label: "Figma",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        label: "Tailwind",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    heading: "testing",
    label: "Testing & Quality",
    items: [
      {
        label: "Jest",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
      },
      {
        label: "SonarQube",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
      },
    ],
  },
  {
    heading: "databases",
    label: "Databases",
    items: [
      {
        label: "PostgreSQL",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        label: "MongoDB",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
    ],
  },
  {
    heading: "infrastructure",
    label: "Infrastructure",
    items: [
      {
        label: "Docker",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        label: "Kubernetes",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      },
      {
        label: "AWS EC2",
        logoUrl: "assets/logos/aws-ec2.png",
      },
      {
        label: "AWS ECS",
        logoUrl: "assets/logos/aws-ecs.png",
      },
      {
        label: "AWS S3",
        logoUrl: "assets/logos/aws-s3.png",
      },
      {
        label: "AWS Lambda",
        logoUrl: "assets/logos/aws-lambda.png",
      },
      {
        label: "AWS SQS",
        logoUrl: "assets/logos/aws-sqs.png",
      },
      {
        label: "AWS SNS",
        logoUrl: "assets/logos/aws-sns.png",
      },
      {
        label: "AWS RDS",
        logoUrl: "assets/logos/aws-rds.png",
      },
    ],
  },
];

export const developmetLifeCycle = [
  {
    title: "Understanding",
    description: "the niche business requirements thorugh clear and concise conversations",
    icon: "lens.svg"
  },
  {
    title: "Identifying",
    description: "technical solutions and designing the architecture",
    icon: "lightbulb.svg"
  },
  {
    title: "Planning",
    description: "feature delivery timelines into sprint deliverables",
    icon: "clock.svg"
  },
  {
    title: "Leading",
    description: "engineering teams in test-driven development approach",
    icon: "code.svg"
  },
  {
    title: "Deploying",
    description: "into development, staging and production environments",
    icon: "cog.svg"
  },
  {
    title: "Maintaining",
    description: "systems for performance and security",
    icon: "shield.svg"
  }
]

export const projects = [
  {
    name: "GoLend",
    roles: ["Team Lead", "Full Stack Engineer"],
    industryDomain: "FinTech",
    siteUrl: "https://www.golend.co.nz/",
    description: "A peer to peer marketplace which matches those looking to invest with those looking to borrow.",
    keyContributions: [
      {
        title: "Ensured fast to market delivery of the product by establishing the codebase foundation, database schema and rapid development.",
        highlightPhrases: ["Ensured fast to market delivery of the product","establishing", "codebase foundation", "database schema", "rapid development"],
      },
      {
        title: "Ensured the critical financial calculations are accurate and reliable by implementing service-repository pattern for cleaner, testable and maintainable service layer functions",
        highlightPhrases: ["Ensured the critical financial calculations", "accurate", "reliable", "cleaner", "testable", "maintainable"],
      },
      {
        title: "Increased the marketing site performance by 30% for faster loading times and better user experience, through refactored codebase.",
        highlightPhrases: ["Increased the marketing site performance by 30%", "refactored codebase", "faster loading times", "better user experience"],
      },
    ]
  },
  {
    name: "Inpart Assess",
    roles: ["Team Lead", "Full Stack Engineer"],
    industryDomain: "Healthcare",
    siteUrl: "https://inpart.io/",
    description: "A module within Inpart’s existing system, focused on building assessments surveys, shared via URLs with participants within and outside the organization.",
    keyContributions: [
      {
        title: "Established a standalone module within the existing microservices architecture, enabling its independent deployment, tech stack and database.",
        highlightPhrases: ["Established", "standalone module", "microservices architecture", "independent deployment", "tech stack and database"],
      },
      {
        title: "Built a seamless survey participation system for users without login required, with secure, stateful authentication mechanism.",
        highlightPhrases: ["Built", "seamless survey participation system", "stateful authentication mechanism"],
      },
      {
        title: "Saved the DevOps team an estimated 1 week by implementing runtime configuration file strategy for the Vite-built application.",
        highlightPhrases: ["Saved the DevOps", "1 week", "implementing runtime configuration file strategy"],
      }
    ]
  },
  {
    name: "Soliish",
    roles: ["Team Lead", "Full Stack Engineer"],
    industryDomain: "Healthcare",
    siteUrl: "https://www.soliish.com/",
    description: "A project to detecting Sleep Apnea on patients based on facial features of users and their answers to survey questions.",
    keyContributions: [
      {
        title: "Saved database infrastructure cost by architecting a multi-tenant database system with a shared-database, separate-schema approach.",
        highlightPhrases: ["Saved database infrastructure cost", "architecting", "multi-tenant", "shared-database, separate-schema approach"],
      },
      {
        title: "Enabled admin users to control authorization of data resources by building a conveninent and secure Role-based access control system.",
        highlightPhrases: ["Enabled admin users to control authorization of data resources", "building", "conveninent", "secure", "Role-based access control system"],
      }
    ]
  },
  {
    name: "Phil",
    roles: ["Front End Engineer"],
    industryDomain: "Healthcare",
    siteUrl: "https://phil.us/",
    description: "An initiative to create a marketing site which can dynamically change its theme and user journey for a patient, based on the URLs provided to them by Phil’s health care provider partners.",
    keyContributions: [
        {
          title: "Enabled Phil to quickly deploy dynamic, tailored marketing sites by architecting a highly configurable Next.js application using Orchestrator - component registry pattern, driven by tailored JSON configuration files.",
          highlightPhrases: ["Enabled Phil to quickly deploy dynamic", "tailored marketing sites", "architecting", "highly configurable Next.js application", "Orchestrator - component registry pattern", "tailored JSON configuration files"],
        }
      ]
    },
];
