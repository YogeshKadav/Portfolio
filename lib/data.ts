export interface Experience {
  id: number
  company: string
  role: string
  period: string
  current: boolean
  bullets: string[]
  tech: string[]
  color: string
}

export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  category: string
  color: string
}

export interface SkillGroup {
  label: string
  skills: string[]
  color: string
  ring: number
}

export interface PortfolioData {
  name: string
  title: string
  subtitle: string
  summary: string
  philosophy: string
  contact: {
    email: string
    phone: string
    linkedin: string
    location: string
    github: string
  }
  experience: Experience[]
  skills: {
    languages: string[]
    frameworks: string[]
    cloud: string[]
    databases: string[]
    microsoft365: string[]
    architecture: string[]
  }
  skillGroups: SkillGroup[]
  projects: Project[]
  education: {
    degree: string
    institution: string
    location: string
    year: string
  }
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: 'Yogesh Kadav',
  title: 'Backend Engineer · .NET & Azure',
  subtitle: 'Software Engineer · API Design | Cloud | Automation',
  summary:
    'Backend engineer with 4 years of shipping production software across fintech, enterprise automation, and SaaS. Deep in the .NET ecosystem — from designing API contracts to containerizing services and building cloud-native pipelines on Azure. I focus on systems that are reliable, observable, and built to last.',
  philosophy:
    'Backend engineering, to me, is about removing uncertainty. Every API contract, deployment pipeline, and data flow should be predictable and easy to reason about. I build with clarity first — performance and scale follow naturally.',
  contact: {
    email: 'ykadav08@gmail.com',
    phone: '+91 9175643317',
    linkedin: 'linkedin.com/in/yogesh-kadav-471427215',
    location: 'Hadapsar, Pune, Maharashtra',
    github: 'github.com/yogeshkadav',
  },
  experience: [
    {
      id: 1,
      company: 'iMocha',
      role: 'Software Engineer',
      period: 'May 2025 – Present',
      current: true,
      bullets: [
        'Engineering production REST APIs in .NET Core that power the core assessment workflows for iMocha\'s SaaS platform',
        'Designed and deployed Azure Functions for async, event-driven workloads — decoupling background processing from the core API layer',
        'Containerized backend services with Docker, eliminating environment-specific failures and standardizing the deployment pipeline',
        'Established API documentation standards using Apidog, enabling faster frontend integration and cleaner third-party onboarding',
        'Shipping features in cross-functional Agile sprints with product and QA on reliable two-week cadences',
      ],
      tech: ['.NET Core', 'C#', 'Azure Functions', 'Docker', 'Apidog', 'REST API'],
      color: '#00f0ff',
    },
    {
      id: 2,
      company: 'STW Services LLP',
      role: '.NET Developer',
      period: 'Apr 2023 – May 2025',
      current: false,
      bullets: [
        'Built and maintained full-stack ASP.NET Core applications serving internal business operations, backed by MSSQL with optimized query layers',
        'Automated recurring document approval workflows in SharePoint using Power Automate and custom C# tooling — removing significant manual overhead for operations teams',
        'Built a Facebook Graph API integration that fed live social content into SharePoint, replacing a manual export process with an automated data pipeline',
        'Delivered Power Apps solutions that digitized internal business processes, cutting dependency on spreadsheet-based workflows',
        'Profiled and rewrote critical SQL queries and stored procedures, achieving a 40% reduction in query execution times',
      ],
      tech: ['ASP.NET Core', 'MSSQL', 'SharePoint', 'Facebook API', 'Power Automate', 'Power Apps'],
      color: '#8a2be2',
    },
    {
      id: 3,
      company: 'LINGUASOL Pvt. Ltd.',
      role: 'Software Engineer',
      period: 'Dec 2021 – Mar 2023',
      current: false,
      bullets: [
        'Built cross-platform C# and C applications for a banking communication system handling real-time financial data exchange across internal services',
        'Developed real-time transaction processing modules under strict reliability constraints — zero tolerance for data loss or duplication',
        'Maintained and upgraded production banking software with zero-downtime deployments, minimizing risk to live financial operations',
        'Implemented TCP/IP socket-based IPC layers enabling reliable, low-latency communication between banking system components',
        'Established unit test coverage at 95%+ for critical financial modules, catching regressions before they reached production',
      ],
      tech: ['C#', 'C', 'MSSQL', 'TCP/IP', '.NET Framework', 'Banking Systems'],
      color: '#ff00ff',
    },
  ],
  skills: {
    languages: ['C#', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL', 'C'],
    frameworks: ['ASP.NET Core', '.NET Core', 'ASP.NET MVC', 'Entity Framework Core', 'jQuery'],
    cloud: ['Microsoft Azure', 'Azure Functions', 'Docker', 'Git'],
    databases: ['MSSQL', 'SQL Server'],
    microsoft365: ['SharePoint', 'Power Apps', 'Power Automate'],
    architecture: ['REST API', 'Web API', 'Microservices', 'MVC'],
  },
  skillGroups: [
    {
      label: 'Languages',
      skills: ['C#', 'JavaScript', 'TypeScript', 'SQL', 'C'],
      color: '#00f0ff',
      ring: 1,
    },
    {
      label: 'Frameworks',
      skills: ['ASP.NET Core', '.NET Core', 'Entity Framework', 'MVC'],
      color: '#8a2be2',
      ring: 2,
    },
    {
      label: 'Cloud & Tools',
      skills: ['Azure', 'Docker', 'SharePoint', 'Git', 'Power Apps'],
      color: '#ff00ff',
      ring: 3,
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Enterprise API Gateway',
      description:
        'Built a .NET Core REST API gateway as the single entry point for enterprise services. Azure Function triggers handle async processing; Docker packaging ensures consistent, repeatable deployments across environments — eliminating "works on my machine" failures.',
      tech: ['C#', '.NET Core', 'Azure', 'Docker'],
      category: 'Backend',
      color: '#00f0ff',
    },
    {
      id: 2,
      title: 'SharePoint Automation Suite',
      description:
        'Replaced a manual, error-prone document approval process with a fully automated workflow suite built on Power Automate and custom C# tooling. Eliminated recurring manual effort for operations teams and significantly reduced process turnaround time.',
      tech: ['C#', 'SharePoint', 'Power Automate', 'MSSQL'],
      category: 'Automation',
      color: '#8a2be2',
    },
    {
      id: 3,
      title: 'Banking Communication System',
      description:
        'Built low-level C# and C applications for real-time financial data exchange in a production banking environment. TCP/IP socket-based IPC handles inter-process messaging with strict reliability requirements and zero tolerance for data loss.',
      tech: ['C#', 'C', 'MSSQL', 'TCP/IP'],
      category: 'Backend',
      color: '#ff00ff',
    },
    {
      id: 4,
      title: 'Social Data Integration Pipeline',
      description:
        'Built an API bridge that pulls live data from the Facebook Graph API and syncs it into SharePoint — giving teams a unified content view without manual exports. Replaced a repetitive copy-paste process with a fully automated data pipeline.',
      tech: ['JavaScript', 'REST API', 'SharePoint', 'Facebook API'],
      category: 'Integration',
      color: '#00f0ff',
    },
    {
      id: 5,
      title: 'Serverless Workflow Engine',
      description:
        'Architected an event-driven processing pipeline on Azure Functions to handle background workloads without dedicated server infrastructure. Auto-scales under load, reduces compute costs at idle, and integrates with Azure Monitor for full observability.',
      tech: ['Azure Functions', '.NET Core', 'C#', 'Azure'],
      category: 'Cloud',
      color: '#8a2be2',
    },
    {
      id: 6,
      title: 'Assessment Platform API',
      description:
        'Core backend contributor to iMocha\'s SaaS assessment platform — building and maintaining production REST APIs consumed by thousands of users. Established API contracts and documentation standards using Apidog to streamline frontend integration and third-party onboarding.',
      tech: ['ASP.NET Core', 'C#', 'Docker', 'Apidog'],
      category: 'Backend',
      color: '#ff00ff',
    },
  ],
  education: {
    degree: 'B.Sc. Computer Science',
    institution: 'Annasaheb Magar College',
    location: 'Pune, Maharashtra',
    year: '2021',
  },
}
