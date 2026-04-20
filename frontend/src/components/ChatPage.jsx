import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ArrowUp, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import Sidebar from './Sidebar';

const ChatPage = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const responseRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('convo_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

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
    setCurrentChatId(null);

    try {
      const res = await axios.post(`${apiUrl}/ask`, { question });
      const newResponse = res.data.response;
      setResponse(newResponse);

      // Save to history
      const newHistoryItem = {
        id: Date.now(),
        question: question.trim(),
        response: newResponse,
        timestamp: new Date().toISOString()
      };
      
      const updatedHistory = [...history, newHistoryItem];
      setHistory(updatedHistory);
      localStorage.setItem('convo_history', JSON.stringify(updatedHistory));
      setCurrentChatId(newHistoryItem.id);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setQuestion('');
    setResponse('');
    setError('');
    setCurrentChatId(null);
  };

  const handleSelectHistory = (item) => {
    setQuestion(item.question);
    setResponse(item.response);
    setCurrentChatId(item.id);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-convo-bg text-convo-text flex selection:bg-convo-accent/40 overflow-hidden">
      <Sidebar 
        history={history} 
        onNewChat={handleNewChat} 
        onSelectHistory={handleSelectHistory} 
        currentChatId={currentChatId}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col items-center relative lg:ml-[280px]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-convo-accent/5 blur-[120px] pointer-events-none"></div>

        {/* Dynamic Header */}
        <header className="w-full max-w-3xl flex justify-between items-center p-6 md:py-8 animate-in fade-in duration-700">
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-6 h-6 bg-convo-accent rounded flex items-center justify-center">
              <Sparkles className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-lg tracking-tight">Convo</span>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="w-full max-w-3xl flex-1 flex flex-col px-6 pt-10 pb-32">
          
          {!response && !loading && !error && (
            <div className="text-center mt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
                Hello, traveler.
              </h1>
              <p className="text-convo-muted text-xl leading-relaxed">
                Start a conversation with intelligence. Ask me anything.
              </p>
            </div>
          )}

          {/* Chat Result */}
          {response && (
            <div ref={responseRef} className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full mb-10">
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 bg-convo-accent/10 border border-convo-accent/20 rounded-2xl flex-shrink-0 flex items-center justify-center mt-1 animate-glow shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Sparkles className="text-convo-accent w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="prose prose-invert prose-lg max-w-none text-slate-200 leading-relaxed">
                    {response.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-6">{paragraph}</p>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-convo-border/30">
                    <button 
                      onClick={handleNewChat}
                      className="text-xs font-bold text-convo-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                      <PlusCircle className="w-3 h-3" />
                      NEW QUESTION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-8 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center space-x-4 text-red-400 animate-in shake duration-500">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium leading-relaxed">{error}</span>
            </div>
          )}
        </div>

        {/* Center Input Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-convo-bg via-convo-bg to-transparent lg:left-[280px]">
          <div className="w-full max-w-3xl relative animate-in slide-in-from-bottom-4 duration-500">
            <div className="relative flex items-center bg-convo-panel/60 backdrop-blur-2xl border border-convo-border rounded-[32px] p-2 pr-3 transition-all focus-within:border-convo-accent/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 p-4 px-6 text-lg text-white placeholder:text-convo-muted resize-none max-h-[200px] min-h-[60px] outline-none scrollbar-hide"
                placeholder="Ask me anything..."
                rows="1"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ height: 'auto' }}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  loading || !question.trim()
                    ? 'bg-convo-border text-convo-muted'
                    : 'bg-white text-convo-bg hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowUp className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-center text-[10px] text-convo-muted/50 mt-3 font-bold uppercase tracking-[0.2em]">
              Single Query Session • Llama 3.1 8B Instant
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple Lucide wrapper for Sidebar reuse
const PlusCircle = ({ className }) => <PlusCircleIcon className={className} />;
import { PlusCircle as PlusCircleIcon } from 'lucide-react';

export default ChatPage;
