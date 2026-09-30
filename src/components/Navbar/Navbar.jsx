import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import RubberSegment from "../RubberSegment/RubberSegment";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        localStorage.getItem("theme") === "dark"
      );
    }
    return false;
  });

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { value: "/", label: "Home" },
    { value: "/Portofolio", label: "Portofolio" },
    { value: "/Certificate", label: "Certificate" },
    { value: "/Contact", label: "Contact" },
  ];

  // Match current path to segment value
  const currentPath =
    navItems.find((item) => item.value.toLowerCase() === location.pathname.toLowerCase())?.value || "/";

  const handleNavChange = (path) => {
    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3 md:py-3.5"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex justify-between items-center">
            <a href="/" className="group flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                S<span className="text-primary">R</span>
              </span>
            </a>

            <div className="hidden md:flex items-center">
              <RubberSegment
                items={navItems}
                value={currentPath}
                onChange={handleNavChange}
                size="md"
                radius={9999}
                inset={4}
                equalSlots={false}
                trackColor={isDark ? "rgba(39, 39, 42, 0.75)" : "rgba(243, 244, 246, 0.9)"}
                thumbColor="var(--primary)"
                textColor={isDark ? "#a1a1aa" : "#4b5563"}
                activeTextColor="#ffffff"
                speed={1.2}
                stretch={40}
                className="backdrop-blur-md border border-border shadow-inner"
              />
            </div>

            <div className="hidden md:flex items-center gap-2.5">
           
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-border bg-card/60 hover:bg-muted text-foreground transition-colors cursor-pointer shadow-sm"
                aria-label="Toggle theme"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
              </button>

            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border bg-card/60 text-foreground"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg border border-border bg-card/60 text-foreground"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transform transition-transform duration-300 md:hidden flex flex-col items-center justify-center p-6 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 p-2.5 rounded-full border border-border text-foreground hover:bg-muted"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          {navItems.map(({ label, value }) => {
            const isActive = location.pathname.toLowerCase() === value.toLowerCase();
            return (
              <button
                key={value}
                onClick={() => {
                  closeMenu();
                  navigate(value);
                }}
                className={`w-full px-6 py-3.5 text-center rounded-2xl font-medium text-base transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            );
          })}

          <a
            href="https://www.linkedin.com/in/salendrawijaya/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="w-full mt-3 flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl font-semibold hover:brightness-110 transition-all shadow-md"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
