export default function AnimatedGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-80 mix-blend-overlay dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900" />
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-400 opacity-60 mix-blend-overlay dark:from-purple-800 dark:via-pink-800 dark:to-indigo-700" />
      <div className="absolute inset-0 bg-white/30 dark:bg-black/1" />
    </div>
  );
}
