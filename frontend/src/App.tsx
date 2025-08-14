// import { useState } from "react";
// import "./App.css";
// import { JobDescriptionSelector } from "./components";
// import Footer from "./components/Footer";
// import Recorder from "./components/Recorder";
// import type { JobDescriptionCategory } from "./types/jobDescriptions";

// export default function App() {
//   const [selectedJobDescription, setSelectedJobDescription] = useState<JobDescriptionCategory>('java-developer');
//   const [customJobDescription, setCustomJobDescription] = useState<string | undefined>(undefined);

//   const handleJobDescriptionChange = (category: JobDescriptionCategory, customDescription?: string) => {
//     setSelectedJobDescription(category);
//     setCustomJobDescription(customDescription);
//   };

//   return (
//     <div>
//       <header className="app-header fade-in">
//         <h1>Interview Response Analyser</h1>
//         <p>
//           Practice with random behavioral questions and get
//           <span className="highlight"> AI-powered feedback </span>
//           on your responses.
//         </p>
//       </header>

//       <main className="fade-in delay">
//         <JobDescriptionSelector
//           selectedJobDescription={selectedJobDescription}
//           onJobDescriptionChange={handleJobDescriptionChange}
//         />
//         <Recorder
//           selectedJobDescription={selectedJobDescription}
//           customJobDescription={customJobDescription}
//         />
//         <Footer />
//       </main>
//     </div>
//   );
// }

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InterviewAnalyser } from '@/components/InterviewAnalyser';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InterviewAnalyser />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
