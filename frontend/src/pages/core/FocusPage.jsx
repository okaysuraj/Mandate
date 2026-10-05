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
    <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary min-h-screen w-full flex flex-col font-body-md relative overflow-y-auto sm:overflow-hidden">
      {/* Top Action Layer */}
      <header className="w-full px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-primary uppercase font-mono">MANDATE</span>
          <div className="px-2.5 py-1 bg-primary text-on-primary rounded-full font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            FOCUS ACTIVE
          </div>
        </div>
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="font-mono text-xs font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group px-3 py-1.5 rounded-lg hover:bg-surface-container cursor-pointer"
          >
            EXIT FOCUS
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        </div>
      </header>

      {/* Background Atmospheric Element */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#888888 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
      </div>

      {/* Main Central Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 py-8 sm:py-12">
        <div className="text-center max-w-xl mx-auto w-full">
          {/* Timer Label */}
          <div className="font-mono text-xs font-bold text-on-surface-variant mb-4 flex justify-center items-center gap-2 uppercase tracking-wider">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
            {task ? task.title : "DEEP WORK SESSION"}
          </div>

          {/* Stark Central Timer */}
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[180px] font-black tracking-tighter leading-none text-primary select-none cursor-pointer hover:opacity-90 transition-opacity font-mono" 
            onClick={() => setIsRunning(!isRunning)}
            title="Click to pause or resume"
          >
            {timerDisplay}
          </h1>

          {/* Commit Action */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button 
              onClick={handleCommit}
              className={`${committed ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary text-on-primary'} font-mono text-xs font-bold px-8 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer uppercase tracking-wider`}
            >
              {committed ? "ACTION RECORDED" : (!isRunning && timeLeft === 25 * 60 ? "START SESSION" : "COMMIT ACTION")}
              <span className="material-symbols-outlined text-base">bolt</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Telemetry Layer */}
      <footer className="w-full px-4 sm:px-8 py-4 sm:py-6 z-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* CPU Load Module */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">CPU LOAD</span>
              <span className="material-symbols-outlined text-on-surface-variant text-base">memory</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl sm:text-2xl font-bold font-mono text-on-surface">12<span className="text-xs font-medium text-on-surface-variant">%</span></span>
              <div className="h-6 flex items-end gap-[3px]">
                <div className="w-1 bg-primary h-[20%] rounded-full"></div>
                <div className="w-1 bg-primary h-[35%] rounded-full"></div>
                <div className="w-1 bg-primary h-[15%] rounded-full"></div>
                <div className="w-1 bg-primary h-[60%] rounded-full"></div>
                <div className="w-1 bg-primary h-[40%] rounded-full"></div>
                <div className="w-1 bg-primary h-[25%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Sessions Module */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">SESSIONS</span>
              <span className="material-symbols-outlined text-on-surface-variant text-base">timer_10_alt_1</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl sm:text-2xl font-bold font-mono text-on-surface">04<span className="text-xs font-medium text-on-surface-variant">/08</span></span>
              <div className="flex gap-1 pb-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-surface-container-high rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-high rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-high rounded-full border border-outline-variant"></div>
                <div className="w-2 h-2 bg-surface-container-high rounded-full border border-outline-variant"></div>
              </div>
            </div>
          </div>

          {/* Streak Module */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">STREAK</span>
              <span className="material-symbols-outlined text-on-surface-variant text-base">local_fire_department</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl sm:text-2xl font-bold font-mono text-on-surface">12<span className="text-xs font-medium text-on-surface-variant"> DAYS</span></span>
              <div className="bg-tertiary-container/60 px-2 py-0.5 rounded-full border border-tertiary/20">
                <span className="font-mono text-[10px] font-bold text-on-tertiary-container">+22% EFFICIENCY</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FocusPage;
