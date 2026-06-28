import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useStore } from './StoreContext';
import { MOCK_CARDS } from './data';
import { fetchEnvironment, getWeatherLabel } from '../utils/environment';
import type { Environment } from '../utils/environment';
import { Calendar, Cloud, Check, MessageCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CardDisplay as GlobalCardDisplay } from './components/CardDisplay';

export function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { visits, markVisited } = useStore();
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [thoughtInput, setThoughtInput] = useState("");
  const [env, setEnv] = useState<Environment | null>(null);
  const [publicThoughts, setPublicThoughts] = useState<{ id: number; content: string }[]>([]);

  const fromToday = (location.state as any)?.fromToday;

  const card = MOCK_CARDS.find(c => c.id === id);
  const cardVisits = visits.filter(v => v.cardId === id).sort((a, b) => b.visitedAt - a.visitedAt);
  const hasVisited = cardVisits.length > 0;

  const hasVisitedToday = cardVisits.some(v => {
    const visitDate = new Date(v.visitedAt);
    const today = new Date();
    return visitDate.getDate() === today.getDate() &&
           visitDate.getMonth() === today.getMonth() &&
           visitDate.getFullYear() === today.getFullYear();
  });

  // Fetch environment + public thoughts on mount
  useEffect(() => {
    fetchEnvironment().then(setEnv);
    if (id) {
      fetch(`/api/thoughts/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.thoughts) {
            setPublicThoughts(data.thoughts);
          }
        })
        .catch(() => {
          // 静默降级 — 断网时无碎碎念
        });
    }
  }, [id]);

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-gray-400">找不到这张卡片呢</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#8D9876] underline">返回</button>
      </div>
    );
  }

  const handleMark = () => {
    const weatherTag = env ? getWeatherLabel(env.weather) : '晴天';

    // 本地记录
    markVisited(card.id, thoughtInput, weatherTag);

    // 向服务器提交匿名碎碎念（如果有输入）
    if (thoughtInput.trim()) {
      fetch('/api/thoughts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id, content: thoughtInput.trim() }),
      }).catch(() => {
        // 静默降级
      });
    }

    setShowMarkModal(false);
    setThoughtInput("");
  };

  const isNormal = card.rarity === 'normal';
  const isRare = card.rarity === 'rare';
  const isLimited = card.rarity === 'limited';

  return (
    <div className="px-4 pb-20 pt-4 flex flex-col items-center">
      {/* Card Header Section */}
      <div className="w-full max-w-[331px] mb-8">
        <GlobalCardDisplay card={card} isFlipped={true} />
      </div>

      {fromToday && !hasVisitedToday && (
        <div className="flex justify-center w-full mb-8">
          <button
            onClick={() => setShowMarkModal(true)}
            className="bg-[#8D9876] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#8D9876]/30 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Check size={20} />
            <span>去过啦</span>
          </button>
        </div>
      )}

      {/* Exploration Record (Only shown if visited) */}
      <AnimatePresence>
        {hasVisited && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full max-w-[331px]"
          >
            <div className="mt-4">
              <h3 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2">
                <Calendar size={16} /> 探索记录
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-[#E3E8C8]">
                {cardVisits.map(visit => (
                  <div key={visit.visitId} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-[#8D9876] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#8D9876] rounded-full" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span>{new Date(visit.visitedAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Cloud size={12} /> {visit.weather}</span>
                      </div>
                      {visit.thought && (
                        <p className="text-[#5C5446] text-sm">{visit.thought}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anonymous Thoughts Section — 从后端随机获取 */}
      <div className="mt-8 w-full max-w-[331px]">
        <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
          <MessageCircle size={16} /> 其他人留下的碎碎念
        </h3>
        {publicThoughts.length === 0 ? (
          <div className="bg-white/40 rounded-xl p-6 text-sm text-gray-400 text-center border border-white">
            还没有人留下碎碎念<br/>去体验后分享你的故事吧
          </div>
        ) : (
          <div className="space-y-3">
            {publicThoughts.map((t) => (
              <div key={t.id} className="bg-white/60 p-4 rounded-xl text-sm text-[#5C5446] border border-white backdrop-blur-sm shadow-sm">
                "{t.content}"
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mark Visit Modal */}
      <AnimatePresence>
        {showMarkModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm sm:items-center">
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
                  onClick={() => setShowMarkModal(false)}
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
    </div>
  );
}
