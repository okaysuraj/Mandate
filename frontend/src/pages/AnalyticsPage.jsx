import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AnalyticsPage = () => {
  return (
    <div className="font-body-md text-body-md flex flex-col min-h-screen bg-surface">
      {/* TopNavBar */}
      <Navbar variant="landing" />

      <main className="mt-24 px-lg py-xl flex-grow container mx-auto max-w-[1440px]">
        {/* Page Header */}
        <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant block mb-unit uppercase tracking-widest">Global Analytics Cluster</span>
            <h1 className="font-headline-lg text-headline-lg text-primary">Industrial Review Dashboard</h1>
          </div>
          <div className="flex gap-sm">
            <button className="bg-primary text-on-primary px-lg py-sm rounded-full font-label-caps text-label-caps hover:opacity-80 transition-opacity">Export Data</button>
            <button className="border border-outline-variant text-on-surface-variant px-lg py-sm rounded-full font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">Configuration</button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Key Metric */}
          <div className="bento-card col-span-12 md:col-span-4 flex flex-col justify-between p-lg !rounded-none">
            <div>
              <div className="flex justify-between items-start mb-lg">
                <span className="font-label-caps text-label-caps text-on-surface-variant">System Efficiency</span>
                <span className="status-chip bg-tertiary-fixed text-on-tertiary-fixed px-sm py-xs text-[10px]">Stable</span>
              </div>
              <div className="font-display-lg text-display-lg leading-none mb-xs">89.4%</div>
              <div className="font-label-caps text-label-caps text-primary tracking-widest">NOMINAL</div>
            </div>
            <div className="mt-lg pt-md border-t border-surface-container">
              <span className="text-label-sm font-label-sm text-on-surface-variant">+2.4% from last epoch</span>
            </div>
          </div>

          {/* Throughput Chart */}
          <div className="bento-card col-span-12 md:col-span-8 p-lg !rounded-none">
            <div className="flex justify-between items-center mb-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant">System Throughput (24H)</span>
              <div className="flex gap-sm items-center">
                <div className="w-3 h-3 bg-primary"></div>
                <span className="font-label-sm text-label-sm">Primary Node</span>
              </div>
            </div>
            <div className="h-48 w-full relative flex items-end justify-between overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--surface-container)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect fill="url(#grid)" width="800" height="200" />
                <path
                  className="chart-line"
                  d="M0,150 Q50,130 100,140 T200,100 T300,120 T400,60 T500,80 T600,40 T700,50 L800,20"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="flex justify-between mt-md font-label-sm text-label-sm text-on-surface-variant">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
            </div>
          </div>

          {/* Heatmap */}
          <div className="bento-card col-span-12 md:col-span-7 p-lg !rounded-none">
            <span className="font-label-caps text-label-caps text-on-surface-variant block mb-lg">Network Latency Heatmap</span>
            <div className="grid grid-cols-12 gap-1 h-40">
              {[10,20,40,10,60,10,10,20,30,80,10,10,5,10,15,5,10,90,10,5,5,10,5,10,10,10,10,5,10,5,10,100,10,10,10,10,10,40,10,10,20,10,10,10,30,10,10,10].map((opacity, i) => (
                <div key={i} className="bg-primary" style={{ opacity: opacity / 100 }}></div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-md">
              <div className="flex items-center gap-sm">
                <span className="text-label-sm font-label-sm text-on-surface-variant">Low Latency</span>
                <div className="flex gap-px">
                  <div className="w-2 h-2 bg-primary opacity-10"></div>
                  <div className="w-2 h-2 bg-primary opacity-40"></div>
                  <div className="w-2 h-2 bg-primary opacity-70"></div>
                  <div className="w-2 h-2 bg-primary"></div>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Critical Delay</span>
              </div>
            </div>
          </div>

          {/* Node Performance */}
          <div className="bento-card col-span-12 md:col-span-5 p-lg !rounded-none">
            <span className="font-label-caps text-label-caps text-on-surface-variant block mb-lg">Node Performance Index</span>
            <div className="space-y-md">
              {[
                { name: "Node Alpha-9", value: 92 },
                { name: "Node Beta-2", value: 84 },
                { name: "Node Gamma-5", value: 98 },
              ].map(node => (
                <div key={node.name} className="space-y-xs">
                  <div className="flex justify-between text-label-sm font-label-sm">
                    <span>{node.name}</span>
                    <span>{node.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${node.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Feed */}
          <div className="bento-card col-span-12 md:col-span-6 overflow-hidden relative group p-lg !rounded-none min-h-[200px]">
            <div className="absolute inset-0 bg-surface-container-high opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Asset Visual Feed</span>
                <h3 className="font-headline-lg text-headline-lg mt-sm">Cluster 014</h3>
              </div>
              <div className="mt-xl">
                <span className="status-chip bg-primary text-on-primary text-[10px]">Live Monitoring</span>
                <div className="mt-sm flex items-center gap-xs text-label-sm font-label-sm">
                  <span className="material-symbols-outlined text-[14px]">videocam</span>
                  <span>Primary Camera Array Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bento-card col-span-12 md:col-span-6 flex flex-col p-lg !rounded-none">
            <div className="flex justify-between items-center mb-lg">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Anomalous Activity Log</span>
              <button className="text-label-sm font-label-sm text-primary underline">View Full History</button>
            </div>
            <div className="flex-grow space-y-px">
              {[
                { id: "#TX-9041", text: "Voltage Spike Detected", time: "14:22:01", isError: false },
                { id: "#TX-9039", text: "Cache Re-initialization", time: "14:18:55", isError: false },
                { id: "#TX-9035", text: "Critical Handshake Error", time: "14:05:12", isError: true },
                { id: "#TX-9031", text: "Maintenance Routine Start", time: "13:59:44", isError: false },
              ].map(item => (
                <div key={item.id} className="flex justify-between py-sm border-b border-surface-container-low hover:bg-surface-container-low px-sm -mx-sm transition-colors cursor-pointer">
                  <span className={`text-label-sm font-label-sm ${item.isError ? "text-error" : ""}`}>
                    {item.id}: {item.text}
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalyticsPage;
