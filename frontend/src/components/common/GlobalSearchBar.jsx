import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../../lib/axios";

const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced real-time search request
  useEffect(() => {
    if (!query.trim()) {
      setResults({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const { data } = await api.get("/search", { params: { q: query } });
        setResults(data);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Flatten results for keyboard arrow navigation
  const getFlatResults = () => {
    const flat = [];
    if (results.tasks?.length) {
      results.tasks.forEach((t) => flat.push({ ...t, type: "task", url: `/focus/${t._id}`, label: t.title }));
    }
    if (results.projects?.length) {
      results.projects.forEach((p) => flat.push({ ...p, type: "project", url: `/projects/${p._id}`, label: p.name }));
    }
    if (results.goals?.length) {
      results.goals.forEach((g) => flat.push({ ...g, type: "goal", url: "/goals", label: g.title }));
    }
    if (results.documents?.length) {
      results.documents.forEach((d) => flat.push({ ...d, type: "document", url: "/docs", label: d.title }));
    }
    if (results.pages?.length) {
      results.pages.forEach((p) => flat.push({ ...p, type: "page", url: p.path, label: p.label }));
    }
    return flat;
  };

  const flatList = getFlatResults();
  const hasResults = flatList.length > 0;

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatList.length) {
        handleSelect(flatList[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery("");
    navigate(item.url || item.path);
  };

  const quickLinks = [
    { label: "Today's Mandates", path: "/today", icon: "event_upcoming" },
    { label: "Kanban Board", path: "/kanban", icon: "view_kanban" },
    { label: "Project Fleet", path: "/projects", icon: "account_tree" },
    { label: "Analytics & Metrics", path: "/analytics", icon: "analytics" },
  ];

  return (
    <div className="relative flex-1 max-w-[50%] w-1/2 mx-md" ref={searchRef}>
      {/* Search Input Container */}
      <div className="relative flex items-center bg-surface-container-low px-md py-sm rounded-full border border-transparent focus-within:border-primary/50 transition-all">
        <span className="material-symbols-outlined text-outline text-[18px] flex-shrink-0">search</span>
        
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none focus:ring-0 font-label-sm text-sm ml-sm w-full outline-none placeholder:text-outline text-on-surface"
          placeholder="Global Search tasks, projects, goals..."
          type="text"
        />

        {loading && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-xs"></div>
        )}

        {query && !loading && (
          <button
            onClick={() => {
              setQuery("");
              setResults({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
            }}
            className="p-xs text-outline hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Results Dropdown Overlay */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-xs bg-surface border border-outline-variant rounded-md shadow-2xl overflow-hidden z-50 max-h-[420px] flex flex-col">
          {/* Default Quick Shortcuts when query is empty */}
          {!query.trim() && (
            <div className="p-md">
              <div className="font-label-caps text-[10px] text-outline uppercase tracking-wider mb-sm font-bold">
                Quick Navigation Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-xs">
                {quickLinks.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(item.path);
                    }}
                    className="flex items-center gap-sm p-sm rounded-sm hover:bg-surface-container-low text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">{item.icon}</span>
                    <span className="font-label-caps text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Query Results */}
          {query.trim() && !loading && !hasResults && (
            <div className="py-xl px-lg text-center text-on-surface-variant font-label-caps text-xs">
              No matching mandates, projects, or pages found for "<span className="text-primary font-bold">{query}</span>"
            </div>
          )}

          {query.trim() && hasResults && (
            <div className="overflow-y-auto p-xs space-y-md scrollbar-thin">
              {/* Pages Section */}
              {results.pages?.length > 0 && (
                <div>
                  <div className="font-label-caps text-[10px] text-outline uppercase tracking-wider px-sm py-xs font-bold">
                    Navigation Pages
                  </div>
                  {results.pages.map((p) => {
                    const currentIndex = flatList.findIndex((item) => item.path === p.path && item.type === "page");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={p.path}
                        onClick={() => handleSelect({ ...p, url: p.path })}
                        className={`flex items-center gap-md px-md py-sm rounded-sm cursor-pointer transition-all ${
                          isSelected ? "bg-primary text-on-primary font-bold" : "hover:bg-surface-container-low text-on-surface"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
                        <span className="font-label-caps text-xs uppercase">{p.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tasks Section */}
              {results.tasks?.length > 0 && (
                <div>
                  <div className="font-label-caps text-[10px] text-primary uppercase tracking-wider px-sm py-xs font-bold flex justify-between">
                    <span>Tasks & Mandates</span>
                    <span className="text-[9px] text-outline">{results.tasks.length} found</span>
                  </div>
                  {results.tasks.map((t) => {
                    const currentIndex = flatList.findIndex((item) => item._id === t._id && item.type === "task");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={t._id}
                        onClick={() => handleSelect({ ...t, url: `/focus/${t._id}` })}
                        className={`flex items-center justify-between px-md py-sm rounded-sm cursor-pointer transition-all ${
                          isSelected ? "bg-primary text-on-primary font-bold" : "hover:bg-surface-container-low text-on-surface"
                        }`}
                      >
                        <div className="flex items-center gap-sm min-w-0 pr-sm">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span className="font-body-md text-xs truncate">{t.title}</span>
                        </div>
                        <div className="flex items-center gap-xs flex-shrink-0">
                          <span className={`px-xs py-0.5 text-[9px] font-label-caps uppercase rounded-xs ${
                            t.priority === 'urgent' ? 'bg-error-container text-on-error-container font-bold' : 'bg-surface-variant text-on-surface-variant'
                          }`}>
                            {t.priority || 'Normal'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Projects Section */}
              {results.projects?.length > 0 && (
                <div>
                  <div className="font-label-caps text-[10px] text-primary uppercase tracking-wider px-sm py-xs font-bold flex justify-between">
                    <span>Projects</span>
                    <span className="text-[9px] text-outline">{results.projects.length} found</span>
                  </div>
                  {results.projects.map((proj) => {
                    const currentIndex = flatList.findIndex((item) => item._id === proj._id && item.type === "project");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={proj._id}
                        onClick={() => handleSelect({ ...proj, url: `/projects` })}
                        className={`flex items-center gap-md px-md py-sm rounded-sm cursor-pointer transition-all ${
                          isSelected ? "bg-primary text-on-primary font-bold" : "hover:bg-surface-container-low text-on-surface"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">account_tree</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-label-caps text-xs uppercase truncate">{proj.name}</p>
                          <p className="text-[10px] text-outline truncate">{proj.description || "Project Workspace"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Goals Section */}
              {results.goals?.length > 0 && (
                <div>
                  <div className="font-label-caps text-[10px] text-primary uppercase tracking-wider px-sm py-xs font-bold">
                    Goals & Key Results
                  </div>
                  {results.goals.map((g) => {
                    const currentIndex = flatList.findIndex((item) => item._id === g._id && item.type === "goal");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={g._id}
                        onClick={() => handleSelect({ ...g, url: `/goals` })}
                        className={`flex items-center gap-md px-md py-sm rounded-sm cursor-pointer transition-all ${
                          isSelected ? "bg-primary text-on-primary font-bold" : "hover:bg-surface-container-low text-on-surface"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">flag</span>
                        <span className="font-body-md text-xs truncate">{g.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
