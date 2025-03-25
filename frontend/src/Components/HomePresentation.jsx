import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import NavBar2 from '../Components/NavBar2';
import Home from '../Pages/Home';
import Present from '../Pages/Present';

function HomePresention() {
  const location = useLocation();

  return (
    <>
      <NavBar2 />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } />
          <Route path="/present" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Present />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default HomePresention;