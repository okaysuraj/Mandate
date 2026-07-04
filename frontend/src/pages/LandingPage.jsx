import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

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

      <main className="pt-[80px]">
        {/* ── Hero Section ── */}
        <section className="relative min-h-[870px] flex flex-col items-center justify-center text-center px-lg bg-surface-container-lowest">
          <div className="max-w-6xl w-full">
            <h1 className="font-display-lg text-display-lg md:text-[80px] lg:text-display-lg mb-lg tracking-tighter uppercase leading-none">
              FOCUS.<br />EXECUTE.<br />MANDATE.
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-xl opacity-80">
              The next generation of industrial-grade workflow management. Precision engineered for high-stakes environments where every millisecond counts.
            </p>
            <div className="flex flex-col md:flex-row gap-md justify-center items-center">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="bg-primary text-on-primary px-xl py-md rounded-full font-label-caps text-label-caps tracking-widest hover:opacity-90 transition-all active:scale-95"
              >
                GET STARTED
              </Link>
              <Link
                to="/docs"
                className="border border-outline px-xl py-md rounded-full font-label-caps text-label-caps tracking-widest hover:bg-surface-container-low transition-all"
              >
                DOCUMENTATION
              </Link>
            </div>
          </div>
          {/* Atmospheric bounce arrow */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20">
            <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* ── Bento Grid Features ── */}
        <section className="py-xl px-lg max-w-[1440px] mx-auto" ref={bentoRef}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Feature 1: Industrial Precision */}
            <div className="bento-item md:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between overflow-hidden group">
              <div className="relative h-64 mb-lg overflow-hidden rounded-md bg-surface-container-high">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[80px] text-on-surface-variant opacity-20">precision_manufacturing</span>
                </div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-primary-container mb-xs">PRECISION-01</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">Industrial Precision</h2>
                <p className="text-on-surface-variant font-body-md max-w-lg">
                  Real-time data synchronization across distributed networks with sub-10ms latency. Built for systems where accuracy is non-negotiable.
                </p>
              </div>
            </div>

            {/* Feature 2: Minimalist Logic */}
            <div className="bento-item md:col-span-4 bg-surface-container-low border border-outline-variant p-lg flex flex-col justify-between group">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">CORE-02</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">High-Tech Minimalist</h2>
              </div>
              <div className="my-lg flex justify-center">
                <div className="w-full aspect-square border border-primary/10 rounded-full flex items-center justify-center p-md relative max-w-[200px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[80%] border border-primary/20 rounded-full animate-spin-slow"></div>
                  </div>
                  <span className="material-symbols-outlined text-6xl">target</span>
                </div>
              </div>
              <p className="text-on-surface-variant font-body-md">
                Stripped of noise. Focused on signal. A UI designed to disappear.
              </p>
            </div>

            {/* Feature 3: Premium Workflow */}
            <div className="bento-item md:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg flex flex-col justify-between group">
              <div className="mb-lg">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-xs">SYSTEM-03</div>
                <h2 className="font-headline-lg text-headline-lg mb-md">Premium Workflow</h2>
              </div>
              <div className="h-48 bg-surface-container-high rounded-md mb-lg overflow-hidden border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[60px] text-on-surface-variant opacity-20">dashboard_customize</span>
              </div>
              <p className="text-on-surface-variant font-body-md">
                Seamless integration with enterprise stacks via our proprietary API mesh.
              </p>
            </div>

            {/* Feature 4: Raw Performance */}
            <div className="bento-item md:col-span-8 bg-primary text-on-primary p-lg flex flex-col md:flex-row gap-lg items-center relative overflow-hidden">
              <div className="relative z-10 flex-1">
                <div className="font-label-caps text-label-caps text-on-primary-container mb-xs">ENGINE-04</div>
                <h2 className="font-display-lg text-headline-lg mb-md text-white">Raw Tech Performance</h2>
                <p className="text-white/70 font-body-md max-w-sm">
                  Built on a Rust-based core for maximum throughput and memory safety. The foundation of modern industry.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-64">
                <div className="grid grid-cols-2 gap-sm">
                  <div className="bg-white/10 p-md rounded-md aspect-square flex flex-col justify-center items-center">
                    <div className="font-label-caps text-label-caps text-white">99.9%</div>
                    <div className="text-[10px] text-white/50 uppercase">Uptime</div>
                  </div>
                  <div className="bg-white/10 p-md rounded-md aspect-square flex flex-col justify-center items-center">
                    <div className="font-label-caps text-label-caps text-white">&lt;2ms</div>
                    <div className="text-[10px] text-white/50 uppercase">Latency</div>
                  </div>
                </div>
              </div>
              {/* Background icon */}
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote Section ── */}
        <section className="py-xl px-lg border-y border-outline-variant bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto text-center py-xl">
            <h3 className="font-headline-lg text-headline-lg italic max-w-4xl mx-auto mb-lg">
              "IN THE MODERN INDUSTRIAL LANDSCAPE, PRECISION IS THE ONLY MEASURE OF SUCCESS."
            </h3>
            <div className="font-label-caps text-label-caps text-primary tracking-widest">— MANDATE CORE DIRECTIVE</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
