import { motion } from 'motion/react';
import svgPaths from "./svg-3904okrdch";

export default function Component321Vectorized() {
  return (
    <div className="relative size-full" data-name="3-2 1 [Vectorized]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 331 460">
        <g id="3-2 1 [Vectorized]">
          <rect fill="#FEFBF9" height="460" width="331" />
          <rect fill="var(--fill-0, #FEFBF8)" height="388" id="background" rx="30" width="280" x="26" y="36" />
          <path d={svgPaths.p1362e480} fill="var(--fill-0, #F3F3F0)" id="background_2" />
          <g id="background_3">
            <path d={svgPaths.p2e163500} fill="var(--fill-0, #EAEBE7)" id="Vector 7" />
            
            <path 
              d={svgPaths.p11dbd000} 
              fill="var(--fill-0, #D6DDDF)" 
              id="Vector 5" 
            />
            <path 
              d={svgPaths.p10779e00} 
              fill="var(--fill-0, #B6C6CB)" 
              id="Vector" 
            />
            <path 
              d={svgPaths.p2993b480} 
              fill="var(--fill-0, #B9CDCC)" 
              id="Vector_2" 
            />
          </g>
          <path d={svgPaths.pcf68c80} fill="var(--fill-0, #E3E6E9)" id="Vector_3" />
          
          <motion.path 
            animate={{ y: [-3, 3, -3], rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: 0.5, originY: 0.5 }}
            d={svgPaths.p25628d00} 
            fill="var(--fill-0, #F3E6CD)" 
            id="moon" 
          />
          
          {/* Stars twinkling */}
          <motion.path animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} style={{ originX: 0.5, originY: 0.5 }} d={svgPaths.p24d27c00} fill="var(--fill-0, #F2E6CE)" id="star" />
          <motion.path animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} style={{ originX: 0.5, originY: 0.5 }} d={svgPaths.p13e9cc80} fill="var(--fill-0, #F2E6CE)" id="star_2" />
          <motion.path animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} d={svgPaths.p2c3cd000} fill="var(--fill-0, #F2E6CE)" id="star_3" />
          <motion.path animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} style={{ originX: 0.5, originY: 0.5 }} d={svgPaths.p28cad830} fill="var(--fill-0, #F2E6CE)" id="star_4" />
          <motion.path animate={{ opacity: [0.1, 0.7, 0.1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} d={svgPaths.p29158980} fill="var(--fill-0, #F2E6CE)" id="star_5" />
          
          <g id="Stamp Border">
            <path d={svgPaths.p2f535480} fill="var(--fill-0, #E6EAEB)" id="Union" />
          </g>
          <motion.g 
            id="tree"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
          >
            <path d={svgPaths.p369ade00} fill="var(--fill-0, #B8CBBB)" id="Vector_4" />
            <path d={svgPaths.p6050a00} fill="var(--fill-0, #A3B8B2)" id="Vector_5" />
            <path d={svgPaths.p2b247500} fill="var(--fill-0, #A3B8B2)" id="Vector_6" />
            <rect fill="var(--fill-0, #A3B8B2)" height="21" id="Rectangle 12" rx="2" width="5" x="271" y="233" />
          </motion.g>
          <motion.g 
            id="tree_2"
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
          >
            <path d={svgPaths.p3e42c500} fill="var(--fill-0, #A3B8B2)" id="Vector_7" />
            <path d={svgPaths.p197f4e00} fill="var(--fill-0, #B9C9C6)" id="Vector_8" />
            <path d={svgPaths.p39da2500} fill="var(--fill-0, #A3B8B2)" id="Vector_9" />
            <path d={svgPaths.p22f6a100} fill="var(--fill-0, #A3B8B2)" id="Vector_10" />
            <path d={svgPaths.p99063f0} fill="var(--fill-0, #A3B8B2)" id="Vector_11" />
            <path d={svgPaths.p3e281000} fill="var(--fill-0, #A3B8B2)" id="Vector_12" />
            <path d={svgPaths.p36add500} fill="var(--fill-0, #A3B8B2)" id="Vector 6" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}