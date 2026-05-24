import React from 'react';
import Hero3D from './Hero3D';
import VitalStats from './VitalStats';
import ScheduleAndAdmin from './ScheduleAndAdmin';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-gray-50 dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        <header>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black tracking-tight"
          >
            Medical <span className="text-accent-blue">Dashboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium"
          >
            System status: <span className="text-accent-green">Operational</span>
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Hero3D />
            <VitalStats />
          </div>
          <div className="lg:col-span-1">
            <ScheduleAndAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
