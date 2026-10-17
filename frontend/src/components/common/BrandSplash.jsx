import BrandLogo from "./BrandLogo";

export default function BrandSplash({ message = "Loading your workspace…" }) {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center gap-5 bg-background text-on-surface"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <BrandLogo size={144} decorative />
      <span className="font-mono text-xl font-bold tracking-widest">
        MANDATE
      </span>
      <p className="text-sm text-on-surface-variant">{message}</p>
    </main>
  );
}
