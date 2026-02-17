export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-400">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HairSaloon</p>
          <p>Radno vrijeme: Pon–Sub 09:00–19:00</p>
        </div>
      </div>
    </footer>
  );
}
