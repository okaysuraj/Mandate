import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";

const GlobalSearchPage = () => {
  const [query, setQuery] = useState("");

  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Knowledge Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Global Search</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks, goals, docs…"
            className="w-full border border-outline-variant bg-surface p-md"
          />
          <div className="mt-md space-y-sm">
            {query ? (
              ['Project launch', 'Support handoff', 'Design critique'].filter((item) => item.toLowerCase().includes(query.toLowerCase())).map((item) => (
                <div key={item} className="border border-outline-variant p-md">{item}</div>
              ))
            ) : (
              <p className="text-on-surface-variant">Enter a search term to see relevant matches.</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GlobalSearchPage;
