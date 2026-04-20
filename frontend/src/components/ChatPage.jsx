import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ArrowUp, Sparkles, AlertCircle, RefreshCw, MessageSquare, Plus } from 'lucide-react';
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

  useEffect(() => {
    const savedHistory = localStorage.getItem('convo_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
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
      setError('Something went wrong. Please check your connection.');
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
    <div className="min-h-screen bg-convo-bg text-convo-text flex selection:bg-convo-accent/40 relative overflow-hidden">
      {/* Subtle Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#020617] bg-[length:400%_400%] animate-gradient-shift pointer-events-none"></div>
      
      <Sidebar 
        history={history} 
        onNewChat={handleNewChat} 
        onSelectHistory={handleSelectHistory} 
        currentChatId={currentChatId}
      />

      <main className="flex-1 flex flex-col items-center justify-center relative lg:ml-[280px] z-10 p-6 md:p-12">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-12 transition-all duration-700">
          
          {/* Header Section */}
          <header className={`w-full text-center transition-all duration-700 ${response ? 'scale-90 opacity-80' : 'scale-100 opacity-100'}`}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 animate-fade-in">
              How can I help you today?
            </h1>
            {!response && (
              <p className="text-convo-muted text-lg animate-fade-in delay-200">
                Ask anything. Get instant AI-powered answers.
              </p>
            )}
          </header>

          {/* Response Container */}
          {response && (
            <div ref={responseRef} className="w-full animate-fade-in duration-700">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="prose prose-invert prose-lg max-w-none text-slate-200 leading-relaxed font-normal">
                  {response.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center space-x-4 text-red-400 animate-in shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Focus Input Section */}
          <div className={`w-full transition-all duration-700 ${response ? 'pt-8' : 'pt-0'}`}>
            <div className="relative group bg-convo-panel/60 backdrop-blur-3xl border border-convo-border rounded-full p-2 pr-3 transition-all focus-within:ring-2 focus-within:ring-convo-accent/40 focus-within:border-convo-accent/50 group-hover:border-convo-border animate-fade-in delay-300">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 px-6 pt-3.5 text-lg text-white placeholder:text-convo-muted resize-none h-[60px] max-h-[160px] outline-none scrollbar-hide flex items-center leading-normal"
                placeholder="Ask me anything..."
                rows="1"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0 absolute right-3 top-2.5 ${
                  loading || !question.trim()
                    ? 'bg-white/5 text-convo-muted cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
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
      </main>
    </div>
  );
};

export default ChatPage;
