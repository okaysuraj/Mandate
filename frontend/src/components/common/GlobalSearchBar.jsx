import {useAuth} from '../../context/AuthContext';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../../lib/axios";

const GlobalSearchBar = () => {
  const {user}=useAuth();const userId=user?._id;
  const [error,setError]=useState('');
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
    setError('');setResults({tasks:[],projects:[],goals:[],documents:[],pages:[]});
    if (!query.trim()||!userId) {
      setResults({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setLoading(true);
    const controller=new AbortController();
    const timer = setTimeout(async () => {
      try {
        const { data } = await api.get("/search", { params: { q: query }, signal:controller.signal });
        if(controller.signal.aborted)return;
        setResults(data);
        setSelectedIndex(-1);
      } catch (error) {
        if(!controller.signal.aborted)setError(error.response?.data?.message||'Search failed');
      } finally {
        if(!controller.signal.aborted)setLoading(false);
      }
    }, 200);

    return () => {clearTimeout(timer);controller.abort();};
  }, [query,userId]);

  // Flatten results for keyboard arrow navigation
  const getFlatResults = () => {
    const flat = [];
    if (results.tasks?.length) {
      results.tasks.forEach((t) => flat.push({ ...t, type: "task", url: `/tasks/${t._id}`, label: t.title }));
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
    { label: "Temporal Calendar", path: "/calendar", icon: "calendar_today" },
    { label: "Project Fleet", path: "/projects", icon: "account_tree" },
  ];

  return (
    <div className="relative flex-1 max-w-xl mx-2 md:mx-4" ref={searchRef}>
      {error&&<p role="alert">{error}</p>}{/* Search Input Container */}
      <div className="relative flex items-center bg-surface-container-lowest px-3.5 py-2 rounded-xl border border-outline-variant hover:border-primary/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs">
        <span className="material-symbols-outlined text-on-surface-variant text-[18px] flex-shrink-0">search</span>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none focus:ring-0 font-body-md text-xs md:text-sm ml-2 w-full outline-none placeholder:text-on-surface-variant/60 text-on-surface"
          placeholder="Global Directive Search (Tasks, Projects, Files)..."
          type="text"
        />

        {loading && (
          <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin ml-1 flex-shrink-0"></div>
        )}

        {query && !loading && (
          <button
            onClick={() => {
              setQuery("");
              setResults({ tasks: [], projects: [], goals: [], documents: [], pages: [] });
            }}
            className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
          </button>
        )}
      </div>

      {/* Results Dropdown Overlay */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[420px] flex flex-col">
          {/* Default Quick Shortcuts when query is empty */}
          {!query.trim() && (
            <div className="p-3">
              <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold px-1">
                Quick Directive Access
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {quickLinks.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(item.path);
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-surface-container text-left text-on-surface-variant hover:text-primary transition-all cursor-pointer border border-transparent hover:border-outline-variant/50"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">{item.icon}</span>
                    <span className="font-mono text-xs font-semibold uppercase">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Query Results */}
          {query.trim() && !loading && !hasResults && (
            <div className="py-8 px-4 text-center text-on-surface-variant font-mono text-xs">
              No matching directives, projects, or nodes found for "<span className="text-primary font-bold">{query}</span>"
            </div>
          )}

          {query.trim() && hasResults && (
            <div className="overflow-y-auto p-2 space-y-3 custom-scrollbar">
              {/* Pages Section */}
              {results.pages?.length > 0 && (
                <div>
                  <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider px-2 py-1 font-bold">
                    Navigation Nodes
                  </div>
                  {results.pages.map((p) => {
                    const currentIndex = flatList.findIndex((item) => item.path === p.path && item.type === "page");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={p.path}
                        onClick={() => handleSelect({ ...p, url: p.path })}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all border border-transparent ${
                          isSelected ? "bg-primary text-on-primary font-bold shadow-xs" : "hover:bg-surface-container text-on-surface"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
                        <span className="font-mono text-xs uppercase">{p.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tasks Section */}
              {results.tasks?.length > 0 && (
                <div>
                  <div className="font-mono text-[10px] text-primary uppercase tracking-wider px-2 py-1 font-bold flex justify-between">
                    <span>Directives &amp; Tasks</span>
                    <span className="font-mono text-[9px] text-on-surface-variant">{results.tasks.length} found</span>
                  </div>
                  {results.tasks.map((t) => {
                    const currentIndex = flatList.findIndex((item) => item._id === t._id && item.type === "task");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={t._id}
                        onClick={() => handleSelect({ ...t, url: `/focus/${t._id}` })}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all border border-transparent ${
                          isSelected ? "bg-primary text-on-primary font-bold shadow-xs" : "hover:bg-surface-container text-on-surface"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">check_box_outline_blank</span>
                          <span className="text-xs truncate font-medium">{t.title}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className={`px-2 py-0.5 text-[9px] font-mono uppercase rounded-full border ${
                            t.priority === 'urgent' ? 'border-error text-error bg-error/10 font-bold' : 'border-outline-variant text-on-surface-variant'
                          }`}>
                            {t.priority || 'Routine'}
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
                  <div className="font-mono text-[10px] text-primary uppercase tracking-wider px-2 py-1 font-bold flex justify-between">
                    <span>Projects &amp; Fleets</span>
                    <span className="font-mono text-[9px] text-on-surface-variant">{results.projects.length} found</span>
                  </div>
                  {results.projects.map((proj) => {
                    const currentIndex = flatList.findIndex((item) => item._id === proj._id && item.type === "project");
                    const isSelected = selectedIndex === currentIndex;
                    return (
                      <div
                        key={proj._id}
                        onClick={() => handleSelect({ ...proj, url: `/projects` })}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all border border-transparent ${
                          isSelected ? "bg-primary text-on-primary font-bold shadow-xs" : "hover:bg-surface-container text-on-surface"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">account_tree</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-xs uppercase truncate font-bold">{proj.name}</p>
                          <p className="font-mono text-[10px] text-on-surface-variant truncate">{proj.description || "Project Workspace"}</p>
                        </div>
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
