import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const SAMPLE_ENTITIES = [
  { id: "1", title: "Project Launch & Deployment Pipeline", type: "PROJECT", path: "/projects", meta: "High Priority · Due Oct 15" },
  { id: "2", title: "Support Handoff Protocol & SLA", type: "DOCUMENT", path: "/docs", meta: "Updated 2 days ago" },
  { id: "3", title: "Design System Contrast Audit", type: "TASK", path: "/today", meta: "In Progress · Elena Rostova" },
  { id: "4", title: "Core WebSocket Gateway Integration", type: "INTELLIGENCE", path: "/automations", meta: "Active Rule" },
  { id: "5", title: "Enterprise Billing Migration", type: "SETTINGS", path: "/billing", meta: "Stripe Tier: Pro" },
];

const GlobalSearchPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredItems = SAMPLE_ENTITIES.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || item.meta.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "ALL" || item.type === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              KNOWLEDGE &amp; INDEXING
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Global Search
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Universal query index across tasks, documentation, automations, and projects.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
              search
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Query mandates, documentation, projects..."
              className="w-full bg-surface-container-low border border-outline-variant pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-on-surface outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
              autoFocus
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["ALL", "TASK", "PROJECT", "DOCUMENT", "INTELLIGENCE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer uppercase ${
                  filter === cat
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="space-y-3 pt-2">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/60 hover:border-primary/50 rounded-xl transition-all group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      {item.type}
                    </span>
                    <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono">{item.meta}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                  arrow_forward
                </span>
              </Link>
            ))}

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl mb-2 text-on-surface-variant/40 block">search_off</span>
                <p className="font-mono text-xs uppercase">No matching entities found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GlobalSearchPage;
