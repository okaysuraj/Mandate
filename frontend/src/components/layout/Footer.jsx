import { Link } from "react-router";
import BrandLogo from "../common/BrandLogo";

const Footer = () => {
  return (
    <footer className="w-full py-xl px-lg mt-auto flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col items-center md:items-start gap-sm">
        <Link
          to="/"
          className="flex items-center gap-2 font-label-caps text-label-caps font-bold text-primary"
        >
          <BrandLogo size={32} decorative />
          <span>MANDATE.</span>
        </Link>
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          © {new Date().getFullYear()} MANDATE. ALL RIGHTS RESERVED.
        </span>
      </div>
      <div className="flex gap-lg">
        <Link
          to="/privacy"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out"
        >
          Terms of Service
        </Link>
        <Link
          to="/legal"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out"
        >
          Legal
        </Link>
        <Link
          to="/security"
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out"
        >
          Security
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
