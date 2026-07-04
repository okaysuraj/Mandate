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
  const totalDuration = 25 * 60;
  const circumference = 1800;

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
  }, [isRunning]);

  // Live clock
  const [clock, setClock] = useState("");
  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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
  const progressOffset = circumference - (timeLeft / totalDuration) * circumference;

  const handleCommit = async () => {
    setCommitted(true);
    try {
      await axios.put(`/api/tasks/${id}`, { status: "completed" });
      toast.success("Task completed!");
    } catch (error) {
      toast.error("Failed to update task");
    }
    setTimeout(() => setCommitted(false), 2000);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="font-body-md text-body-md h-screen w-full flex items-center justify-center bg-surface overflow-hidden relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="scanline"></div>
      </div>

      {/* Subtle texture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-surface-container-high"></div>

      {/* Main Canvas */}
      <main className="relative z-10 w-full max-w-[1440px] px-lg flex flex-col items-center justify-between h-[870px] py-xl">
        {/* Top Status Bar */}
        <header className="w-full flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-md">
            <span className="font-label-caps text-label-caps tracking-widest text-primary">MANDATE // SYSTEM.OS</span>
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            <span className="font-label-caps text-label-caps">{clock}</span>
          </div>
          <div className="flex items-center gap-lg">
            <button
              className="flex items-center gap-xs font-label-caps text-label-caps hover:bg-surface-container transition-colors px-md py-xs rounded-full"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              EXIT FOCUS
            </button>
          </div>
        </header>

        {/* Timer Center */}
        <section className="flex flex-col items-center gap-xl text-center">
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] transform -rotate-90">
              <circle cx="50%" cy="50%" fill="transparent" r="48%" stroke="var(--surface-container)" strokeWidth="1" />
              <circle
                className="progress-circle"
                cx="50%" cy="50%"
                fill="transparent"
                r="48%"
                stroke="var(--primary)"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <div className="flex flex-col items-center">
              <div className="font-display-lg text-[80px] md:text-[140px] lg:text-[220px] font-extrabold tracking-tighter leading-none timer-glow select-none">
                {timerDisplay}
              </div>
              <div className="mt-xs font-label-caps text-label-caps tracking-[0.4em] text-primary opacity-60">
                {isRunning ? "SESSION IN PROGRESS" : "PRESS TO START"}
              </div>
            </div>
          </div>

          {/* Active Task Name */}
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-center gap-md">
              <span className="w-12 h-[1px] bg-outline"></span>
              <h1 className="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase">Operating</h1>
              <span className="w-12 h-[1px] bg-outline"></span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-black tracking-tight uppercase">
              {task?.title || "CORE SYNTHESIS"}
            </h2>
          </div>
        </section>

        {/* Bottom Actions */}
        <footer className="w-full flex flex-col items-center gap-lg">
          <div className="flex gap-xl opacity-40">
            <div className="flex flex-col items-center gap-xs">
              <span className="font-label-sm text-label-sm">CPU LOAD</span>
              <span className="font-label-caps text-label-caps">12%</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <span className="font-label-sm text-label-sm">SESSIONS</span>
              <span className="font-label-caps text-label-caps">04/08</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <span className="font-label-sm text-label-sm">STREAK</span>
              <span className="font-label-caps text-label-caps">12D</span>
            </div>
          </div>

          <div className="flex gap-md">
            {/* Start/Pause Button */}
            <button
              onClick={handleStartPause}
              className="relative overflow-hidden bg-surface-container-high text-primary font-label-caps text-label-caps px-xl py-md rounded-full tracking-[0.15em] hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-outline-variant"
            >
              {isRunning ? "PAUSE" : "START TIMER"}
            </button>

            {/* Commit Button */}
            <div className="relative group">
              <div className="absolute -inset-4 border border-outline rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100"></div>
              <button
                onClick={handleCommit}
                className={`relative overflow-hidden font-label-caps text-label-caps px-[64px] py-xl rounded-full tracking-[0.25em] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl ${
                  committed
                    ? "bg-on-tertiary-container text-on-tertiary"
                    : "bg-primary text-on-primary"
                }`}
              >
                <span className="relative z-10">{committed ? "PROCESSED" : "COMMIT ACTION"}</span>
                {/* Shine effect */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[150%]"></div>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FocusPage;
