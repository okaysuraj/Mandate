import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const KeyboardShortcutsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Productivity Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Keyboard Shortcuts</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Ctrl/Cmd + K — Command palette', 'Ctrl/Cmd + N — New task', 'Ctrl/Cmd + / — Show shortcuts'].map((shortcut) => (
              <div key={shortcut} className="border border-outline-variant p-md">{shortcut}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default KeyboardShortcutsPage;
