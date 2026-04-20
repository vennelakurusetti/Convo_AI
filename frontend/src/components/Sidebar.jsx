import { Plus, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const Sidebar = ({ history, onNewChat, onSelectHistory, currentChatId }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-convo-panel/40 backdrop-blur-2xl border-r border-convo-border z-40 flex flex-col hidden lg:flex">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8 opacity-80">
          <div className="w-6 h-6 bg-convo-accent/20 rounded flex items-center justify-center">
            <MessageSquare className="text-convo-accent w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-base tracking-tight text-white">Convo AI</span>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-convo-border hover:bg-white/10 rounded-xl transition-all font-medium text-sm text-slate-200"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        <div className="px-3 py-3 text-[11px] font-semibold text-convo-muted uppercase tracking-wider">
          Recent
        </div>
        
        {history.length === 0 ? (
          <div className="px-3 py-4 text-xs text-convo-muted/40 italic">
            Your history will appear here
          </div>
        ) : (
          history.slice().reverse().map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className={`w-full text-left px-3 py-3 rounded-xl text-sm transition-all flex items-center group relative ${
                currentChatId === item.id 
                ? 'bg-white/10 text-white' 
                : 'text-convo-muted hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <div className="flex-1 truncate pr-4">
                {item.question}
              </div>
              <ArrowRight className={`w-3.5 h-3.5 transition-all ${currentChatId === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
            </button>
          ))
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-convo-border/20">
        <p className="text-[10px] text-convo-muted font-medium text-center uppercase tracking-widest opacity-40">
          Minimal Intelligence
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
