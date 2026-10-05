import React, { useState, useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Sun, Moon, Monitor, Check, ShieldCheck, Zap, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const ThemeAppearancePage = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });
  const [isSystemDark, setIsSystemDark] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => setIsSystemDark(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const applyTheme = (mode) => {
    setCurrentTheme(mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Dark Mode activated");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Light Mode activated");
    } else {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      toast.success("Syncing with System preference");
    }
    // Dispatch event so other components (e.g. Navbar) react immediately
    window.dispatchEvent(new Event("theme-change"));
  };

  const activeModeIsDark = currentTheme === "dark" || (currentTheme === "system" && isSystemDark);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Header */}
        <div className="border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
              INTERFACE CONTROLS · SYSTEM EXPERIENCE
            </p>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight uppercase">
            Theme & Appearance
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1 max-w-2xl">
            Configure visual presentation, contrast ratios, and theme switching. Designed for high fidelity across both light and dark environments.
          </p>
        </div>

        {/* Theme Mode Selection Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface">
              Appearance Mode
            </h2>
            <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full border border-outline-variant">
              Active: <strong className="text-primary uppercase">{currentTheme} ({activeModeIsDark ? "Dark" : "Light"})</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* System */}
            <button
              onClick={() => applyTheme("system")}
              className={`p-5 rounded-lg border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between h-44 ${
                currentTheme === "system"
                  ? "border-primary bg-surface-container-low shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest hover:border-outline"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                  <Monitor className="w-5 h-5" />
                </div>
                {currentTheme === "system" && (
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-primary uppercase">System Synchronized</h3>
                <p className="font-body-md text-xs text-on-surface-variant mt-1">
                  Automatically match your operating system theme schedule.
                </p>
              </div>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => applyTheme("dark")}
              className={`p-5 rounded-lg border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between h-44 ${
                currentTheme === "dark"
                  ? "border-primary bg-surface-container-low shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest hover:border-outline"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                  <Moon className="w-5 h-5" />
                </div>
                {currentTheme === "dark" && (
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-primary uppercase">High-Contrast Dark</h3>
                <p className="font-body-md text-xs text-on-surface-variant mt-1">
                  Deep zinc & obsidian tones engineered for low-light focus.
                </p>
              </div>
            </button>

            {/* Light Mode */}
            <button
              onClick={() => applyTheme("light")}
              className={`p-5 rounded-lg border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between h-44 ${
                currentTheme === "light"
                  ? "border-primary bg-surface-container-low shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest hover:border-outline"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                  <Sun className="w-5 h-5" />
                </div>
                {currentTheme === "light" && (
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-primary uppercase">Clean Precision Light</h3>
                <p className="font-body-md text-xs text-on-surface-variant mt-1">
                  Crisp neutral surfaces with high-readability typographic contrast.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Live Interface Telemetry Preview */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-tertiary-fixed" />
              Live Theme Preview & Component Tokens
            </h2>
            <span className="text-[11px] font-mono text-on-surface-variant">
              WCAG AA 4.5:1 Compliant
            </span>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 space-y-6">
            {/* Sample Status Chips */}
            <div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                1. Status & Priority Chips (Verified Contrast)
              </p>
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="status-chip status-chip-active">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
                  ACTIVE DIRECTIVE
                </span>
                <span className="status-chip status-chip-complete">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  DEPLOYED STATE
                </span>
                <span className="status-chip status-chip-warning">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  CRITICAL DEFICIT
                </span>
                <span className="status-chip status-chip-pending">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  QUEUED BACKLOG
                </span>
              </div>
            </div>

            {/* Sample Interactive Buttons */}
            <div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                2. Button Actions & Micro-States
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="mandate-btn-primary">
                  Primary Action
                </button>
                <button className="mandate-btn-secondary">
                  Secondary Action
                </button>
                <button className="px-4 py-2 bg-error text-white font-label-caps text-label-caps tracking-widest uppercase rounded-md hover:opacity-90 active:scale-95 transition-all">
                  Terminate Protocol
                </button>
              </div>
            </div>

            {/* Sample Input Field */}
            <div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                3. Input Fields & Form Controls
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  readOnly
                  value="Interactive Mandate Title Preview"
                  className="mandate-input"
                />
                <select className="mandate-input bg-surface-container-lowest">
                  <option>Standard Execution Scope</option>
                  <option>Deep Work Session</option>
                  <option>Autonomous Rule Trigger</option>
                </select>
              </div>
            </div>

            {/* Sample Bento Card */}
            <div>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                4. Bento Container & Telemetry Card
              </p>
              <div className="bento-card p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-tertiary-fixed" />
                    SYSTEM TELEMETRY ENGINE
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                    99.98% OPTIMAL
                  </span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Both dark mode and light mode now adhere to unified semantic variables. All borders, text hierarchies, and focus indicators maintain sharp contrast without clipped corners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ThemeAppearancePage;
