export type JobDescriptionCategory =
  | "general"
  | "custom"
  | "intern"
  | "software-engineer"
  | "java-developer"
  | "business-analyst"
  | "data-analyst"
  | "civil-engineer"
  | "mechatronics-engineer"
  | "cybersecurity-analyst"
  | "ml-engineer"
  | "cloud-architect"
  | "structural-engineer"
  | "electrical-engineer"
  | "ai-researcher"
  | "firmware-engineer";

interface JobDescriptionOption {
  value: JobDescriptionCategory;
  label: string;
  description: string;
  fullDescription?: string;
}

export const jobDescriptionOptions: JobDescriptionOption[] = [
  {
    value: "general",
    label: "General Position",
    description: "A broad job description suitable for any industry or role.",
    fullDescription: `This general job description applies to a wide range of industries and positions. It typically includes:
    • Performing assigned tasks efficiently and responsibly
    • Collaborating with team members and stakeholders
    • Communicating effectively in written and verbal formats
    • Adhering to company policies, procedures, and ethical standards
    • Demonstrating adaptability and willingness to learn new skills
    • Managing time and priorities to meet deadlines
    • Contributing to a positive and inclusive workplace culture

  This description is suitable for roles where specific technical or industry requirements are not defined, and emphasizes professionalism, teamwork, and continuous improvement.`,
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
  {
    value: "software-engineer",
    label: "Full-Stack Software Engineer",
    description: "Full-stack development with modern web technologies",
    fullDescription: `A Full-Stack Software Engineer designs, develops, and maintains software applications. Key responsibilities include:
    • Writing clean, efficient, and maintainable code
    • Collaborating with cross-functional teams to define and implement features
    • Participating in code reviews and providing constructive feedback
    • Troubleshooting and debugging issues in a timely manner
    • Staying updated with emerging technologies and industry trends
    • Ensuring software quality through testing and documentation
    • Contributing to continuous improvement of development processes

  Required skills: RESTful APIs, Git, Agile methodologies, cloud services, front-end frameworks, back-end development, SQL/NoSQL databases`,
  },
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
    value: "civil-engineer",
    label: "Civil Engineer",
    description: "Design and supervision of infrastructure projects",
    fullDescription: `A Civil Engineer is responsible for planning and overseeing construction projects. Key responsibilities include:

    • Designing and analyzing structural components and systems
    • Preparing technical drawings, plans, and specifications
    • Performing site inspections and ensuring compliance with safety standards
    • Conducting feasibility studies and cost estimates
    • Collaborating with architects, contractors, and government agencies
    • Supervising construction and maintenance of roads, bridges, and buildings
    • Applying sustainable and environmentally friendly practices

  Required skills: AutoCAD/Civil 3D, project management, structural analysis, surveying, construction regulations, teamwork.`,
  },
  {
    value: "mechatronics-engineer",
    label: "Mechatronics Engineer",
    description: "Integration of mechanical, electrical, and software systems",
    fullDescription: `A Mechatronics Engineer designs and develops automated systems and robotics. Key responsibilities include:

    • Designing electro-mechanical systems and prototypes
    • Developing embedded software for control systems
    • Integrating sensors, actuators, and microcontrollers
    • Testing and calibrating robotic systems
    • Conducting simulations and performance analysis
    • Working with interdisciplinary teams on automation projects
    • Applying knowledge of control theory and system dynamics

  Required skills: CAD software, embedded C/C++, Python/Matlab, PLC programming, robotics, electronics, systems integration.`,
  },
  {
    value: "cybersecurity-analyst",
    label: "Cybersecurity Analyst",
    description: "Protecting systems and networks from cyber threats",
    fullDescription: `A Cybersecurity Analyst is responsible for monitoring and defending IT systems. Key responsibilities include:

    • Monitoring network traffic for suspicious activity
    • Conducting vulnerability assessments and penetration tests
    • Implementing security protocols and firewalls
    • Responding to security incidents and breaches
    • Ensuring compliance with security policies and regulations
    • Training staff on security best practices
    • Keeping up-to-date with evolving threats

  Required skills: Network security, firewalls, SIEM tools, Python/Shell scripting, incident response, security frameworks (NIST, ISO).`,
  },
  {
    value: "ml-engineer",
    label: "Machine Learning Engineer",
    description: "Building and deploying AI/ML models into production",
    fullDescription: `A Machine Learning Engineer focuses on developing and scaling machine learning solutions. Key responsibilities include:

    • Designing, training, and fine-tuning machine learning models
    • Implementing data preprocessing and feature engineering pipelines
    • Deploying ML models into production environments
    • Optimizing models for performance and scalability
    • Collaborating with data scientists and software engineers
    • Monitoring models for drift and retraining as needed
    • Documenting methodologies and results

  Required skills: Python, TensorFlow/PyTorch, scikit-learn, SQL, cloud platforms (AWS/GCP/Azure), MLOps practices, data structures and algorithms.`,
  },
  {
    value: "cloud-architect",
    label: "Cloud Architect",
    description: "Designing scalable and secure cloud solutions",
    fullDescription: `A Cloud Architect designs and manages cloud infrastructure for enterprises. Key responsibilities include:

    • Developing cloud architecture blueprints and strategies
    • Designing secure, scalable, and cost-efficient solutions
    • Migrating on-premise systems to the cloud
    • Ensuring compliance with security and governance standards
    • Collaborating with development and DevOps teams
    • Evaluating emerging cloud technologies
    • Providing technical leadership on cloud adoption

  Required skills: AWS/Azure/GCP architecture, networking, security, Kubernetes, Terraform, cost optimization, stakeholder communication.`,
  },
  {
    value: "structural-engineer",
    label: "Structural Engineer",
    description: "Design and analysis of safe, durable structures",
    fullDescription: `A Structural Engineer specializes in ensuring that buildings and infrastructure can withstand loads and stresses. Key responsibilities include:

    • Designing structural frameworks and components
    • Performing load calculations and finite element analysis
    • Preparing drawings, technical specifications, and reports
    • Conducting site visits and inspections
    • Ensuring compliance with building codes and safety regulations
    • Collaborating with architects and construction teams
    • Incorporating sustainability into structural design

  Required skills: AutoCAD/Revit, SAP2000/ETABS, finite element analysis, construction materials knowledge, project management.`,
  },
  {
    value: "electrical-engineer",
    label: "Electrical Engineer",
    description: "Design and maintenance of electrical systems",
    fullDescription: `An Electrical Engineer works on electrical infrastructure and devices. Key responsibilities include:

    • Designing power distribution, lighting, and control systems
    • Developing electrical schematics and circuit layouts
    • Performing calculations for load, efficiency, and safety
    • Conducting inspections and troubleshooting electrical issues
    • Ensuring compliance with electrical codes and standards
    • Overseeing installation and commissioning of systems
    • Collaborating on automation and renewable energy projects

  Required skills: Circuit design, AutoCAD Electrical, PLCs, MATLAB/Simulink, renewable energy systems, safety standards (IEC/IEEE).`,
  },
  {
    value: "ai-researcher",
    label: "AI Researcher",
    description: "Exploring cutting-edge artificial intelligence methods",
    fullDescription: `An AI Researcher investigates and develops novel AI algorithms. Key responsibilities include:

    • Conducting research in areas such as deep learning, reinforcement learning, and NLP
    • Publishing findings in academic and industry journals
    • Experimenting with large-scale datasets and models
    • Collaborating with universities and research labs
    • Developing prototypes for new AI applications
    • Staying updated with the latest AI breakthroughs
    • Mentoring junior researchers and interns

  Required skills: Python, TensorFlow/PyTorch, mathematics (linear algebra, probability, optimization), research methodology, strong publication record.`,
  },
  {
    value: "firmware-engineer",
    label: "Firmware Engineer",
    description: "Developing low-level software for embedded systems",
    fullDescription: `A Firmware Engineer designs and implements firmware for embedded devices. Key responsibilities include:
    • Writing efficient, low-level code in C/C++ for microcontrollers
    • Developing device drivers and hardware abstraction layers
    • Performing debugging and testing on embedded systems
    • Collaborating with hardware engineers on system design
    • Optimizing firmware for performance and power consumption
    • Ensuring compliance with industry standards and protocols
    • Documenting firmware architecture and changes
  Required skills: Embedded C/C++, RTOS, microcontroller architectures (ARM, AVR), debugging tools (JTAG, oscilloscopes), version control (Git).`,
  },
];
