import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-convo-bg text-convo-text flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Glowing Gradient Backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse-slow delay-1000"></div>
      
      {/* Content Section */}
      <main className="z-10 text-center px-6 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-convo-border bg-convo-panel/50 backdrop-blur-xl shadow-lg animate-fade-in">
          <Sparkles className="w-4 h-4 text-convo-accent" />
          <span className="text-xs font-bold tracking-widest uppercase">The Future of Interaction</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Are you ready to explore with Convo AI?
        </h1>

        <p className="text-convo-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Ask anything. Get instant AI-powered answers. Discover knowledge with simplicity and speed.
        </p>

        <div className="pt-6">
          <button
            onClick={() => navigate('/chat')}
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-white text-convo-bg font-black text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-convo-accent opacity-0 group-hover:opacity-10 transition-opacity"></div>
            
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Decorative Canvas-like Grid (CSS) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default LandingPage;
