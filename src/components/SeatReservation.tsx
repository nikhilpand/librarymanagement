import React, { useState } from 'react';
import { Info, Clock, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function SeatReservation() {
  const [selectedSeat, setSelectedSeat] = useState('A-14');
  const [activeZone, setActiveZone] = useState('All Zones');
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const zones = ['All Zones', 'Quiet Zone', 'Collaborative'];

  // Mock seat data
  const [seats, setSeats] = useState(Array.from({ length: 24 }, (_, i) => ({
    id: `A-${i + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
  })));

  const handleSeatClick = (seatId: string, status: string) => {
    if (status === 'occupied') return;
    setSelectedSeat(seatId);
  };

  const handleConfirm = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsConfirmed(true);
      setTimeout(() => setIsConfirmed(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        role="region"
        aria-labelledby="reservation-title"
      >
        <div>
          <h2 id="reservation-title" className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">Reserve Your Space</h2>
          <p className="text-secondary font-medium max-w-lg">Select a curated workstation designed for deep focus and scholarly inquiry.</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-surface-container-low rounded-2xl" role="group" aria-label="Filter by zone">
          {zones.map((zone) => (
            <motion.button
              key={zone}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveZone(zone)}
              aria-pressed={activeZone === zone}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                activeZone === zone 
                  ? "bg-surface-container-lowest text-primary shadow-sm" 
                  : "text-secondary hover:bg-surface-container-high"
              )}
            >
              {zone}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Seat Map Area */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 bg-surface-container-low rounded-3xl p-8 relative overflow-hidden"
          aria-label="Interactive seat map"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20" role="legend">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-tertiary-fixed" aria-hidden="true"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-surface-dim" aria-hidden="true"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" aria-hidden="true"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Selected</span>
              </div>
            </div>
            <motion.div 
              key={activeZone}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-secondary font-medium text-sm"
            >
              Level 2: The Archive Wing • {activeZone}
            </motion.div>
          </div>

          {/* Seat Layout */}
          <div className="grid grid-cols-8 gap-4 md:gap-6 py-10" role="grid" aria-label="Seating grid">
            {/* Left Column */}
            <div className="col-span-1 space-y-4" role="row">
              {['L1', 'L2', 'L3'].map(id => (
                <div key={`occupied-${id}`} className="w-full aspect-square bg-surface-dim rounded-lg cursor-not-allowed" role="gridcell" aria-label={`Seat ${id} occupied`} />
              ))}
              <motion.button 
                key="L-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSeatClick('L-4', 'available')}
                role="gridcell"
                aria-label="Seat L-4 available"
                aria-pressed={selectedSeat === 'L-4'}
                className={cn(
                  "w-full aspect-square rounded-lg transition-all cursor-pointer",
                  selectedSeat === 'L-4' ? "bg-primary seat-glow ring-4 ring-primary-fixed-dim" : "bg-tertiary-fixed"
                )}
              />
            </div>

            {/* Corridor */}
            <div key="corridor-left" className="col-span-1 border-r border-dashed border-outline-variant/30" />

            {/* Main Block */}
            <div className="col-span-4 grid grid-cols-4 gap-4" role="row">
              {seats.slice(0, 4).map(seat => (
                <motion.button 
                  key={`main-seat-${seat.id}`}
                  whileHover={seat.status !== 'occupied' ? { scale: 1.1 } : {}}
                  whileTap={seat.status !== 'occupied' ? { scale: 0.9 } : {}}
                  onClick={() => handleSeatClick(seat.id, seat.status)}
                  role="gridcell"
                  aria-label={`Seat ${seat.id} ${seat.status}`}
                  aria-pressed={selectedSeat === seat.id}
                  disabled={seat.status === 'occupied'}
                  className={cn(
                    "w-full aspect-square rounded-lg transition-all cursor-pointer",
                    seat.status === 'occupied' ? "bg-surface-dim cursor-not-allowed" : 
                    selectedSeat === seat.id ? "bg-primary seat-glow ring-4 ring-primary-fixed-dim" : "bg-tertiary-fixed"
                  )}
                />
              ))}
              <div key="aisle" className="col-span-4 h-8" aria-hidden="true" /> {/* Aisle */}
              {seats.slice(4, 12).map(seat => (
                <motion.button 
                  key={`main-seat-${seat.id}`}
                  whileHover={seat.status !== 'occupied' ? { scale: 1.1 } : {}}
                  whileTap={seat.status !== 'occupied' ? { scale: 0.9 } : {}}
                  onClick={() => handleSeatClick(seat.id, seat.status)}
                  role="gridcell"
                  aria-label={`Seat ${seat.id} ${seat.status}`}
                  aria-pressed={selectedSeat === seat.id}
                  disabled={seat.status === 'occupied'}
                  className={cn(
                    "w-full aspect-square rounded-lg transition-all cursor-pointer",
                    seat.status === 'occupied' ? "bg-surface-dim cursor-not-allowed" : 
                    selectedSeat === seat.id ? "bg-primary seat-glow ring-4 ring-primary-fixed-dim" : "bg-tertiary-fixed"
                  )}
                />
              ))}
            </div>

            {/* Corridor */}
            <div key="corridor-right" className="col-span-1 border-l border-dashed border-outline-variant/30" />

            {/* Right Column */}
            <div className="col-span-1 space-y-4" role="row">
              {['R1', 'R2', 'R3', 'R4'].map((id, i) => (
                <motion.button 
                  key={`right-seat-${id}`}
                  whileHover={i % 2 === 0 ? { scale: 1.1 } : {}}
                  whileTap={i % 2 === 0 ? { scale: 0.9 } : {}}
                  onClick={() => i % 2 === 0 && handleSeatClick(id, 'available')}
                  role="gridcell"
                  aria-label={`Seat ${id} ${i % 2 !== 0 ? 'occupied' : 'available'}`}
                  aria-pressed={selectedSeat === id}
                  disabled={i % 2 !== 0}
                  className={cn(
                    "w-full aspect-square rounded-lg transition-all cursor-pointer",
                    i % 2 !== 0 ? "bg-surface-dim cursor-not-allowed" : 
                    selectedSeat === id ? "bg-primary seat-glow ring-4 ring-primary-fixed-dim" : "bg-tertiary-fixed"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-surface-container rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Info className="text-secondary" size={20} />
              <p className="text-sm text-secondary italic">Power outlets and ergonomic task lighting available at all Archive Wing stations.</p>
            </div>
          </div>
        </motion.section>

        {/* Booking Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6" aria-label="Booking summary">
          <motion.section 
            layout
            className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-6"
            aria-labelledby="selection-heading"
          >
            <div className="flex items-start justify-between">
              <div aria-live="polite">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary block mb-1">Current Selection</span>
                <motion.h3 
                  id="selection-heading"
                  key={selectedSeat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-headline font-bold text-on-surface"
                >
                  Seat {selectedSeat}
                </motion.h3>
              </div>
              <div className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase">Archive Wing</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
                <Clock className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold uppercase text-secondary">Time Window</p>
                  <p className="text-sm font-semibold">14:00 - 18:00 (4 Hours)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
                <Brain className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold uppercase text-secondary">Zone Protocol</p>
                  <p className="text-sm font-semibold">Absolute Silence Required</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-secondary font-medium">Session Fee</span>
                <span className="font-bold text-lg">$0.00 <span className="text-xs font-medium text-outline ml-1">(Institutional Access)</span></span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={isBooking || isConfirmed}
                className={cn(
                  "w-full font-headline font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
                  isConfirmed ? "bg-tertiary text-white" : "bg-gradient-to-br from-primary to-primary-container text-white"
                )}
              >
                {isBooking ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isConfirmed ? (
                  <>
                    <CheckCircle2 size={20} />
                    Booking Confirmed
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </motion.button>
            </div>
          </motion.section>

          <div className="bg-surface-container-low rounded-3xl p-6">
            <h4 className="font-headline font-bold text-on-surface mb-4">Explore Other Zones</h4>
            <div className="space-y-3">
              {[
                { name: 'Quiet Reading Loft', desc: 'Soft armchairs and natural light.' },
                { name: 'Collaborative Lab', desc: 'Whiteboards and high-speed hubs.' }
              ].map(zone => (
                <motion.div 
                  key={zone.name} 
                  whileHover={{ x: 5 }}
                  className="p-4 bg-white/60 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{zone.name}</span>
                    <ArrowRight className="text-outline group-hover:text-primary transition-colors" size={16} />
                  </div>
                  <p className="text-xs text-secondary mt-1">{zone.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
