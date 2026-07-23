import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const shortcuts = [
  { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "Today", path: "/today", icon: "calendar_today" },
  { label: "Projects", path: "/projects", icon: "account_tree" },
  { label: "Automations", path: "/automations", icon: "bolt" },
  { label: "Settings", path: "/settings", icon: "settings" },
  { label: "Billing", path: "/billing", icon: "credit_card" },
];

const CommandPalettePage = () => {
  const [query, setQuery] = useState("");

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <AppLayout>
      <div className="max-w-3xl space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Quick Actions</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Command Palette</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands…"
            className="w-full border border-outline-variant bg-surface p-md text-primary"
          />

          <div className="mt-lg space-y-sm">
            {filteredShortcuts.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between border border-outline-variant p-md hover:bg-surface-container-high transition-colors"
              >
                <span className="font-body-md text-primary">{item.label}</span>
                <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
              </Link>
            ))}
            {filteredShortcuts.length === 0 && <p className="text-label-sm text-on-surface-variant">No matching commands.</p>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CommandPalettePage;
