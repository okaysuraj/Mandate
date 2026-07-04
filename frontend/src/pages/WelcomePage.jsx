import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ArrowRight, CheckCircle2, Target, Zap, Clock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WelcomePage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Preferences state
  const [useCase, setUseCase] = useState('personal');
  const [notifications, setNotifications] = useState('normal');

  // First mandate state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskIntent, setTaskIntent] = useState('');

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  
  const handleComplete = async () => {
    try {
      // 1. Update user preferences
      await axios.put('/api/users/profile', {
        preferences: {
          notifications
        }
        // In a real app we might also update workspace to team/personal based on useCase
      });

      // 2. Create the first task
      const res = await axios.post('/api/tasks', {
        title: taskTitle,
        intent: taskIntent,
        priority: 'high',
        dueDate: new Date().toISOString()
      });

      toast.success("Mandate created!");
      nextStep(); // Go to success screen

      // Wait a moment then redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Let's skip to dashboard.");
      navigate('/dashboard');
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden transition-colors duration-300">
      
      {/* Background gradients for premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Value Prop */}
          {step === 1 && (
            <motion.div 
              key="step1"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-8"
            >
              <div className="mx-auto w-16 h-16 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-black/60 dark:from-white dark:to-white/60">
                Welcome to Mandate
              </h1>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                Mandate helps you commit to what truly matters. No endless backlogs. Just intentional focus.
              </p>
              
              <button 
                onClick={nextStep}
                className="mt-8 group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg dark:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Let's set you up
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <motion.div 
              key="step2"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold tracking-tight">How will you use Mandate?</h2>
              
              <div className="space-y-4">
                <label className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Primary Use Case</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setUseCase('personal')}
                    className={`p-4 rounded-2xl border transition-all ${useCase === 'personal' ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-500/10 dark:text-white shadow-sm dark:shadow-none' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/10'}`}
                  >
                    Personal Focus
                  </button>
                  <button 
                    onClick={() => setUseCase('team')}
                    className={`p-4 rounded-2xl border transition-all ${useCase === 'team' ? 'bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-500/10 dark:text-white shadow-sm dark:shadow-none' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/10'}`}
                  >
                    Team Collaboration
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Notifications</label>
                <div className="space-y-2">
                  {[
                    { id: 'light', label: 'Light', desc: 'Only critical mentions' },
                    { id: 'normal', label: 'Normal', desc: 'Standard updates and reminders' },
                    { id: 'strict', label: 'Strict', desc: 'Hold me accountable aggressively' }
                  ].map(opt => (
                    <div 
                      key={opt.id}
                      onClick={() => setNotifications(opt.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${notifications === opt.id ? 'bg-white border-zinc-300 shadow-sm dark:bg-white/10 dark:border-white/30 dark:shadow-none' : 'bg-transparent border-zinc-200 hover:bg-white dark:border-white/5 dark:hover:bg-white/5'}`}
                    >
                      <div>
                        <div className={`font-medium ${notifications === opt.id ? 'text-black dark:text-white' : 'text-zinc-700 dark:text-white'}`}>{opt.label}</div>
                        <div className="text-sm text-zinc-500">{opt.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${notifications === opt.id ? 'border-blue-600 dark:border-white' : 'border-zinc-300 dark:border-zinc-700'}`}>
                        {notifications === opt.id && <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-white rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">Back</button>
                <button 
                  onClick={nextStep}
                  className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-gray-200 transition"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: First Task */}
          {step === 3 && (
            <motion.div 
              key="step3"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold tracking-tight">Create your first Mandate</h2>
              <p className="text-zinc-500 dark:text-zinc-400">What is the one thing you must accomplish today?</p>
              
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="E.g., Finalize the Q3 marketing strategy"
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-4 text-xl text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm dark:shadow-none"
                    autoFocus
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center text-blue-600 dark:text-blue-400">
                    <Zap className="w-4 h-4 mr-2" />
                    Why is this important? (The Intent)
                  </label>
                  <textarea 
                    placeholder="If I complete this, we unlock the next phase of growth..."
                    value={taskIntent}
                    onChange={e => setTaskIntent(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-4 text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all min-h-[100px] shadow-sm dark:shadow-none"
                  />
                </div>

                <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-white/5 p-4 rounded-xl border border-zinc-100 dark:border-transparent">
                  <Clock className="w-4 h-4 mr-2" />
                  Due date automatically set to Today.
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(2)} className="px-6 py-3 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">Back</button>
                <button 
                  onClick={handleComplete}
                  disabled={!taskTitle.trim()}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Commit to Mandate
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div 
              key="step4"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-6"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </motion.div>
              <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white">This task is now a mandate.</h2>
              <p className="text-xl text-zinc-500 dark:text-zinc-400">Redirecting to your dashboard...</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomePage;
