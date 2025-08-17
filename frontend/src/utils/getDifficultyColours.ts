export function getDifficultyColors(difficulty: "easy" | "medium" | "hard") {
  switch (difficulty) {
    case "easy":
      return "bg-[#d1fae5] text-[#065f46]";
    case "medium":
      return "bg-[#fef3c7] text-[#92400e]";
    case "hard":
      return "bg-[#fee2e2] text-[#991b1b]";
    default:
      return "bg-transparent text-inherit";
  }
}
