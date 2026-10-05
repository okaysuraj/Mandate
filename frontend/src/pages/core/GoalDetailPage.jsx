import React from "react";
import { useParams, useNavigate } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const GoalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              <p className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold">
                STRATEGIC DETAIL · OBJECTIVE TELEMETRY
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface uppercase tracking-tight">Goal Overview</h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 font-mono">OBJECTIVE REF: #{id}</p>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1.5 px-4 py-2 border border-outline-variant rounded-lg text-xs font-mono font-bold uppercase text-on-surface hover:bg-surface-container transition-colors cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to goals
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <h2 className="text-base font-bold font-mono uppercase tracking-wider text-on-surface">Target Milestones</h2>
            <span className="text-xs font-mono text-tertiary font-bold">IN PROGRESS</span>
          </div>
          <div className="space-y-2.5">
            {['Set up success metrics & KPI tracking', 'Align team owners & operational leads', 'Review quarterly progress and cadence'].map((item, idx) => (
              <div key={item} className="flex items-center gap-3 p-3.5 rounded-lg border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors">
                <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer" />
                <span className="text-xs font-mono text-on-surface flex-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GoalDetailPage;
