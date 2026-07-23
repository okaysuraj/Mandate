import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const PeopleDirectoryPage = () => {
  return (
    <AppLayout>
      <div className="space-y-lg">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">People Layer</p>
          <h1 className="font-headline-lg text-headline-lg text-primary">People Directory</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-lg">
          <div className="space-y-sm">
            {['Ava Chen — Product', 'Michael Ortiz — Engineering', 'Nina Patel — Operations'].map((item) => (
              <div key={item} className="border border-outline-variant p-md">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PeopleDirectoryPage;
