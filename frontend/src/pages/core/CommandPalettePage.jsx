import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const shortcuts = [
  { label: "Dashboard Overview", path: "/dashboard", icon: "dashboard", category: "Navigation", hotkey: "G D" },
  { label: "Today's Mandates", path: "/today", icon: "calendar_today", category: "Execution", hotkey: "G T" },
  { label: "Projects Matrix", path: "/projects", icon: "account_tree", category: "Planning", hotkey: "G P" },
  { label: "Autonomous Rules", path: "/automations", icon: "bolt", category: "Intelligence", hotkey: "G A" },
  { label: "Deep Work Focus Session", path: "/focus", icon: "lock", category: "Execution", hotkey: "G F" },
  { label: "Team Workspace Roster", path: "/workspace", icon: "groups", category: "Collaboration", hotkey: "G W" },
  { label: "Strategic Goals", path: "/goals", icon: "flag", category: "Strategy", hotkey: "G G" },
  { label: "Workspace Settings", path: "/settings", icon: "settings", category: "System", hotkey: "G S" },
  { label: "Subscription & Billing", path: "/billing", icon: "credit_card", category: "System", hotkey: "G B" },
];

const CommandPalettePage = () => {
  const [query, setQuery] = useState("");

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((item) => 
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              QUICK COMMANDS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Command Center
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Rapidly jump across workspaces, initialize workflows, and trigger autonomous procedures.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
              terminal
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands, destinations, protocols..."
              className="w-full bg-surface-container-low border border-outline-variant pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-on-surface outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
              autoFocus
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase font-bold text-on-surface-variant/80 px-2 pb-1">
              <span>ACTION</span>
              <span>SHORTCUT</span>
            </div>

            {filteredShortcuts.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/60 hover:border-primary/50 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-on-surface block leading-tight">{item.label}</span>
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant">{item.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase font-bold bg-surface-container-high text-on-surface-variant px-2 py-1 rounded border border-outline-variant">
                    {item.hotkey}
                  </kbd>
                  <span className="material-symbols-outlined text-on-surface-variant text-base group-hover:translate-x-0.5 transition-transform">
                    chevron_right
                  </span>
                </div>
              </Link>
            ))}

            {filteredShortcuts.length === 0 && (
              <div className="py-8 text-center text-on-surface-variant font-mono text-xs">
                NO COMMANDS MATCHING "{query}"
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CommandPalettePage;
