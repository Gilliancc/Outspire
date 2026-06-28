import React, { useState, useEffect } from 'react';
import { InspirationCard } from '../data';
import { motion, useAnimationControls } from 'motion/react';
import Component111Vectorized from '../../imports/111Vectorized-1';
import Component121Vectorized from '../../imports/121Vectorized-1';
import Component211Vectorized from '../../imports/211Vectorized';
import Component221Vectorized from '../../imports/221Vectorized';
import Component311Vectorized from '../../imports/311Vectorized-1';
import Component321Vectorized from '../../imports/321Vectorized-1';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const cardFrontImg = "https://images.unsplash.com/photo-1627909477137-dfef12d46d47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc4MjIyNjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const cardBackImg = "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MjIyNjc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function CardDisplay({ 
  card, 
  isFlipped: externalIsFlipped, // optional external control
  isSmall = false,
  animateEntry = false,
  onFlipped
}: { 
  card: InspirationCard;
  isFlipped?: boolean;
  isSmall?: boolean;
  animateEntry?: boolean;
  onFlipped?: () => void;
}) {
  const isLimited = card.rarity === 'limited';
  const isRare = card.rarity === 'rare';
  const isNormal = card.rarity === 'normal';

  const [internalIsFlipped, setInternalIsFlipped] = useState(externalIsFlipped ?? true);
  const controls = useAnimationControls();

  useEffect(() => {
    if (externalIsFlipped !== undefined) {
      setInternalIsFlipped(externalIsFlipped);
    }
  }, [externalIsFlipped]);

  const onFlippedRef = React.useRef(onFlipped);
  React.useEffect(() => {
    onFlippedRef.current = onFlipped;
  }, [onFlipped]);

  const hasAnimated = React.useRef(false);

  useEffect(() => {
    if (animateEntry && !hasAnimated.current) {
      hasAnimated.current = true;
      // 交互方式：扭一下➡️展示卡片正面➡️翻面。
      const sequence = async () => {
        // Start showing front, slightly rotated for "twist" effect
        setInternalIsFlipped(false);
        await controls.start({
          rotateZ: [5, -5, 0],
          scale: [0.9, 1.05, 1],
          transition: { duration: 0.4, type: "tween", ease: "easeInOut" }
        });
        
        // 悬停时间：800ms
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 自动翻面
        setInternalIsFlipped(true);
        setTimeout(() => {
          if (onFlippedRef.current) onFlippedRef.current();
        }, 600); // Wait for the flip animation (600ms)
      };
      sequence();
    }
  }, [animateEntry, controls]);

  // Use Figma component for normal rarity, otherwise use image placeholder
  const renderFront = () => {
    if (isNormal) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FEFDFA]">
          <Component111Vectorized />
        </div>
      );
    }
    if (isRare) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FFFEFC]">
          <Component211Vectorized />
        </div>
      );
    }
    if (isLimited) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FEFBF8]">
          <Component311Vectorized />
        </div>
      );
    }
    return <ImageWithFallback src={cardFrontImg} alt="Card Front" className="w-full h-full object-cover rounded-[12px] shadow-md" />;
  };

  const renderBackBackground = () => {
    if (isNormal) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FEFCF9]">
          <Component121Vectorized />
        </div>
      );
    }
    if (isRare) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FFFBF8]">
          <Component221Vectorized />
        </div>
      );
    }
    if (isLimited) {
      return (
        <div className="absolute inset-0 w-full h-full rounded-[12px] shadow-md overflow-hidden bg-[#FEFBF9]">
          <Component321Vectorized />
        </div>
      );
    }
    return <ImageWithFallback src={cardBackImg} alt="Card Back" className="w-full h-full object-cover rounded-[12px] shadow-md" />;
  };

  return (
    <div className="relative w-full aspect-[331/460] perspective-[1500px]">
      <motion.div
        animate={controls}
        initial={animateEntry ? { rotateZ: 5, scale: 0.9 } : {}}
        className="relative w-full h-full"
      >
        <motion.div
          animate={{ rotateY: internalIsFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }} // 翻转时间：600ms
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          {/* Front Face */}
          <div 
            style={{ backfaceVisibility: 'hidden' }} 
            className="absolute inset-0 w-full h-full"
          >
            {renderFront()}
            
            {/* Thumbnail Overlay for Text */}
            {isSmall && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/20 shadow-sm z-20 min-h-[40%]">
                <h2 className="text-xs font-bold font-serif text-[#5C5446] mb-1 line-clamp-2 leading-snug">
                  {card.title}
                </h2>
                <p className="text-[9px] text-[#5C5446]/90 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
          </div>

          {/* Back Face */}
          <div 
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} 
            className="absolute inset-0 w-full h-full"
          >
            {renderBackBackground()}
            
            {/* Content on the back */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Rarity Badges */}
              {isRare && !isSmall && (
                <div className="absolute top-6 left-6 bg-white/60 px-3 py-1 rounded-full text-[10px] font-bold text-[#8D9876] tracking-widest uppercase border border-white z-20 pointer-events-auto flex items-center gap-1">
                  <Sparkles size={10} /> 稀有款
                </div>
              )}

              {isLimited && !isSmall && (
                <div className="absolute top-6 left-6 bg-white/60 px-3 py-1 rounded-full text-[10px] font-bold text-[#6D8A96] tracking-widest uppercase border border-white z-20 flex items-center gap-1 pointer-events-auto">
                  <Sparkles size={10} /> 限定款
                </div>
              )}

              <div className={`absolute bottom-[32px] left-[32px] right-[32px] h-[160px] flex flex-col items-center justify-center text-center overflow-hidden ${isSmall ? 'scale-75 origin-bottom' : ''}`}>
                <h2 className={`${isSmall ? 'text-lg' : 'text-xl'} font-bold ${isLimited ? 'mb-3' : 'mb-2'} font-serif text-[#5C5446]`}>
                  {card.title}
                </h2>
                
                <p className={`${isSmall ? 'text-xs' : 'text-sm'} leading-relaxed text-[#5C5446]/80 px-2 line-clamp-4`}>
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
