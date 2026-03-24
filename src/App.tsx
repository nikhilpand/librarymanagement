import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SeatReservation from './components/SeatReservation';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        );
      case 'Seats':
        return (
          <motion.div
            key="seats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SeatReservation />
          </motion.div>
        );
      case 'Profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Profile />
          </motion.div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </Layout>
  );
}
