import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-primary">Nature's Journal</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <a
            href="#home"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
