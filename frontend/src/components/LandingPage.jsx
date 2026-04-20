import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020617] text-white">

      {/* 🔥 Background Glow (cleaner + smoother) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      {/* 🔥 Main Content */}
      <main className="text-center px-6 max-w-3xl flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">

        {/* SMALL TAG (clean, not flashy) */}
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-wide uppercase text-slate-400">
          AI Assistant
        </div>

        {/* 🔥 MAIN HEADING */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Are you ready to explore with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Convo AI
          </span>
          ?
        </h1>

        {/* 🔥 SUBTEXT */}
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
          Ask anything. Get instant AI-powered answers.  
          Simple, fast, and distraction-free.
        </p>

        {/* 🔥 BUTTON */}
        <button
          onClick={() => navigate('/chat')}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg shadow-lg transition-all hover:scale-105 hover:shadow-blue-500/40 active:scale-95"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

      </main>

      {/* 🔥 Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default LandingPage;