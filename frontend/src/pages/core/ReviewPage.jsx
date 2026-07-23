import React from 'react';

const ReviewPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-3xl w-full space-y-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-black dark:text-white tracking-tight">Weekly Reflection</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-2">What you achieved and what slipped.</p>
        </header>
        
        {/* Placeholder for review insights */}
        <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors">
          <p className="text-zinc-600 dark:text-zinc-400">Review content will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
