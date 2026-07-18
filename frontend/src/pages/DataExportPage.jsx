import React from "react";
import AppLayout from "../components/AppLayout";

const DataExportPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Operations Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">Data Export</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <button className="bg-primary text-on-primary px-md py-2 rounded-full">Export workspace data</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DataExportPage;
