import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Link } from "react-router";

const EndOfDayReviewPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              REFLECTION &amp; SYNTHESIS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            End of Day Review
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Reconcile daily mandates, review completed actions, and queue unresolved items for tomorrow.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <h2 className="text-sm font-bold text-on-surface uppercase font-mono tracking-wider">
              DAILY EXECUTION SUMMARY
            </h2>
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
              CYCLE COMPLETE
            </span>
          </div>

          <div className="space-y-3">
            {[
              "Completed 5 high-impact strategic directives",
              "Mitigated 2 blocker dependencies requiring cross-pod alignment",
              "Achieved 100% adherence to scheduled deep work focus blocks",
              "Synthesized end-of-day handoff logs for overseas teammates",
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl flex items-center justify-between text-sm font-medium text-on-surface"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>{item}</span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant/70">
                  RECORDED
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/today"
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xs"
            >
              PREPARE TOMORROW'S QUEUE
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EndOfDayReviewPage;
