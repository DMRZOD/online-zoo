import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function FixedControls() {
  return (
    <div className="fixed bottom-4 right-4 z-[2500] flex flex-col items-center gap-2">
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
}
