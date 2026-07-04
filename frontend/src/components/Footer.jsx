import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full py-xl px-lg mt-auto flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col items-center md:items-start gap-sm">
        <span className="font-label-caps text-label-caps font-bold text-primary">MANDATE INDUSTRIAL SYSTEMS</span>
        <span className="font-label-caps text-label-caps text-on-surface-variant">© {new Date().getFullYear()} MANDATE INDUSTRIAL SYSTEMS. ALL RIGHTS RESERVED.</span>
      </div>
      <div className="flex gap-lg">
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out">
          Privacy Policy
        </Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out">
          Terms of Service
        </Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out">
          Legal
        </Link>
        <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 transition-all duration-300 ease-in-out">
          Security
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
