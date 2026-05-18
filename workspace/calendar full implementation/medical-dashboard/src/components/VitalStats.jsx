import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Droplets, Heart, Wind, Thermometer } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current) + suffix);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const StatCard = ({ icon: Icon, label, value, unit, color, delay, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass glass-light dark:glass-dark p-6 rounded-3xl relative overflow-hidden group flex-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="text-right">
          <p className="text-xs text-textSecondary-light dark:text-textSecondary-dark uppercase tracking-wider font-semibold">{label}</p>
          <div className="text-2xl font-bold mt-1">
            <AnimatedNumber value={typeof value === 'string' ? parseFloat(value) : value} suffix={unit} />
          </div>
        </div>
      </div>

      {/* Progress Ring / Bar */}
      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
      
      {/* Subtle background glow */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 rounded-full ${color}`} />
    </motion.div>
  );
};

const VitalStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard 
        icon={Droplets} 
        label="Blood Pressure" 
        value={116} 
        unit="/70" 
        color="bg-blue-500" 
        delay={0.2} 
        progress={75}
      />
      <StatCard 
        icon={Heart} 
        label="Heart Rate" 
        value={120} 
        unit=" bpm" 
        color="bg-accent-red" 
        delay={0.3} 
        progress={85}
      />
      <StatCard 
        icon={Wind} 
        label="SpO2" 
        value={98.5} 
        unit="%" 
        color="bg-accent-cyan" 
        delay={0.4} 
        progress={98}
      />
      <StatCard 
        icon={Thermometer} 
        label="Temperature" 
        value={34.7} 
        unit="°C" 
        color="bg-orange-500" 
        delay={0.5} 
        progress={65}
      />
    </div>
  );
};

export default VitalStats;
