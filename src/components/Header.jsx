import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Louer", to: "/recherche" },
  { label: "Publier une annonce", to: "/publier" },
  { label: "A propos", to: "/#a-propos" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-brand-mint/95 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between px-6 py-2 sm:px-10 lg:px-[60px]">
        <Link to="/" className="shrink-0" aria-label="anofamig — accueil">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to.split("#")[0]) &&
                link.to !== "/#a-propos" &&
                link.to !== "/#contact";
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-[15px] transition-colors hover:text-brand-blue ${isActive ? "font-semibold text-black" : "text-black"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/#contact"
          className="hidden rounded-[8px] bg-black px-4 py-2 text-sm font-semibold text-brand-mint transition-colors hover:bg-neutral-800 md:inline-block"
        >
          Contactez-nous
        </Link>
      </div>
    </header>
  );
}
