import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import { CheckCircle2, ListTodo, Focus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-8 pt-24 pb-16 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold leading-none tracking-tighter mb-4 uppercase text-[#1A1A1A] font-['Space_Grotesk']">
          MANDATE
        </h1>
        <p className="text-lg text-gray-500 tracking-wide font-['Space_Grotesk']">
          Precision productivity for the focused mind.
        </p>
        
        <div className="mt-20 w-full max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="flex-1 max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight tracking-tight font-['Space_Grotesk']">
              Helping you reach your goal faster.
            </h2>
            <div className="w-12 h-1 bg-[#1A1A1A] mt-6 mb-6"></div>
            <p className="text-gray-500 text-lg">
              Streamline your workflow with tools that adapt to your speed, giving you the clarity needed to execute flawlessly.
            </p>
          </div>
          <div className="flex-1 w-full max-w-[500px] rounded-[32px] overflow-hidden bg-[#EDEDF0] pt-8 px-8 pb-0 shrink-0">
            <img 
              src="/mid section image screen.png" 
              alt="Mandate App on iPad" 
              className="w-full h-auto object-cover rounded-t-[20px] mx-auto shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="max-w-[1200px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-[#F3F3F5] rounded-[32px] p-10 flex flex-col justify-between items-start h-[400px]">
          <div>
            <h3 className="text-4xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight mb-4 tracking-tight">
              The first professional task manager.
            </h3>
            <p className="text-gray-500 text-sm max-w-[280px]">
              Engineered for those who value clarity above all else. No clutter, just command.
            </p>
          </div>
          <div className="self-center mt-auto bg-white p-6 rounded-2xl shadow-sm">
             <img src="/mandate_logo app.png" alt="Task Icon" className="w-24 h-24 object-contain" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F3F3F5] rounded-[32px] p-10 flex flex-col justify-between items-start h-[400px]">
          <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white mb-8">
             <ListTodo size={20} />
          </div>
          <div className="mt-auto">
            <h3 className="text-4xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight mb-4 tracking-tight">
              4K Clarity for your workflow.
            </h3>
            <p className="text-gray-500 text-sm max-w-[300px]">
              A metaphorical visual peak. Every pixel of our interface is optimized for cognitive load reduction.
            </p>
          </div>
        </div>

        {/* Card 3 (Wide) */}
        <div className="bg-[#F3F3F5] rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between col-span-1 md:col-span-2 min-h-[250px] gap-8">
          <div className="flex-1">
            <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white mb-6">
               <Focus size={20} />
            </div>
            <h3 className="text-4xl font-bold text-[#1A1A1A] font-['Space_Grotesk'] leading-tight mb-4 tracking-tight">
              Intelligent Focus.
            </h3>
            <p className="text-gray-500 text-sm max-w-[320px]">
              Our proprietary algorithm surfaces exactly what you need to do next, hiding the noise of the rest of your day.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm w-full max-w-[400px] border border-[#D9DADC]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-24"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                <div className="h-1.5 bg-[#1A1A1A] rounded-full w-32"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                <div className="h-1.5 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section */}
      <section className="bg-[#0A0A0A] text-white py-24 px-8 mt-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <img src="/leftside_footer.png" alt="FOCUS EXECUTE" className="w-full h-auto object-cover rounded-2xl" />
          </div>
          <div className="flex-1 flex flex-col">
            <h4 className="text-[10px] font-bold text-gray-500 tracking-widest mb-4 font-['Space_Grotesk'] uppercase">THE STANDARD</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight font-['Space_Grotesk'] mb-6 leading-tight">
              Pixel Perfect<br />Execution.
            </h2>
            <p className="text-gray-400 text-sm mb-10 max-w-md leading-relaxed">
              MANDATE is built with the rigor of industrial design. We believe that the tools you use should be as focused as the work you produce. Every interaction is measured, every frame is deliberate.
            </p>
            
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className="text-gray-400" />
                Sub-millisecond interaction latency
              </li>
              <li className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className="text-gray-400" />
                Typography-first structural hierarchy
              </li>
              <li className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className="text-gray-400" />
                Deep monochrome focus mode
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 text-center bg-white">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 font-['Space_Grotesk'] tracking-tight">
          Master your schedule today.
        </h2>
        <p className="text-gray-500 mb-10 text-xs tracking-wide">
          Join the elite cohort of thinkers and builders who have mandated their time.
        </p>
        <Link to={user ? "/dashboard" : "/register"} className="inline-block bg-[#1A1A1A] hover:bg-black text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-all">
          {user ? "GO TO DASHBOARD" : "START YOUR MANDATE"}
        </Link>
      </section>

    </div>
  );
};

export default LandingPage;
