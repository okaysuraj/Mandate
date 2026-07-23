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
        <section className="relative py-16 md:py-24 flex flex-col items-center justify-center text-center px-lg bg-surface-container-lowest">
          <div className="max-w-6xl w-full">
            <h1 className="font-display-lg text-display-lg md:text-[80px] lg:text-display-lg mb-lg tracking-tighter uppercase leading-none">
              FOCUS.<br />EXECUTE.<br />MANDATE.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-xl opacity-80">
              The simple, powerful task management and workspace platform. Organize your to-dos, manage team projects, and stay on top of your schedule.
            </p>
            <div className="flex flex-col md:flex-row gap-md justify-center items-center">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps tracking-widest hover:opacity-90 transition-all active:scale-95"
              >
                {user ? "GO TO DASHBOARD" : "GET STARTED"}
              </Link>
            </div>
          </div>
          {/* Atmospheric bounce arrow */}
        </section>

        {/* ── Bento Grid Features ── */}
        <section className="py-xl px-lg max-w-[1440px] mx-auto" ref={bentoRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Feature 1: Real-Time Sync */}
            <div className="bento-item md:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between overflow-hidden group">
              <div className="relative h-64 mb-lg overflow-hidden rounded-md bg-surface-container-high">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[80px] text-on-surface-variant opacity-20">sync</span>
                </div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-primary-container mb-xs">FEATURE-01</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">Real-Time Task Sync</h2>
                <p className="text-on-surface-variant font-body-md max-w-lg">
                  Instant updates across all your devices and team members. Keep your task status, comments, and project boards in sync effortlessly.
                </p>
              </div>
            </div>

            {/* Feature 2: Clean UI */}
            <div className="bento-item md:col-span-4 bg-surface-container-low border border-outline-variant p-lg flex flex-col justify-between group">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">FEATURE-02</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">Clean & Focused UI</h2>
              </div>
              <div className="my-lg flex justify-center">
                <div className="w-full aspect-square border border-primary/10 rounded-full flex items-center justify-center p-md relative max-w-[200px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[80%] border border-primary/20 rounded-full animate-spin-slow"></div>
                  </div>
                  <span className="material-symbols-outlined text-6xl">task_alt</span>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md">
                Distraction-free interface designed to help you organize daily tasks, set priorities, and get things done.
              </p>
            </div>

            {/* Feature 3: Kanban & Calendar */}
            <div className="bento-item md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between group">
              <div className="mb-lg">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">FEATURE-03</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">Kanban & Calendar Views</h2>
              </div>
              <div className="h-48 bg-surface-container-high rounded-md mb-lg overflow-hidden border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[60px] text-on-surface-variant opacity-20">calendar_view_month</span>
              </div>
              <p className="text-on-surface-variant font-body-md">
                Switch seamlessly between Today's to-do list, interactive Kanban boards, and monthly calendar views.
              </p>
            </div>

            {/* Feature 4: Team Workspaces */}
            <div className="bento-item md:col-span-8 bg-surface-container-low border border-outline-variant p-lg flex flex-col md:flex-row gap-lg items-center relative overflow-hidden">
              <div className="relative z-10 flex-1">
                <div className="font-label-caps text-label-caps text-primary mb-xs">FEATURE-04</div>
                <h2 className="font-headline-lg text-headline-lg mb-md text-on-surface">Team Workspaces & Collaboration</h2>
                <p className="text-on-surface-variant font-body-md max-w-sm">
                  Organize projects with distinct team workspaces, shared task lists, role permissions, and automated due-date reminders.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-64">
                <div className="grid grid-cols-2 gap-sm">
                  <div className="bg-surface-container-high border border-outline-variant p-md rounded-md aspect-square flex flex-col justify-center items-center">
                    <div className="font-label-caps text-label-caps text-on-surface">Real-Time</div>
                    <div className="text-[10px] text-on-surface-variant uppercase">Sockets</div>
                  </div>
                  <div className="bg-surface-container-high border border-outline-variant p-md rounded-md aspect-square flex flex-col justify-center items-center">
                    <div className="font-label-caps text-label-caps text-on-surface">Multi-View</div>
                    <div className="text-[10px] text-on-surface-variant uppercase">Kanban / Cal</div>
                  </div>
                </div>
              </div>
              {/* Background icon */}
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote Section ── */}
        <section className="py-xl px-lg border-y border-outline-variant bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto text-center py-xl">
            <h3 className="font-headline-lg text-headline-lg italic max-w-4xl mx-auto mb-lg">
              "ORGANIZATION IS THE FOUNDATION OF EFFICIENCY AND PEACE OF MIND."
            </h3>
            <div className="font-label-caps text-label-caps text-primary tracking-widest">— MANDATE PRODUCTIVITY PHILOSOPHY</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
