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
    ],
  },
  {
    heading: "frameworks",
    label: "Frameworks & Libraries",
    items: [
      {
        label: "React",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        label: "Node.js",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        label: "NestJS",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
      },
      {
        label: "Next.js",
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
        label: "Mocha",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
      },
      {
        label: "Chai",
        logoUrl:
          "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/chai.svg",
      },
      {
        label: "Jest",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
      },
      {
        label: "Sentry",
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sentry/sentry-original.svg",
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
  // {
  //   heading: "ci-cd-tools",
  //   label: "CI/CD & Tools",
  //   items: [
  //     {
  //       label: "Jenkins",
  //       logoUrl:
  //         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  //     },
  //     {
  //       label: "Travis",
  //       logoUrl:
  //         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/travis/travis-plain.svg",
  //     },
  //     {
  //       label: "GitHub Actions",
  //       logoUrl:
  //         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  //     },
  //     {
  //       label: "Git",
  //       logoUrl:
  //         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  //     },
  //     {
  //       label: "GitHub",
  //       logoUrl:
  //         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  //     },
  //   ],
  // },
];

export const projects = [
{
  name: "Phil",
  roles: ["Front End Engineer"],
  industryDomain: "Healthcare",
  siteUrl: "https://phil.us/",
  description: "An initiative to create a marketing site which can dynamically change its theme and user journey for a patient, based on the URLs provided to them by Phil’s health care provider partners.",
  keyContributions: [
      {
        title: "Architected a highly configurable Next.js application using Orchestrator - component registry pattern, driven by JSON configuration files tailored for each client individually, enabling rapid, per-client dynamic theming.",
        highlightPhrases: ["Architected", "Orchestrator - component registry pattern", "rapid", "per-client dynamic theming"],
      }
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
        highlightPhrases: ["standalone module", "microservices architecture", "independent deployment", "tech stack and database"],
      },
      {
        title: "Built a secure, stateful authentication mechanism for users participating in the survey without user login required, resulting in convenient survey link distribution and participation.",
        highlightPhrases: ["Built", "secure", "stateful authentication mechanism", "convenient survey link distribution and participation"],
      },
      {
        title: "Saved the DevOps team an estimated 1 week by implementing runtime configuration file strategy for the Vite-built application.",
        highlightPhrases: ["Saved the DevOps", "1 week", "implementing runtime configuration file strategy"],
      }
    ]
  },
  {
    name: "GoLend",
    roles: ["Team Lead", "Full Stack Engineer"],
    industryDomain: "FinTech",
    siteUrl: "https://www.golend.co.nz/",
    description: "A peer to peer marketplace which matches those looking to invest with those looking to borrow.",
    keyContributions: [
      {
        title: "Implemented service-repository pattern for cleaner, maintainable service layer functions handling complex fintech domain business needs with meticulous unit tests for all critical services, resulting in 90% test coverage.",
        highlightPhrases: ["Implemented service-repository pattern", "cleaner", "maintainable", "meticulous unit tests", "90% test coverage"],
      },
      {
        title: "Analyzed the marketing site performance with Lighthouse, refactored codebase to remove unused Javascript code, scripts and increased the site performance by 30%.",
        highlightPhrases: ["markteing site performance", "Lighthouse", "refactored codebase", "increased the site performance by 30%"],
      },
      {
        title: "Devised the disaster recovery plan at the database layer achieving Recover Point Objective of 5 minutes.",
        highlightPhrases: ["Devised", "disaster recovery plan", "achieving Recover Point Objective of 5 minutes"],
      },
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
        title: "Architected a multi-tenant database system with a shared-database, separate-schema approach to strike the right balance between cost, security and complexity. ",
        highlightPhrases: ["Architected", "multi-tenant", "shared-database, separate-schema approach", "cost, security and complexity"],
      },
      {
        title: "Built Role-based access control system capable of customizing authorization of minute levels of permissions.",
        highlightPhrases: ["Built", "Role-based access control system", "authorization of minute levels of permissions"],
      }
    ]
  },
];
