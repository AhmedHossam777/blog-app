export default function Header() {
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between w-full">
      <span className="font-semibold text-lg">Blog</span>
      <nav className="flex items-center gap-1">
        <a
          href="/"
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
        >
          Home
        </a>
        <a
          href="/about"
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
        >
          About
        </a>
      </nav>
    </header>
  );
}
