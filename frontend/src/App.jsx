import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Sparkles, MessageSquare, ArrowUp, RefreshCw, AlertCircle } from 'lucide-react';

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
    e?.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post(`${apiUrl}/ask`, { question });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'The AI is currently unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-text flex flex-col items-center">
      {/* Top Header */}
      <nav className="w-full flex justify-between items-center p-4 md:px-8 border-b border-claude-border bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-claude-accent rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Convo</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => { setQuestion(''); setResponse(''); }}
            className="text-sm font-medium text-claude-muted hover:text-claude-text transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="w-full max-w-3xl flex-grow flex flex-col px-4 pt-12 md:pt-20 pb-24">
        
        {!response && !loading && !error && (
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">How can I help you today?</h1>
            <p className="text-claude-muted text-lg">Type any question below to get an instant AI response.</p>
          </div>
        )}

        {/* Input Section - Moves to bottom after response */}
        <div className={`${response ? 'order-last mt-10' : 'mb-10'} w-full transition-all duration-500`}>
          <div className="relative group bg-white border border-claude-border rounded-[24px] shadow-sm hover:shadow-md hover:border-claude-accent/30 transition-all p-2 pr-4">
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 p-4 pb-12 text-lg text-claude-text placeholder:text-claude-muted resize-none min-h-[120px] outline-none"
              placeholder="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-3">
              <span className="text-[10px] text-claude-muted font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden md:block uppercase tracking-widest">
                Press Enter
              </span>
              <button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  loading || !question.trim()
                    ? 'bg-claude-bg text-claude-muted'
                    : 'bg-claude-accent text-white hover:scale-105 active:scale-95 shadow-lg shadow-claude-accent/20'
                }`}
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUp className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-10 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-700 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Response State */}
        {response && (
          <div ref={responseRef} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-8 h-8 bg-claude-accent rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <div className="prose prose-claude max-w-none text-claude-text leading-[1.65]">
                {response.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-[17px]">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-claude-bg/90 backdrop-blur-sm flex justify-center border-t border-claude-border/30">
        <p className="text-[11px] font-medium text-claude-muted uppercase tracking-[0.1em]">
          Powered by Anthropic Inspired UI • Llama 3.1 8B Instant
        </p>
      </footer>
    </div>
  );
};

export default App;
