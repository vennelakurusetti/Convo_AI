import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ArrowUp, AlertCircle, RefreshCw } from 'lucide-react';
import Sidebar from './Sidebar';

const ChatPage = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const responseRef = useRef(null);
  const inputRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden bg-[#020617]">
      {/* 🔥 Better Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      <Sidebar
        history={history}
        onNewChat={handleNewChat}
        onSelectHistory={handleSelectHistory}
        currentChatId={currentChatId}
      />

      {/* ✅ MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-start pt-28 lg:ml-[280px] px-6">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          {/* 🔥 HEADER */}
          <header className="w-full text-center">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-3">
              How can I help you today?
            </h1>
            {!response && (
              <p className="text-slate-400 text-lg">
                Ask anything. Get instant AI-powered answers.
              </p>
            )}
          </header>

          {/* 🔥 RESPONSE */}
          {response && (
            <div ref={responseRef} className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl relative group">
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all opacity-0 group-hover:opacity-100 flex items-center space-x-1"
                  title="Copy to clipboard"
                >
                  {copySuccess ? (
                    <span className="text-[10px] text-green-400 font-medium">Copied!</span>
                  ) : (
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>

                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap break-words prose prose-invert max-w-none">
                  {response}
                </div>
              </div>
            </div>
          )}

          {/* 🔥 ERROR */}
          {error && (
            <div className="w-full p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center space-x-3 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* 🔥 INPUT */}
          <div className="w-full pt-4">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 pr-3 transition-all focus-within:ring-2 focus-within:ring-blue-500/30">
              <textarea
                ref={inputRef}
                className="w-full bg-transparent outline-none px-6 pt-3 text-lg text-white placeholder:text-slate-400 resize-none h-[80px]"
                placeholder="Ask me anything..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className={`absolute right-3 bottom-3 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  loading || !question.trim()
                    ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 shadow-lg hover:shadow-blue-500/40'
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