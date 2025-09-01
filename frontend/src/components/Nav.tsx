import DarkModeToggle from "./DarkModeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border px-6 py-3 flex items-center space-x-4 justify-between transition-colors">
      <div className="flex items-center space-x-3">
        <a href="/">
          <img
            src="/vite.svg"
            alt="Logo"
            className="h-7 w-7"
          />
        </a>
        <h1 className="text-xl font-bold">
          JobSpeak AI
        </h1>
      </div>
      <DarkModeToggle />
    </header>
  );
}
