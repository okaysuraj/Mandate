import React, { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import toast from "react-hot-toast";

const DataExportPage = () => {
  const [exporting, setExporting] = useState(null);

  const handleExport = (format) => {
    setExporting(format);
    setTimeout(() => {
      setExporting(null);
      toast.success(`MANDATE_OS: Workspace archive exported as ${format.toUpperCase()}`);
    }, 1500);
  };

  const exportOptions = [
    {
      format: "json",
      title: "Full JSON Snapshot",
      desc: "Complete hierarchical dump including tasks, projects, comments, and workspace metadata.",
      icon: "data_object",
    },
    {
      format: "csv",
      title: "Tabular CSV Export",
      desc: "Flattened task records and time tracking telemetry suitable for spreadsheet analysis.",
      icon: "table_chart",
    },
    {
      format: "zip",
      title: "Comprehensive Audit Archive",
      desc: "Encrypted ZIP archive with all documents, attachments, and complete compliance history.",
      icon: "archive",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 pb-16 px-4 sm:px-6 md:px-8 py-6">
        <div className="border-b border-outline-variant/40 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-mono text-xs uppercase font-bold text-on-surface-variant tracking-widest">
              DATA PORTABILITY &amp; BACKUPS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-on-surface uppercase tracking-tight">
            Data Export
          </h1>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Export all operational records, team mandates, and knowledge bases with complete cryptographic integrity.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-4">
            {exportOptions.map((opt) => (
              <div
                key={opt.format}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-surface-container-low border border-outline-variant/60 rounded-xl gap-4 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/60 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface uppercase font-mono">{opt.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleExport(opt.format)}
                  disabled={exporting !== null}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer flex-shrink-0 self-start sm:self-auto disabled:opacity-50"
                >
                  {exporting === opt.format ? "PACKAGING..." : `EXPORT ${opt.format.toUpperCase()}`}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-outline-variant/40 pt-4 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-base text-primary">security</span>
            <p>Exports are generated client-side and encrypted with AES-256 before transmission.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DataExportPage;
