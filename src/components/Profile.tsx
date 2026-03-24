import React, { useState } from 'react';
import { Verified, IdCard, School, TrendingUp, ChevronLeft, ChevronRight, MoreVertical, Settings, Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Profile() {
  const [preferences, setPreferences] = useState([
    { id: 'reminders', label: 'Seat Reminders', desc: 'Notify 15m before booking starts', active: true },
    { id: 'quiet', label: 'Quiet Mode Alerts', desc: 'Noise level warnings in zone', active: false },
    { id: 'reports', label: 'Weekly Reports', desc: 'Summary of study hours via email', active: true }
  ]);

  const [preferredZone, setPreferredZone] = useState('Main Archive');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Profile Header Bento */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12"
        aria-label="Profile Summary"
      >
        <section className="md:col-span-8 bg-surface-container-lowest p-8 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-8" aria-label="Personal Information">
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/20"
              aria-label="Profile picture of Julian Thorne. Click to edit."
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf29X9ujMMw5xkEH4m9C3KqnnumWo-1pbX-ootWIkn0vyTc3qerWKv-61Q2MgUE5IEwL4uKiVpxA2FVAzE6boxQ7-Dw__8n_3J73SZeTLGA4FIPOk-o7j2bsmhucEOHipEUZSLOub2ZETSlbGvHnpnT6wHxIwVDFr7FjcgIsWLgHEfVV_EbJL4l2MfreunhoqAKd_SXISzeCuSRwtVbUVM-xvI8_9KWx6bna-IUUYw9QjQ0AygpSc1YaFO5J7gZfFyPpu1ZfSvkWQ" 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.button>
            <div className="absolute bottom-0 right-0 bg-tertiary text-white p-1.5 rounded-full border-4 border-surface-container-lowest" aria-label="Verified account status: Verified">
              <Verified size={14} fill="currentColor" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-headline font-extrabold text-4xl tracking-tight text-on-surface mb-1">Julian Thorne</h1>
            <p className="text-secondary font-medium mb-4">Postgraduate Research Fellow • Modernist Architecture</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-surface-container rounded-full flex items-center gap-2" role="group" aria-label="Student ID">
                <IdCard size={16} className="text-secondary" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide">ID: ATH-9022-81</span>
              </div>
              <div className="px-4 py-2 bg-surface-container rounded-full flex items-center gap-2" role="group" aria-label="Faculty">
                <School size={16} className="text-secondary" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide">Faculty of Arts</span>
              </div>
            </div>
          </div>
        </section>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-4 bg-primary text-on-primary p-8 rounded-[3rem] flex flex-col justify-center items-center text-center relative overflow-hidden"
          role="status"
          aria-label="Total study hours: 124"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50" />
          <div className="relative z-10">
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="font-headline font-bold text-6xl mb-2 block"
              aria-hidden="true"
            >
              124
            </motion.span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total Study Hours</span>
            <div className="mt-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <TrendingUp size={16} className="text-tertiary-fixed" aria-hidden="true" />
              <span className="text-sm font-medium">+12% from last month</span>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-low p-8 rounded-[3rem]"
            aria-labelledby="intensity-heading"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 id="intensity-heading" className="font-headline font-bold text-2xl tracking-tight mb-1">Study Intensity</h2>
                <p className="text-secondary text-sm">Visual distribution of hours over the past month</p>
              </div>
              <div className="flex gap-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }} 
                  className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }} 
                  className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </motion.button>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-48 gap-2" role="img" aria-label="Bar chart showing study intensity over time">
              {[40, 65, 85, 30, 55, 90, 45, 70, 20, 60, 80, 50].map((h, i) => (
                <motion.div 
                  key={`intensity-bar-${i}`} 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  whileHover={{ scaleY: 1.05, originY: 1 }}
                  transition={{ 
                    height: { delay: i * 0.05, duration: 0.5 },
                    scaleY: { duration: 0.2 }
                  }}
                  className={cn(
                    "flex-1 rounded-t-xl transition-all relative group",
                    i === 2 ? "bg-primary" : "bg-surface-dim hover:bg-primary-container"
                  )}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-on-surface text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity" aria-hidden="true">
                    {(h/10).toFixed(1)}h
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-1" aria-hidden="true">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Oct 01</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Oct 15</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Oct 30</span>
            </div>
          </motion.section>

          <section className="space-y-4" aria-labelledby="history-heading">
            <h3 id="history-heading" className="font-headline font-bold text-xl px-2">Seat Booking History</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { wing: 'East Wing, Carrel 42', date: 'Monday, Oct 28 • 09:00 - 17:00', status: 'Completed' },
                { wing: 'Central Archive, Table 09', date: 'Friday, Oct 25 • 13:00 - 18:30', status: 'Completed' },
                { wing: 'Reading Room B, Sofa 02', date: 'Wednesday, Oct 23 • 10:00 - 14:00', status: 'Cancelled' }
              ].map((item, i) => (
                <motion.div 
                  key={`booking-${i}`} 
                  whileHover={{ scale: 1.01 }}
                  className="bg-surface-container-lowest p-6 rounded-full flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && console.log('Booking clicked')}
                  aria-label={`Booking at ${item.wing} on ${item.date}. Status: ${item.status}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl" aria-hidden="true">event_seat</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg">{item.wing}</h4>
                      <p className="text-secondary text-sm font-medium">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:block text-right">
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Status</span>
                      <span className={cn(
                        "px-3 py-1 text-[10px] font-bold uppercase rounded-full",
                        item.status === 'Completed' ? "bg-tertiary-fixed text-on-tertiary-fixed" : "bg-error-container text-on-error-container"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <button className="text-secondary hover:text-primary" aria-label="More options">
                      <MoreVertical size={20} aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="space-y-8" aria-label="Settings and ID">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-[3rem] shadow-sm"
            aria-labelledby="preferences-heading"
          >
            <div className="flex items-center gap-3 mb-8">
              <Settings className="text-primary" size={24} aria-hidden="true" />
              <h3 id="preferences-heading" className="font-headline font-bold text-xl">Preferences</h3>
            </div>
            <div className="space-y-6">
              {preferences.map(pref => (
                <div key={pref.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{pref.label}</h4>
                    <p className="text-xs text-secondary">{pref.desc}</p>
                  </div>
                  <button 
                    onClick={() => togglePreference(pref.id)}
                    aria-pressed={pref.active}
                    aria-label={`Toggle ${pref.label}`}
                    className={cn(
                      "w-12 h-6 rounded-full relative p-1 transition-colors",
                      pref.active ? "bg-primary" : "bg-surface-container-highest"
                    )}
                  >
                    <motion.div 
                      animate={{ x: pref.active ? 24 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-outline-variant/10">
              <h4 className="font-bold text-sm mb-4">Preferred Study Zone</h4>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preferred study zone">
                {['Silent Wing', 'Main Archive', 'Garden Terrace'].map(zone => (
                  <motion.button 
                    key={zone} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPreferredZone(zone)}
                    role="radio"
                    aria-checked={preferredZone === zone}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer",
                      preferredZone === zone ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary hover:bg-surface-container-highest"
                    )}
                  >
                    {zone}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>

          <section className="bg-surface-container-high p-8 rounded-[3rem]" aria-labelledby="assistance-heading">
            <h3 id="assistance-heading" className="font-headline font-bold text-lg mb-4">Need Assistance?</h3>
            <p className="text-sm text-secondary mb-6 leading-relaxed">For disputes regarding attendance logs or booking errors, contact the Registrar’s Office.</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-surface-container-lowest text-primary font-bold rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2"
              aria-label="Open support ticket"
            >
              <Mail size={16} aria-hidden="true" />
              Open Support Ticket
            </motion.button>
          </section>

          <section className="p-8 bg-on-surface text-white rounded-[3rem] relative overflow-hidden group" aria-labelledby="token-heading">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" aria-hidden="true">
              <ShieldCheck size={120} />
            </div>
            <h3 id="token-heading" className="font-headline font-bold text-lg mb-2 relative z-10">Digital ID Token</h3>
            <p className="text-xs text-white/60 mb-6 relative z-10">Refreshed every 24 hours for security</p>
            <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between relative z-10 backdrop-blur-md">
              <span className="font-mono text-sm tracking-widest" aria-label="Token value">•••• •••• 8291</span>
              <motion.button 
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                onClick={handleRefresh}
                className="cursor-pointer hover:text-primary-fixed-dim"
                aria-label="Refresh token"
                aria-live="polite"
              >
                <RefreshCw size={16} aria-hidden="true" />
              </motion.button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
