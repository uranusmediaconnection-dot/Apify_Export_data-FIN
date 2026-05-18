import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCalendarStore from '../store/useCalendarStore';
import { Terminal, Bug, Trash, X } from '@phosphor-icons/react';

const DebugPanel = () => {
  const debugMode = useCalendarStore(s => s.debugMode);
  const toggleDebug = useCalendarStore(s => s.toggleDebug);
  const logs = useCalendarStore(s => s.logs);
  const clearLogs = useCalendarStore(s => s.clearLogs);
  const events = useCalendarStore(s => s.events);
  const view = useCalendarStore(s => s.view);

  if (!debugMode) return (
    <button 
      onClick={toggleDebug}
      className="fixed bottom-8 left-8 z-50 p-4 rounded-full bg-gray-900 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
    >
      <Bug size={24} />
    </button>
  );

  return (
    <motion.div 
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      className="fixed left-6 top-6 bottom-6 w-[350px] z-[100] glass glass-dark rounded-[2rem] p-6 flex flex-col shadow-3xl border border-white/10"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-black flex items-center gap-2 tracking-tighter">
          <Terminal size={20} className="text-accent-cyan" />
          SYSTEM_DEBUG
        </h3>
        <button onClick={toggleDebug} className="text-white/50 hover:text-white transition-colors">
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* State Snapshot */}
      <div className="space-y-4 mb-8">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">State Snapshot</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-white/60">View Mode</p>
              <p className="text-sm font-mono text-accent-cyan font-bold">{view}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/60">Active Events</p>
              <p className="text-sm font-mono text-accent-cyan font-bold">{events.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Real-time Logs</p>
          <button onClick={clearLogs} className="text-[10px] text-white/40 hover:text-accent-red font-bold transition-colors flex items-center gap-1">
            <Trash size={12} />
            CLEAR
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar font-mono text-[11px]">
          {logs.length === 0 && <p className="text-white/20 italic">No events logged...</p>}
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            >
              <span className="text-white/30 mr-2">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
              <span className="text-white/80">{log.message}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          CORE_INITIALIZED // VERSION_0.1.0
        </div>
      </div>
    </motion.div>
  );
};

export default DebugPanel;
