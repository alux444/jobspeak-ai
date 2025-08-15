export default function Title() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Interview Response Analyser
      </h1>
      <p className="mt-1 text-lg text-muted-foreground leading-snug">
        Practice behavioral interview questions and get{" "}
        <span className="font-semibold text-primary">AI-powered feedback</span>{" "}
        on your responses.
      </p>
    </header>
  );
}
