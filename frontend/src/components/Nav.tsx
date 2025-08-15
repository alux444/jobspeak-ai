import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/button";

export default function Nav() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b border-border px-6 py-3 flex items-center space-x-4 justify-between transition-colors bg-background">
      <div className="flex items-center space-x-3">
        <a href="/">
          <img
            src="/vite.svg"
            alt="Logo"
            className="h-7 w-7"
          />
        </a>
        <h1 className="text-xl font-bold">
          Interview Response Analyser
        </h1>
      </div>
      <Button variant="outline" size="sm" onClick={toggleTheme}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  );
}
