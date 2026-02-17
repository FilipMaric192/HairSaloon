import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // zatvori meni kad se promijeni širina na desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false); // md breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="border-b border-white/10 bg-neutral-950 text-white">
      <div className="flex w-full items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="text-lg font-semibold">
          HairSaloon
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a href="#pricing" className="hover:text-white">
            Cjenik
          </a>
          <a href="#contact" className="hover:text-white">
            Kontakt
          </a>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* hamburger / X */}
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 text-sm text-neutral-300">
            <a
              href="#pricing"
              className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Cjenik
            </a>
            <a
              href="#contact"
              className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Kontakt
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
