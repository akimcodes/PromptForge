export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <h1 className="text-2xl font-bold text-purple-500">
        PromptForge
      </h1>

      <div className="flex gap-8 text-gray-300">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}