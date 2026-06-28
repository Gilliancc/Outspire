import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from './StoreContext';
import { InspirationCard, MOCK_CARDS } from './data';
import { fetchEnvironment, getWeatherLabel } from '../utils/environment';
import type { Environment } from '../utils/environment';
import { Ticket, Sparkles, X, History, MapPin, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { CardDisplay as GlobalCardDisplay } from './components/CardDisplay';

const BALL_GRADIENTS = [
  { r: 243, g: 232, b: 224, hex: '#F3E8E0' },
  { r: 227, g: 232, b: 200, hex: '#E3E8C8' },
  { r: 244, g: 217, b: 217, hex: '#F4D9D9' },
  { r: 217, g: 228, b: 244, hex: '#D9E4F4' }
].map(c => `linear-gradient(181deg, rgba(${c.r}, ${c.g}, ${c.b}, 0.20) 0.72%, ${c.hex} 64.09%)`);

function BackgroundSparkles() {
  const sparkles = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [0, -20]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-[#E3E8C8]"
          style={{
            width: s.size,
            height: s.size,
            left: s.left,
            top: s.top,
          }}
        />
      ))}
    </div>
  );
}

export function Home() {
  const { pullsLeft, doPull, todayPulls, visits, markVisited } = useStore();
  const [isPulling, setIsPulling] = useState(false);
  const [pulledCard, setPulledCard] = useState<InspirationCard | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [env, setEnv] = useState<Environment | null>(null);

  // Fetch real-time environment on mount
  useEffect(() => {
    fetchEnvironment().then(setEnv);
  }, []);
  
  // "Been Here" state
  const [showBeenHere, setShowBeenHere] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [thoughtInput, setThoughtInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [pullColor, setPullColor] = useState(BALL_GRADIENTS[2]);

  // Natural pile layout at the bottom of the globe container
  const baseLayout = useMemo(() => [
    // Bottom row
    { x: 10, y: 70 }, { x: 35, y: 75 }, { x: 60, y: 72 }, { x: 80, y: 68 },
    // Second row
    { x: 20, y: 48 }, { x: 45, y: 50 }, { x: 70, y: 45 },
    // Third row
    { x: 30, y: 25 }, { x: 55, y: 22 }, 
    // Top row
    { x: 45, y: 5 }, { x: 25, y: 10 }, { x: 65, y: 8 }
  ], []);

  const balls = useMemo(() => baseLayout.map((pos, i) => ({
    id: i,
    background: BALL_GRADIENTS[i % 4],
    left: pos.x + (Math.random() - 0.5) * 4,
    top: pos.y + (Math.random() - 0.5) * 4,
    speed: 0.6 + Math.random() * 0.8,
  })), [baseLayout]);

  const handlePull = () => {
    if (pullsLeft <= 0 || isPulling || !env) return;

    setIsPulling(true);
    setShowBeenHere(false);
    
    // Pick random ball color for this pull
    setPullColor(BALL_GRADIENTS[Math.floor(Math.random() * BALL_GRADIENTS.length)]);
    
    setTimeout(() => {
      const card = doPull(env!);
      if (card) {
        setPulledCard(card);
      }
      setIsPulling(false);
    }, 1500);
  };

  const handleMark = () => {
    if (pulledCard) {
      markVisited(pulledCard.id, thoughtInput, env ? getWeatherLabel(env.weather) : '晴天');
    }
    setShowMarkModal(false);
    setPulledCard(null);
    setThoughtInput("");
    
    // Show toast
    setToastMessage("记录保存成功");
  };

  const location = useLocation();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    // Check if we just returned from a card detail viewed via today's luck
    if ((location.state as any)?.openToday) {
      setDrawerOpen(true);
      // Clear the state so it doesn't reopen if the user refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const uniqueTodayCardIds = Array.from(new Set(todayPulls.map(p => p.cardId)));
  const todayCards = uniqueTodayCardIds.map(id => MOCK_CARDS.find(c => c.id === id)!).filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 perspective-[1000px]">
      <BackgroundSparkles />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-white/90 backdrop-blur-md text-[#8D9876] px-6 py-3 rounded-full shadow-xl font-bold border border-white/50 flex items-center gap-2"
          >
            <div className="w-5 h-5 bg-[#8D9876] rounded-full flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gacha Machine */}
      <div className="relative flex flex-col items-center mt-4">
        <motion.div 
          animate={isPulling ? { 
            rotate: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: isPulling ? 2 : 0 }}
          className="relative w-64 h-80 bg-white/60 backdrop-blur-xl rounded-t-[100px] rounded-b-3xl shadow-xl border-4 border-white/80 p-4 flex flex-col items-center justify-end overflow-hidden"
        >
          {/* Glass dome reflection */}
          <div className="absolute top-4 left-6 w-16 h-32 bg-white/40 rounded-full blur-md rotate-12 z-20 pointer-events-none" />
          
          {/* Dynamic Balls Container with Pyramidal Layout */}
          <div className="absolute top-1/4 left-4 right-4 bottom-24 opacity-90">
            {balls.map((b) => (
              <motion.div
                key={b.id}
                animate={{ y: [0, -3, 0] }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: Math.random() * 2 
                }}
                className="absolute w-10 h-10"
                style={{
                  left: `${b.left}%`,
                  top: `${b.top}%`,
                  background: b.background,
                  borderRadius: '33554400px',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                }}
              />
            ))}
          </div>

          {/* Machine base */}
          <div className="w-full h-24 bg-[#E3E8C8] rounded-xl z-10 flex flex-col items-center justify-center shadow-inner relative">
            <motion.div 
              animate={isPulling ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full bg-white/50 border-4 border-white/80 flex items-center justify-center shadow-inner"
            >
              <div className="w-8 h-2 bg-[#8D9876]/30 rounded-full" />
            </motion.div>
            <div className="absolute bottom-2 right-4 w-12 h-12 bg-black/5 rounded-lg border-2 border-white/30" />
            
            {/* Flat falling ball animation */}
            <AnimatePresence>
              {isPulling && (
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ 
                    y: { type: 'spring', bounce: 0.4, delay: 0.6 },
                    opacity: { delay: 0.6 }
                  }}
                  className="absolute bottom-4 right-6 w-8 h-8 z-20"
                  style={{
                    background: pullColor,
                    borderRadius: '33554400px',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Twist Button */}
        <button
          onClick={handlePull}
          disabled={pullsLeft <= 0 || isPulling}
          className="mt-8 relative group"
        >
          <div className="absolute inset-0 bg-[#8D9876] rounded-full blur-md opacity-20 group-active:opacity-40 transition-opacity" />
          <motion.div 
            whileTap={pullsLeft > 0 && !isPulling ? { scale: 0.95, y: 4 } : {}}
            className={`relative px-12 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-3 transition-colors ${
              pullsLeft > 0 
                ? 'bg-white text-[#5C5446] active:bg-[#FDFBF7]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {pullsLeft > 0 ? (
              <>
                <Ticket className="w-6 h-6 text-[#8D9876]" />
                <span>扭一下 ({pullsLeft}/10)</span>
              </>
            ) : (
              <span>今日灵感够多啦，出门走走吧</span>
            )}
          </motion.div>
        </button>
      </div>

      {/* Today's Luck Drawer Toggle */}
      <button 
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 text-sm text-[#8D9876]/60 flex items-center gap-1 hover:text-[#8D9876] transition-colors bg-white/40 px-4 py-2 rounded-full backdrop-blur-sm z-10"
      >
        <History size={16} />
        <span>今日手气</span>
      </button>

      {/* Use Portals for Modals to cover entire screen, escaping stacking contexts */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Card Drop Modal */}
          <AnimatePresence>
            {pulledCard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-6 perspective-[1200px]"
              >
                <motion.div
                  initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
                  animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                  exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full max-w-[331px] flex flex-col gap-4"
                >
                  <GlobalCardDisplay 
                    card={pulledCard} 
                    animateEntry={true} 
                    onFlipped={() => setShowBeenHere(true)} 
                  />
                  
                  <div className="h-14"> {/* Placeholder to keep layout stable */}
                    <AnimatePresence>
                      {showBeenHere && (
                        <motion.button 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => setShowMarkModal(true)}
                          className="w-full h-full flex items-center justify-center gap-2 rounded-2xl font-medium transition-transform active:scale-95 bg-[#8D9876] text-white shadow-lg text-center"
                        >
                          <Check size={20} />
                          <span>去过啦</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={() => setPulledCard(null)}
                    className="absolute -top-12 right-0 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-[#5C5446] hover:bg-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mark Visit Modal (Stacked above Gacha Result) */}
          <AnimatePresence>
            {showMarkModal && (
              <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl"
                >
                  <h2 className="text-xl font-bold mb-4 font-serif">记录这一次探索</h2>
                  <p className="text-sm text-gray-500 mb-4">留一句碎碎念给后来的人？（可不填）</p>
                  
                  <textarea 
                    value={thoughtInput}
                    onChange={e => setThoughtInput(e.target.value)}
                    placeholder="这一刻的风、阳光或者心情..."
                    className="w-full bg-[#FDFBF7] border border-[#E3E8C8] rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#8D9876]/50 resize-none mb-6 text-sm"
                  />
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowMarkModal(false)} // Only close the mark modal
                      className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-500 font-medium active:scale-95 transition-transform"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleMark}
                      className="flex-1 py-3 rounded-xl bg-[#8D9876] text-white font-medium shadow-md shadow-[#8D9876]/20 active:scale-95 transition-transform"
                    >
                      确认记录
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Today's Luck Drawer with Blur Backdrop */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDrawerOpen(false)}
                  className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed bottom-0 left-0 right-0 z-[100] bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[80vh]"
                >
                  <div className="flex-shrink-0 pt-5 px-6 pb-4 border-b border-gray-50 flex flex-col items-center">
                    <h3 className="text-xl font-bold font-serif text-[#5C5446] flex items-center justify-center gap-2">
                      <History className="text-[#8D9876]" size={20} />
                      今日手气
                    </h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-6 pt-4 pb-12">
                    {todayCards.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <p>今天还没有抽取过灵感喔</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {todayCards.map(card => {
                          const isVisited = visits.some(v => v.cardId === card.id);
                          
                          return (
                            <Link to={`/card/${card.id}`} state={{ fromToday: true }} key={card.id} onClick={() => setDrawerOpen(false)}>
                              <div className="relative active:scale-95 transition-transform">
                                {isVisited && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8D9876] rounded-full z-20 shadow-sm border-2 border-white flex items-center justify-center">
                                    <Check size={8} className="text-white" />
                                  </div>
                                )}
                                <GlobalCardDisplay card={card} isFlipped={false} isSmall={true} />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </div>
  );
}