import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const bentoRef = useRef(null);

  useEffect(() => {
    // Scroll reveal for bento grid items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bentoRef.current) {
      bentoRef.current.querySelectorAll('.bento-item').forEach((el) => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md text-body-md antialiased overflow-x-hidden">
      <Navbar variant="landing" />

      <main className="pt-[64px]">
        {/* ── Hero Section ── */}
        <section className="relative py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 bg-surface-container-lowest border-b border-outline-variant/40">
          <div className="max-w-5xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[11px] font-bold text-primary uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              NEXT-GEN TASK &amp; WORKSPACE SYSTEM
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-on-surface mb-6 tracking-tighter uppercase leading-[0.95]">
              FOCUS.<br />EXECUTE.<br /><span className="text-primary">MANDATE.</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-8 font-medium">
              The high-velocity task management and enterprise workspace platform. Organize your commitments, orchestrate team workflows, and command daily execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md text-center cursor-pointer"
              >
                {user ? "GO TO DASHBOARD" : "GET STARTED FREE"}
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest transition-all text-center cursor-pointer"
              >
                EXPLORE PLANS
              </Link>
            </div>
          </div>
        </section>

        {/* ── Bento Grid Features ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto" ref={bentoRef}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase font-bold text-primary tracking-widest block mb-2">SYSTEM CAPABILITIES</span>
            <h2 className="text-2xl sm:text-4xl font-black text-on-surface uppercase tracking-tight">ENGINEERED FOR PEAK VELOCITY</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1: Real-Time Sync */}
            <div className="bento-item md:col-span-8 bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-3xl flex flex-col justify-between overflow-hidden group shadow-sm hover:border-primary/50 transition-all duration-300">
              <div className="relative h-56 sm:h-64 mb-6 overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[80px] sm:text-[100px] text-primary/30 group-hover:scale-110 transition-transform duration-500">
                  sync
                </span>
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-primary uppercase mb-2">FEATURE 01</div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">Real-Time Task Sync &amp; WebSockets</h3>
                <p className="text-on-surface-variant text-sm sm:text-base max-w-xl">
                  Instant bi-directional state synchronization across mobile, web, and active team members. Never miss a status pivot, blocker notification, or priority shift.
                </p>
              </div>
            </div>

            {/* Feature 2: Clean UI */}
            <div className="bento-item md:col-span-4 bg-surface-container-low border border-outline-variant/60 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group shadow-sm hover:border-primary/50 transition-all duration-300">
              <div>
                <div className="font-mono text-xs font-bold text-on-surface-variant uppercase mb-2">FEATURE 02</div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">Minimal High-Contrast UI</h3>
              </div>
              <div className="my-8 flex justify-center">
                <div className="w-full aspect-square border border-primary/20 rounded-full flex items-center justify-center p-6 relative max-w-[180px] bg-surface-container-lowest shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] border border-primary/30 rounded-full animate-spin-slow"></div>
                  </div>
                  <span className="material-symbols-outlined text-5xl text-primary">task_alt</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm">
                Distraction-free interface designed to help you organize daily tasks, set priorities, and get things done with zero cognitive clutter.
              </p>
            </div>

            {/* Feature 3: Kanban & Calendar */}
            <div className="bento-item md:col-span-4 bg-surface-container-lowest border border-outline-variant/60 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group shadow-sm hover:border-primary/50 transition-all duration-300">
              <div className="mb-6">
                <div className="font-mono text-xs font-bold text-on-surface-variant uppercase mb-2">FEATURE 03</div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">Kanban, Matrix &amp; Calendar</h3>
              </div>
              <div className="h-44 sm:h-48 bg-surface-container-low rounded-2xl mb-6 overflow-hidden border border-outline-variant/40 flex items-center justify-center group-hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-6xl text-primary/30 group-hover:scale-110 transition-transform duration-500">
                  calendar_view_month
                </span>
              </div>
              <p className="text-on-surface-variant text-sm">
                Switch effortlessly between Today's action queue, multi-column Kanban boards, and timeline calendar schedules.
              </p>
            </div>

            {/* Feature 4: Team Workspaces */}
            <div className="bento-item md:col-span-8 bg-surface-container-low border border-outline-variant/60 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all duration-300">
              <div className="relative z-10 flex-1">
                <div className="font-mono text-xs font-bold text-primary uppercase mb-2">FEATURE 04</div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">Team Workspaces &amp; RBAC</h3>
                <p className="text-on-surface-variant text-sm sm:text-base max-w-sm">
                  Organize initiatives with team workspace containers, shared backlogs, granular role permissions, and autonomous workflow rules.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-64">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 rounded-2xl aspect-square flex flex-col justify-center items-center shadow-sm">
                    <span className="material-symbols-outlined text-2xl text-primary mb-1">bolt</span>
                    <div className="font-mono text-xs font-bold text-on-surface">Real-Time</div>
                    <div className="text-[10px] text-on-surface-variant font-mono uppercase mt-0.5">Sockets</div>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant/60 p-4 rounded-2xl aspect-square flex flex-col justify-center items-center shadow-sm">
                    <span className="material-symbols-outlined text-2xl text-primary mb-1">view_kanban</span>
                    <div className="font-mono text-xs font-bold text-on-surface">Multi-View</div>
                    <div className="text-[10px] text-on-surface-variant font-mono uppercase mt-0.5">Kanban / Cal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote Section ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 border-y border-outline-variant/40 bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-black italic mb-6 uppercase tracking-tight text-on-surface leading-snug">
              "ORGANIZATION IS THE FOUNDATION OF EFFICIENCY AND PEACE OF MIND."
            </h3>
            <div className="font-mono text-xs uppercase font-bold text-primary tracking-widest">
              — MANDATE PRODUCTIVITY PHILOSOPHY
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
