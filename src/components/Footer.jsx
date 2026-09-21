import { Link } from "react-router-dom";
import Logo from "./Logo";

const socialIcons = {
  facebook: (
    <path d="M14 9h-2a1 1 0 0 0-1 1v2h3l-.5 3H11v7H8v-7H6v-3h2v-2a4 4 0 0 1 4-4h2z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" />
    </>
  ),
  twitter: (
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7 11.6 11.6 0 0 1-8.4-4.3 4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 19.6a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
  ),
};

function SocialIcon({ name, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      {socialIcons[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-mint px-6 py-12 text-black sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="flex max-w-[300px] flex-col gap-5">
            <div className="w-fit rounded-[5px] bg-transparent p-0">
              <Logo className="h-[34px] w-auto" />
            </div>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Simplifiez votre recherche immobilière avec anofamg. La
              plateforme de confiance pour louer et publier des annonces.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-bold">Navigation</h4>
              <Link to="/" className="text-[15px] text-neutral-700 hover:text-brand-blue">Accueil</Link>
              <Link to="/recherche" className="text-[15px] text-neutral-700 hover:text-brand-blue">Louer</Link>
              <Link to="/publier" className="text-[15px] text-neutral-700 hover:text-brand-blue">Publier</Link>
              <a href="#a-propos" className="text-[15px] text-neutral-700 hover:text-brand-blue">À Propos</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-bold">Support</h4>
              <a href="#faq" className="text-[15px] text-neutral-700 hover:text-brand-blue">FAQ</a>
              <a href="#contact" className="text-[15px] text-neutral-700 hover:text-brand-blue">Contact</a>
              <a href="#conditions" className="text-[15px] text-neutral-700 hover:text-brand-blue">Conditions d'utilisation</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-bold">Contact</h4>
              <a href="mailto:info@anofamg.com" className="text-[15px] text-neutral-700 hover:text-brand-blue">info@anofamg.com</a>
              <a href="tel:+33123456789" className="text-[15px] text-neutral-700 hover:text-brand-blue">+33 1 23 45 67 89</a>
              <div className="flex gap-4 pt-1">
                <a href="#" aria-label="Facebook" className="text-neutral-700 hover:text-brand-blue">
                  <SocialIcon name="facebook" />
                </a>
                <a href="#" aria-label="Instagram" className="text-neutral-700 hover:text-brand-blue">
                  <SocialIcon name="instagram" />
                </a>
                <a href="#" aria-label="Twitter" className="text-neutral-700 hover:text-brand-blue">
                  <SocialIcon name="twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} anofamg. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-600 hover:text-brand-blue">Confidentialité</a>
            <a href="#" className="text-sm text-neutral-600 hover:text-brand-blue">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
