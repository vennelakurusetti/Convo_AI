import { PlusCircle, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const Sidebar = ({ history, onNewChat, onSelectHistory, currentChatId }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-convo-panel/80 backdrop-blur-3xl border-r border-convo-border z-40 flex flex-col hidden lg:flex">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-7 h-7 bg-convo-accent rounded flex items-center justify-center">
            <MessageSquare className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight">Convo</span>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-convo-border hover:border-convo-accent/50 hover:bg-convo-accent/5 rounded-2xl transition-all font-medium text-sm group"
        >
          <PlusCircle className="w-4 h-4 text-convo-muted group-hover:text-convo-accent transition-colors" />
          <span>New Chat</span>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        <div className="flex items-center px-2 py-2 text-[10px] font-bold text-convo-muted uppercase tracking-[0.2em] mb-2">
          <Clock className="w-3 h-3 mr-2" />
          Previous Queries
        </div>
        
        {history.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-xs text-convo-muted/50 italic">No history yet</p>
          </div>
        ) : (
          history.slice().reverse().map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className={`w-full text-left p-4 rounded-2xl text-sm transition-all flex items-center space-x-3 group ${
                currentChatId === item.id 
                ? 'bg-white/10 border border-convo-border' 
                : 'hover:bg-white/5'
              }`}
            >
              <div className="flex-1 truncate">
                <p className={`truncate font-medium ${currentChatId === item.id ? 'text-white' : 'text-convo-muted group-hover:text-slate-200'}`}>
                  {item.question}
                </p>
              </div>
              <ArrowRight className={`w-3 h-3 transition-all ${currentChatId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-convo-border/30">
        <div className="text-[10px] text-convo-muted/50 font-bold uppercase tracking-widest text-center">
          Single Query Experience
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
