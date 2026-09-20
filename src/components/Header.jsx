import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Louer", to: "/recherche" },
  { label: "Publier une annonce", to: "/publier" },
  { label: "A propos", to: "/#a-propos" },
  { label: "Contact", to: "/#contact" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-brand-mint">
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-[60px]">
        <Link to="/" className="shrink-0" aria-label="anofamig — accueil">
          <Logo className="h-10 w-auto sm:h-[52px]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
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
                className={`text-[17px] transition-colors hover:text-brand-blue ${
                  isActive ? "font-semibold text-black" : "text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/publier"
          className="hidden rounded-[10px] bg-black px-5 py-2.5 text-sm font-semibold text-brand-mint transition-colors hover:bg-neutral-800 md:inline-block"
        >
          Publier une annonce
        </Link>
      </div>
    </header>
  );
}
