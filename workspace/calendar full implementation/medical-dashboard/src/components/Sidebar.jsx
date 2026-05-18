import React from 'react';
import { 
  House, 
  CalendarBlank, 
  FolderSimple, 
  ChatCircleText, 
  Gear, 
  SignOut 
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: House, label: 'Dashboard', id: 'home' },
  { icon: CalendarBlank, label: 'Calendar', id: 'calendar' },
  { icon: FolderSimple, label: 'Records', id: 'records' },
  { icon: ChatCircleText, label: 'Messages', id: 'messages', badge: 3 },
  { icon: Gear, label: 'Settings', id: 'settings' },
];

const Sidebar = ({ darkMode }) => {
  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 h-[85vh] w-20 flex flex-col items-center justify-between py-10 rounded-[2.5rem] glass glass-light dark:glass-dark border border-white/20"
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="w-12 h-12 rounded-2xl bg-accent-blue flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6">
          <CalendarBlank size={28} weight="duotone" className="text-white" />
        </div>

        {navItems.map((item, index) => (
          <div key={item.id} className="relative group cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
              whileTap={{ scale: 0.95 }}
              className={`p-3.5 rounded-2xl transition-all ${
                index === 1 
                  ? 'bg-accent-blue/10 text-accent-blue' 
                  : 'text-textSecondary-light dark:text-textSecondary-dark hover:text-textPrimary-light dark:hover:text-textPrimary-dark'
              }`}
            >
              <item.icon size={24} weight={index === 1 ? "bold" : "regular"} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 font-bold">
                  {item.badge}
                </span>
              )}
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-[100] shadow-xl">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <motion.div
          whileHover={{ scale: 1.1, color: '#EF4444' }}
          className="p-3 text-textSecondary-light dark:text-textSecondary-dark cursor-pointer transition-colors"
        >
          <SignOut size={24} weight="bold" />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
