import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Convo AI
          </h1>
          <p className="text-slate-400 text-center mb-8">Ask any question and get an instant AI response.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                className="w-full bg-slate-950 text-slate-200 border border-slate-600 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none min-h-[120px]"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] ${
                loading || !question.trim()
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Get AI Response'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {response && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">AI Response:</h2>
              <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 text-slate-300 leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
              <button 
                onClick={() => { setQuestion(''); setResponse(''); }}
                className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear and ask another
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-8 text-slate-600 text-sm">
        Powered by Groq Llama-3.1-8b-instant
      </footer>
    </div>
  );
};

export default App;
