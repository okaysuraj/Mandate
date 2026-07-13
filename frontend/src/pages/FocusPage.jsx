import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const FocusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [committed, setCommitted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${id}`);
        setTask(data.data || data);
      } catch (error) {
        toast.error("Task not found");
      }
    };
    if (id) fetchTask();
  }, [id]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleCommit = async () => {
    if (!isRunning && timeLeft === 25 * 60) {
      setIsRunning(true);
      return;
    }
    
    setCommitted(true);
    try {
      await axios.put(`/api/tasks/${id}`, { status: "completed" });
      toast.success("Action Recorded");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      toast.error("Failed to commit task");
      setCommitted(false);
    }
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary overflow-hidden h-screen w-screen flex flex-col font-body-md relative">
      {/* Top Action Layer */}
      <header className="fixed top-0 left-0 w-full px-xl py-lg flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-md pointer-events-auto">
          <span className="font-headline-lg text-headline-lg font-black tracking-tighter text-primary uppercase">MANDATE</span>
          <div className="px-sm py-xs bg-primary text-on-primary rounded-none font-label-caps text-[9px] flex items-center gap-xs">
            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            FOCUS ACTIVE
          </div>
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => navigate(-1)} className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs group">
            EXIT FOCUS
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </header>

      {/* Background Atmospheric Element */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#D9DADC 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
      </div>

      {/* Main Central Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-gutter">
        <div className="text-center">
          {/* Timer Label */}
          <div className="font-label-caps text-label-caps text-on-surface-variant mb-md flex justify-center items-center gap-sm uppercase">
            <span className="w-2 h-2 bg-tertiary-fixed-dim rounded-full animate-status"></span>
            {task ? task.title : "DEEP WORK SESSION"}
          </div>

          {/* Stark Central Timer */}
          <h1 className="font-display-lg text-[180px] md:text-[240px] font-black tracking-[-0.06em] leading-none text-primary timer-glow select-none cursor-pointer" onClick={() => setIsRunning(!isRunning)}>
            {timerDisplay}
          </h1>

          {/* Commit Action */}
          <div className="mt-xl">
            <button 
              onClick={handleCommit}
              className={`${committed ? 'bg-on-tertiary-container text-on-tertiary' : 'bg-primary text-on-primary'} font-label-caps text-label-caps px-xl py-md rounded-full hover:scale-105 active:scale-95 transition-all shadow-none flex items-center gap-sm mx-auto group`}
            >
              {committed ? "ACTION RECORDED" : (!isRunning && timeLeft === 25 * 60 ? "START SESSION" : "COMMIT ACTION")}
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">bolt</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Telemetry Layer */}
      <footer className="fixed bottom-0 left-0 w-full px-xl py-xl z-50">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* CPU Load Module */}
          <div className="bg-surface-container-lowest border border-surface-variant transition-all p-lg flex flex-col justify-between">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">CPU LOAD</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">memory</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg font-bold">12<span className="text-body-md font-medium text-on-surface-variant">%</span></span>
              <div className="h-8 flex items-end gap-[2px]">
                <div className="w-1 bg-primary h-[20%]"></div>
                <div className="w-1 bg-primary h-[35%]"></div>
                <div className="w-1 bg-primary h-[15%]"></div>
                <div className="w-1 bg-primary h-[60%]"></div>
                <div className="w-1 bg-primary h-[40%]"></div>
                <div className="w-1 bg-primary h-[25%]"></div>
              </div>
            </div>
          </div>

          {/* Sessions Module */}
          <div className="bg-surface-container-lowest border border-surface-variant transition-all p-lg flex flex-col justify-between">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">SESSIONS</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">timer_10_alt_1</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg font-bold">04<span className="text-body-md font-medium text-on-surface-variant">/08</span></span>
              <div className="flex gap-xs pb-xs">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-surface-container-highest rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-highest rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-highest rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-highest rounded-full border border-outline-variant"></div>
              </div>
            </div>
          </div>

          {/* Streak Module */}
          <div className="bg-surface-container-lowest border border-surface-variant transition-all p-lg flex flex-col justify-between">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">STREAK</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">local_fire_department</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg font-bold">12<span className="text-body-md font-medium text-on-surface-variant"> DAYS</span></span>
              <div className="bg-tertiary-fixed-dim/10 px-sm py-[2px] rounded-full border border-tertiary-fixed-dim/30">
                <span className="font-label-caps text-[9px] text-on-tertiary-container">+22% EFFICIENCY</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FocusPage;
