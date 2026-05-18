import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Activity, DollarSign, ChevronRight } from 'lucide-react';

const doctors = [
  { name: 'Dr. Hanzer Jon', role: 'Pulmonary Doctor', time: '10:00 - 11:30', status: 'online', img: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Dr. Steve Alex', role: 'Cardiologist', time: '14:00 - 15:30', status: 'away', img: 'https://i.pravatar.cc/150?u=2' },
];

const patients = [
  { name: 'William Smith', age: 45, condition: 'Osteoporosis', weight: '78kg' },
  { name: 'Emma Davis', age: 32, condition: 'Brain Cancer', weight: '62kg' },
];

const ScheduleAndAdmin = () => {
  return (
    <div className="space-y-8">
      {/* Schedule Section */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="glass glass-light dark:glass-dark p-8 rounded-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Upcoming Schedule</h3>
          <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-accent-blue bg-opacity-10 p-4 rounded-2xl border border-accent-blue border-opacity-20">
            <div className="text-center min-w-[50px]">
              <p className="text-xs font-bold text-accent-blue uppercase">Fri</p>
              <p className="text-lg font-black text-accent-blue">24</p>
            </div>
            <div className="h-10 w-px bg-accent-blue opacity-20" />
            <div>
              <p className="text-sm font-bold">Pulmonary Checkup</p>
              <p className="text-xs text-textSecondary-light dark:text-textSecondary-dark">18 May Monday 10:00-11:30</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest">Your Doctors</p>
            {doctors.map((doc, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={doc.img} alt={doc.name} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${doc.status === 'online' ? 'bg-accent-green' : 'bg-gray-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover:text-accent-blue transition-colors">{doc.name}</p>
                    <p className="text-xs text-textSecondary-light dark:text-textSecondary-dark">{doc.role}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-textSecondary-light dark:text-textSecondary-dark group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>

          <button className="w-full py-3 rounded-2xl bg-accent-blue text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:translate-y-0 transition-all">
            Consult Now
          </button>
        </div>
      </motion.section>

      {/* Admin Panel / Operations */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="glass glass-light dark:glass-dark p-8 rounded-3xl"
      >
        <h3 className="text-xl font-bold mb-6">Operations</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
            <Users className="w-5 h-5 text-accent-blue mb-2" />
            <p className="text-2xl font-black">50</p>
            <p className="text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase">Total Patients</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
            <DollarSign className="w-5 h-5 text-accent-green mb-2" />
            <p className="text-2xl font-black">$15k</p>
            <p className="text-[10px] font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase">Total Income</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-widest">Recent Patients</p>
            <p className="text-xs font-bold text-accent-blue cursor-pointer hover:underline">View All</p>
          </div>
          {patients.map((p, i) => (
            <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent-blue hover:border-opacity-20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-bold">{p.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-bold">{p.condition}</span>
              </div>
              <div className="flex gap-3 text-[10px] text-textSecondary-light dark:text-textSecondary-dark font-medium uppercase">
                <span>Age: {p.age}</span>
                <span>•</span>
                <span>Weight: {p.weight}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ScheduleAndAdmin;
