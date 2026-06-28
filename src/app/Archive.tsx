import React from 'react';
import { useStore } from './StoreContext';
import { MOCK_CARDS } from './data';
import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CardDisplay } from './components/CardDisplay';

export function Archive() {
  const { visits } = useStore();

  // 灵感小盒：仅展示用户主动标记「去过啦」的卡片（去重）
  const visitedCardIds = Array.from(new Set(visits.map(v => v.cardId)));
  const collectedCards = visitedCardIds.map(id => MOCK_CARDS.find(c => c.id === id)!).filter(Boolean);

  return (
    <div className="px-6 py-4 pb-20">
      <div className="mb-8 text-center mt-4">
        <h1 className="text-2xl font-bold text-[#5C5446] mb-2 font-serif">灵感小盒</h1>
        <p className="text-[#8D9876] text-sm">你探索过的所有灵感</p>
      </div>

      {collectedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-[#E3E8C8]/30 rounded-full flex items-center justify-center mb-4">
            <MapPin className="text-[#8D9876]/50" size={32} />
          </div>
          <p className="text-gray-400">小盒空空的，<br/>去扭个蛋，开始探索吧。</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {collectedCards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={card.id}
            >
              <Link to={`/card/${card.id}`} className="block active:scale-95 transition-transform relative">
                <CardDisplay card={card} isFlipped={false} isSmall={true} />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
