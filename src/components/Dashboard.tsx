import React, { useState, useEffect } from 'react';
import { LogOut, LogIn, Coffee, QrCode, Radio, Award, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [seconds, setSeconds] = useState(15720); // 04:22:00 in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Hero Attendance Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 flex flex-col gap-8"
          role="region"
          aria-label="Attendance and Activity"
        >
          <section className="bg-surface-container-lowest rounded-[3rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-5" aria-hidden="true">
              <Award size={120} />
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">Daily Session</h2>
            <p className="text-secondary font-medium mb-8">Oxford Wing • Seat 42B</p>

            {/* Circular Progress */}
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center" role="img" aria-label="Session progress timer">
              <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                <circle className="text-surface-container-high" cx="128" cy="128" fill="transparent" r="120" stroke="currentColor" strokeWidth="8" />
                <motion.circle 
                  initial={{ strokeDashoffset: 753 }}
                  animate={{ strokeDashoffset: isCheckedIn ? 180 : 753 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-primary" 
                  cx="128" cy="128" fill="transparent" r="120" stroke="currentColor" 
                  strokeDasharray="753" strokeWidth="12" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center" aria-live="polite" aria-atomic="true">
                <motion.span 
                  key={seconds}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-headline text-5xl font-extrabold text-primary"
                >
                  {formatTime(seconds)}
                </motion.span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-1">
                  {isCheckedIn ? 'Hours Active' : 'Session Paused'}
                </span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCheckedIn(!isCheckedIn)}
              aria-pressed={isCheckedIn}
              aria-label={isCheckedIn ? "Check out from session" : "Check in to session"}
              className={cn(
                "px-12 py-5 rounded-full font-headline font-bold text-lg shadow-lg transition-all flex items-center gap-3",
                isCheckedIn 
                  ? "bg-gradient-to-br from-primary to-primary-container text-white" 
                  : "bg-surface-container-high text-primary"
              )}
            >
              {isCheckedIn ? <LogOut size={20} aria-hidden="true" /> : <LogIn size={20} aria-hidden="true" />}
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </motion.button>
          </section>

          {/* Activity Log */}
          <section className="bg-surface-container-low rounded-[3rem] p-8" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="font-headline text-xl font-bold mb-6 px-4">Today's Timeline</h2>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key="entry-log-item"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="bg-surface-container-lowest p-6 rounded-full flex items-center justify-between shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                      <LogIn className="text-tertiary" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Entry Recorded</p>
                      <p className="text-sm text-secondary">Main Entrance • NFC Scan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-headline font-bold text-primary">08:45 AM</p>
                  </div>
                </motion.div>

                {!isCheckedIn && (
                  <motion.div 
                    key="exit-log-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-error-container/20 p-6 rounded-full flex items-center justify-between border border-error/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
                        <LogOut className="text-error" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-error">Session Ended</p>
                        <p className="text-sm text-error/70">Manual Checkout</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-headline font-bold text-error">Just Now</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-surface-container-lowest/50 p-6 rounded-full flex items-center justify-between opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <Coffee className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Brief Absence</p>
                    <p className="text-sm text-secondary">Cafeteria Hub</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-bold text-secondary">10:15 - 10:30</p>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Sidebar Context */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 flex flex-col gap-6"
          aria-label="Access and Insights"
        >
          {/* Digital Key Card */}
          <section className="glass-panel p-8 rounded-[3rem] shadow-xl flex flex-col items-center text-center" aria-labelledby="access-heading">
            <h3 id="access-heading" className="font-headline font-bold text-secondary mb-6">Physical Access</h3>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-2xl mb-6 shadow-inner cursor-pointer"
              role="button"
              aria-label="Show QR Access Code"
            >
              <div className="w-32 h-32 bg-on-surface rounded-lg flex items-center justify-center">
                <QrCode className="text-white" size={80} aria-hidden="true" />
              </div>
            </motion.div>
            <p className="text-sm font-medium text-on-surface-variant mb-4">Scan at any terminal or use NFC</p>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full" role="status" aria-label="NFC Status: Active">
              <Radio className="text-primary animate-pulse" size={16} aria-hidden="true" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">NFC Active</span>
            </div>
          </section>

          {/* Insights Card */}
          <motion.section 
            whileHover={{ y: -5 }}
            className="bg-tertiary text-white p-8 rounded-[3rem] shadow-lg cursor-default"
            aria-labelledby="insights-heading"
          >
            <div className="flex justify-between items-start mb-6">
              <Award size={32} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">Weekly Status</span>
            </div>
            <h3 id="insights-heading" className="font-headline text-2xl font-extrabold mb-1">On Track</h3>
            <p className="text-sm opacity-90 mb-6">You have completed 88% of your scheduled studio hours this week.</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={88} aria-valuemin={0} aria-valuemax={100} aria-label="Weekly study hours progress">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-tertiary-fixed h-full" 
              />
            </div>
          </motion.section>

          {/* Upcoming Reservation */}
          <section className="bg-surface-container-high p-8 rounded-[3rem]" aria-labelledby="reservation-heading">
            <h3 id="reservation-heading" className="font-headline font-bold text-on-surface mb-4">Next Reservation</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="font-bold text-primary">Seminar Room C</p>
                <p className="text-sm text-secondary">Tomorrow • 10:00 AM</p>
              </div>
              <Calendar className="text-secondary" size={24} aria-hidden="true" />
            </div>
          </section>
        </motion.aside>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
