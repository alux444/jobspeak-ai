export default function Title() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-6 animate-fadeIn flex items-center space-x-4">
      <a href="/">
        <img
          src="/public/vite.svg"
          alt="Logo"
          className="h-7 w-7"
        />
      </a>
      <h1 className="text-2xl font-bold">
        Interview Response Analyser
      </h1>
    </header>
  );
}
