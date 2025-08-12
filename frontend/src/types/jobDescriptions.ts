export type JobDescriptionCategory =
  | "intern"
  | "java-developer"
  | "business-analyst"
  | "data-analyst"
  | "custom";

interface JobDescriptionOption {
  value: JobDescriptionCategory;
  label: string;
  description: string;
  fullDescription?: string;
}

export const jobDescriptionOptions: JobDescriptionOption[] = [
  {
    value: "java-developer",
    label: "Java Developer",
    description: "Backend development with Java and Spring framework",
    fullDescription: `A Java Developer specializes in building robust, scalable backend applications using Java and related technologies. Key responsibilities include:

    • Developing enterprise-level applications using Java 8+ features
    • Building RESTful APIs and microservices with Spring Boot
    • Working with databases (SQL and NoSQL) and ORM frameworks like Hibernate
    • Implementing design patterns and following SOLID principles
    • Writing unit tests and following TDD practices
    • Collaborating in Agile development environments
    • Performance optimization and debugging complex applications

  Required skills: Java, Spring Framework, SQL, Git, Maven/Gradle, understanding of JVM internals.`,
  },
  {
    value: "business-analyst",
    label: "Business Analyst",
    description: "Requirements gathering and process improvement specialist",
    fullDescription: `A Business Analyst serves as a bridge between business stakeholders and technical teams. Key responsibilities include:

    • Gathering and documenting business requirements from stakeholders
    • Analyzing current business processes and identifying improvement opportunities
    • Creating detailed functional specifications and user stories
    • Facilitating meetings between business and technical teams
    • Performing gap analysis and feasibility studies
    • Creating process flow diagrams and documentation
    • Supporting user acceptance testing and training

  Required skills: Requirements analysis, process modeling, stakeholder management, documentation, SQL basics, Agile methodologies.`,
  },
  {
    value: "data-analyst",
    label: "Data Analyst",
    description: "Data interpretation and insights specialist",
    fullDescription: `A Data Analyst transforms raw data into actionable business insights. Key responsibilities include:

    • Collecting, cleaning, and analyzing large datasets
    • Creating dashboards and reports using visualization tools
    • Performing statistical analysis and trend identification
    • Writing SQL queries to extract data from databases
    • Collaborating with stakeholders to understand data requirements
    • Presenting findings and recommendations to management
    • Ensuring data quality and integrity

  Required skills: SQL, Excel, Python/R, Tableau/Power BI, statistics, data visualization, critical thinking.`,
  },
  {
    value: "intern",
    label: "Intern/Entry Level",
    description: "General entry-level position for new graduates",
    fullDescription: `An Intern or Entry-level position is designed for recent graduates or career changers. Key expectations include:

    • Learning fundamental programming and business concepts
    • Contributing to team projects under supervision
    • Developing problem-solving and analytical skills
    • Participating in code reviews and team meetings
    • Following established processes and best practices
    • Showing eagerness to learn and grow
    • Building professional communication skills

  Focus areas: Basic programming, teamwork, communication, adaptability, willingness to learn.`,
  },
];
