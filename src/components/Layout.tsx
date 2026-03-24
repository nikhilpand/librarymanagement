import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm px-6 py-3 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-surface-container overflow-hidden cursor-pointer"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHkIxGqrB-IJwv-gx_Gc4GmAzSRrjehCP_wPW87o7FwnmhT230ll2muZ7I0UNx9UbRfWgFKjh42Lj2rIh6g5V-hUfJ-O7L4ja1W7bCZ6OWuUIGUmFb5oceADFPzlRheThQ79GRE4j-hwPWl40EQjl1kCSWmfznmqUqjd7F6MClCcqCateHiSkPDET7FupjaEtjpHFCoGE6hHbjWPXOMQpqM6VkZfuPbhL3eLaxTOBpdNtyTbTHaActdgcVgDsrLFaq4H1w_s6wEsI" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h1 className="font-headline font-extrabold tracking-tighter text-xl text-primary">The Atelier</h1>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {['Dashboard', 'Seats', 'Profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
              className="relative text-sm font-semibold transition-colors py-1"
            >
              <span className={activeTab === tab ? 'text-primary' : 'text-secondary hover:text-primary'}>
                {tab}
              </span>
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Notifications"
          className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white" />
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-surface-container px-6 py-3 flex justify-around items-center z-50" aria-label="Mobile navigation">
        {[
          { id: 'Dashboard', icon: 'LayoutDashboard' },
          { id: 'Seats', icon: 'Armchair' },
          { id: 'Profile', icon: 'User' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-outline'
            }`}
          >
            <motion.div 
              animate={{ 
                scale: activeTab === tab.id ? 1.1 : 1,
                backgroundColor: activeTab === tab.id ? 'rgba(0, 44, 152, 0.1)' : 'transparent'
              }}
              className="p-2 rounded-2xl"
            >
              <span className="material-symbols-outlined">{tab.icon.toLowerCase()}</span>
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.id}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabMobile"
                className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
