import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post(`${apiUrl}/ask`, { question });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'The AI is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-3xl z-10">
        <header className="text-center mb-12 animate-in fade-in zoom-in duration-700">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase">
            Next-Gen Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Convo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">AI</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Experience lightning-fast intelligence. One question, one powerful answer.
          </p>
        </header>

        <main className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-2 rounded-3xl shadow-2xl transition-all hover:border-blue-500/30">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 p-6 text-xl text-slate-100 placeholder:text-slate-600 resize-none min-h-[160px] outline-none"
                placeholder="What's on your mind? Ask anything..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex items-center justify-between p-4 border-t border-slate-700/30">
                <span className="text-xs text-slate-500 ml-2">Press Enter to send</span>
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold transition-all ${
                    loading || !question.trim()
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-white text-slate-950 hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-950 rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Ask AI</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center text-sm font-medium animate-in shake duration-500">
              {error}
            </div>
          )}

          {response && (
            <div ref={responseRef} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Response Generated</span>
                  </div>
                  <button 
                    onClick={() => { setQuestion(''); setResponse(''); }}
                    className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
                  >
                    New Search
                  </button>
                </div>
                <div className="p-8 text-slate-300 text-lg leading-relaxed whitespace-pre-wrap selection:bg-blue-500/40">
                  {response}
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-slate-900/50 rounded-full border border-slate-800 text-slate-500 text-xs font-medium backdrop-blur-md">
            <span>Powered by <span className="text-white">Llama 3.1</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Latency <span className="text-emerald-400">~240ms</span></span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
