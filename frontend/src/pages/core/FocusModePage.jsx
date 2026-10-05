import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const FocusModePage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              ATTENTION PROTOCOL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Focus Mode
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            A distraction-light workspace designed for deep work with time-boxed intervals and priority cues.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-on-surface uppercase font-mono">FLOW STATE SHIELD</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Mutes ambient notifications, hides secondary navigation, and locks in active directive.</p>
            </div>
            <Link
              to="/focus"
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md self-start sm:self-auto text-center"
            >
              LAUNCH FULL-SCREEN FOCUS
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FocusModePage;
