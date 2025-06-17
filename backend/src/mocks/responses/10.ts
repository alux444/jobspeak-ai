import { QuestionAndAnswer } from "../../types/mocks";

export const tenValues: QuestionAndAnswer[] = [
  {
    question: "Tell me about a time you worked in a team.",
    answer:
      "During my final year at university, I worked in a team of five on a capstone project to build a web-based scheduling tool for tutors and students. Early in the project, we ran into communication issues — people were working in silos, and overlapping code changes were causing conflicts. I brought this up during a team meeting and proposed implementing agile standups twice a week, along with a shared task board using Trello. I also volunteered to be the one ensuring everyone kept the board updated. After we adopted this, our collaboration improved drastically. Team members had clearer ownership over tasks, dependencies were easier to manage, and we drastically reduced merge conflicts. In the end, we delivered the project two weeks early, and it was selected as one of the top three projects in our cohort. What I learned from this experience is that good technical work alone doesn’t guarantee success—clear communication and structure are just as important.",
  },
  {
    question: "Describe a time you had to learn something quickly.",
    answer:
      "In my internship, I was assigned to integrate our frontend React app with a GraphQL API, which I had never used before. I had about a week to deliver the feature, but my mentor was on leave, and documentation was sparse. I started by reading through example queries and mutations in the codebase, and then spent a weekend going through Apollo Client documentation and tutorials. I also reached out to a backend engineer familiar with our GraphQL gateway, who walked me through how the schemas were structured and which mutations to use. With that, I was able to implement the data fetching, error handling, and caching logic myself. I documented what I learned in a short guide and added comments to clarify the more confusing parts of the API. The PR passed code review with minimal changes, and the feature was shipped on time. This experience taught me how to be resourceful, and that learning something fast often involves not just reading, but asking good questions and contributing back to your team’s knowledge base.",
  },
  {
    question: "Tell me about a time you faced a conflict on a team and how you handled it.",
    answer:
      "In a group software project, we had a disagreement over which database technology to use — one teammate strongly advocated for MongoDB, while others, including myself, leaned toward PostgreSQL for relational structure. The debate was getting personal and slowing progress. I stepped in and suggested we create a quick proof of concept for both options to compare performance, development time, and alignment with our data model. I volunteered to lead this spike, splitting it into two branches over a weekend. After presenting the results — where PostgreSQL proved easier to query and better matched our data relationships — the group agreed to proceed with it. I made sure to acknowledge the value of the MongoDB perspective and thanked the teammate for raising the alternative. From this, I learned that defusing tension with objective evidence and inclusiveness is key. It helped us move forward with clarity, and the project was ultimately submitted ahead of schedule.",
  },
  {
    question: "Describe a time you improved a process.",
    answer:
      "At my internship, I noticed our automated test suite for the frontend was flaky — tests would intermittently fail in CI, often due to timing issues in our component loading. It was affecting developer confidence and wasting time. I started investigating and found that several tests relied on arbitrary setTimeout delays. I proposed a refactor to use proper waitFor utilities and DOM assertions instead. I created a checklist to identify flaky patterns and started fixing tests one by one, testing them locally and in CI. Over two weeks, I reduced test failures by 80%, and I documented my approach in our internal wiki. I also ran a short knowledge-sharing session so others could follow the same strategy. After that, the flakiness issue dropped from our team’s weekly standups, and PRs merged more confidently. This taught me that even as an intern, I could make meaningful improvements by being proactive and thinking about developer experience.",
  },
  {
    question: "Tell me about a time you went above and beyond.",
    answer:
      "While interning, I was working on a dashboard feature that let managers view real-time system status. My task was to add a toggle for filtering by region, but I noticed that the backend query we were using was extremely inefficient — it fetched all data and filtered on the frontend. Though it wasn’t in my scope, I dug into the backend code and saw an opportunity to optimize the query by applying the filters at the SQL level. I ran the idea past the backend team, and they agreed it made sense. I made the change under their supervision and tested the new endpoint. This reduced data transfer by over 90% and improved load time from 5s to under 1s. After rollout, I heard from the product owner that this was one of the most noticeable improvements for users. I wasn’t expected to go that deep into the stack, but it reinforced how curiosity and initiative can lead to impactful work, even if it's not formally in your ticket.",
  },
];
