import { motion } from 'motion/react';
import svgPaths from "./svg-4qivjjy4nv";

function Group() {
  return (
    <div className="absolute inset-[43.48%_28.76%_51.67%_66.46%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8419 22.3078">
        <g id="Group 3">
          <path d={svgPaths.p23b7f80} fill="var(--fill-0, #EEE3D0)" id="Vector" />
          <path d={svgPaths.p3258f380} fill="var(--fill-0, #EEE1CB)" id="Vector_2" />
          <path d={svgPaths.p101f2000} fill="var(--fill-0, #EEE1CB)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[200px] top-[170px]">
      <div className="absolute bg-[#f5ebdd] border border-[#f4e5d3] border-solid h-[86px] left-[200px] opacity-80 rounded-[13px] top-[170px] w-[55px]" />
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[46.71%_38.92%_44.13%_47.92%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.5639 42.1265">
        <g id="Group 5">
          <g id="Vector">
            <path d={svgPaths.p2cdfc600} fill="url(#paint0_linear_31_62)" />
            <path d={svgPaths.p385ac7c0} stroke="var(--stroke-0, #EBE3CA)" strokeOpacity="0.5" />
          </g>
          <path d={svgPaths.p39511200} fill="url(#paint1_linear_31_62)" id="Vector_2" opacity="0.4" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_31_62" x1="21.782" x2="21.782" y1="0" y2="41.871">
            <stop stopColor="#F8F3D4" stopOpacity="0.91" />
            <stop offset="1" stopColor="#E8E6D9" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_31_62" x1="21.3823" x2="21.3823" y1="37.1265" y2="42.1265">
            <stop stopColor="#DFDDCE" stopOpacity="0" />
            <stop offset="1" stopColor="#DFDDCE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents left-[15.28px] top-[23.22px]" data-name="background">
      <div className="absolute inset-[5.05%_4.86%_43.48%_4.62%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 299.643 236.755">
          <path d={svgPaths.p3e98f700} fill="var(--fill-0, #FDF9F4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[50.41%_5.29%_41.52%_4.98%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 297 37.1093">
          <path d={svgPaths.p2025b3f0} fill="var(--fill-0, #F3EEE3)" id="Vector 4" />
        </svg>
      </div>
      <Group1 />
      <Group2 />
    </div>
  );
}

function BotanicalBorder() {
  return (
    <div className="absolute inset-[4.66%_4.94%_4.33%_4.55%]" data-name="Botanical Border">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 299.564 418.644">
        <g id="Botanical Border">
          <path d={svgPaths.pc7b4e00} fill="var(--fill-0, #E5E6CE)" id="Vector" />
          <path d={svgPaths.pbbc0680} fill="var(--fill-0, #DDDEC2)" id="Vector_2" />
          <path d={svgPaths.p1178b680} fill="var(--fill-0, #E5E6CE)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Bottle() {
  return (
    <div className="absolute h-[102.186px] left-[65px] top-[165px] w-[54.71px]" data-name="bottle">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.7099 102.186">
        <g id="bottle">
          <path d={svgPaths.p203c9800} fill="url(#paint0_linear_31_68)" id="Union" />
          <path d={svgPaths.p2d82ea80} fill="var(--fill-0, #D6D7BD)" id="Vector" />
          <path d={svgPaths.p3da45d30} fill="var(--fill-0, #E7E3C8)" id="Union_2" />
          <rect fill="var(--fill-0, #E2DBB5)" height="9" id="Rectangle 6" opacity="0.7" rx="4.5" width="32" x="10.9999" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_31_68" x1="27.3549" x2="27.3549" y1="0" y2="102.186">
            <stop stopColor="#F8F3D4" stopOpacity="0.91" />
            <stop offset="1" stopColor="#E8E6D9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function GinkgoLeaf() {
  return (
    <motion.div 
      className="absolute h-[106.066px] left-[73.72px] top-[59.4px] w-[110.725px]" 
      data-name="Ginkgo Leaf"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: 0.2, originY: 1 }}
    >
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110.725 106.066">
        <g id="Ginkgo Leaf">
          <path d={svgPaths.p2ba22f00} fill="var(--fill-0, #DDDCC0)" id="Vector" />
          <path d={svgPaths.p398bee80} fill="var(--fill-0, #DDDCC0)" id="Vector_2" />
          <path d={svgPaths.p2a9cdc92} fill="var(--fill-0, #E6E3CC)" id="Vector_3" />
          <path d={svgPaths.p1c5ea300} fill="var(--fill-0, #E6E3CC)" id="Vector_4" />
          <path d={svgPaths.pb235d80} fill="var(--fill-0, #E6E3CC)" id="Vector_5" />
          <path d={svgPaths.p9a03100} fill="var(--fill-0, #E6E3CC)" id="Vector_6" />
          <path d={svgPaths.p185c3a00} fill="var(--fill-0, #E6E3CC)" id="Vector_7" />
          <path d={svgPaths.p10fe9100} fill="var(--fill-0, #C7C8AC)" id="Union" />
        </g>
      </svg>
    </motion.div>
  );
}

export default function Component221Vectorized() {
  return (
    <div className="bg-[#fffbf8] relative size-full" data-name="2-2 1 [Vectorized]">
      <Background />
      <div className="absolute inset-[5.12%_63.56%_94.66%_25.33%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.76 1.02896">
          <path d={svgPaths.p27ab6000} fill="var(--fill-0, #DDDCC0)" id="Vector" />
        </svg>
      </div>
      <motion.div 
        className="absolute inset-[16.25%_81.65%_81.5%_16.1%]" 
        data-name="Decorative Dots"
        animate={{ y: [-4, 4, -4], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.46211 10.3863">
          <path d={svgPaths.p26c97d00} fill="var(--fill-0, #F0EEE3)" id="Decorative Dots" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute inset-[26.94%_18.78%_70.96%_78.35%]" 
        data-name="Decorative Dots"
        animate={{ y: [-3, 3, -3], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.49002 9.65775">
          <path d={svgPaths.peb5fdc0} fill="var(--fill-0, #F0EEE3)" id="Decorative Dots" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute inset-[39.55%_54.12%_59.16%_44.11%]" 
        data-name="Decorative Dots"
        animate={{ y: [-2, 2, -2], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.85846 5.93631">
          <path d={svgPaths.pea3a070} fill="var(--fill-0, #F0EEE3)" id="Decorative Dots" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute inset-[29.28%_31.68%_69.6%_66.95%]" 
        data-name="Decorative Dots"
        animate={{ y: [-5, 5, -5], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.55156 5.18124">
          <path d={svgPaths.p13e94f80} fill="var(--fill-0, #F4EADC)" id="Decorative Dots" />
        </svg>
      </motion.div>
      <BotanicalBorder />
      <Bottle />
      <GinkgoLeaf />
      <div className="absolute h-[2px] left-[170px] top-[254px] w-[47px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 2">
          <ellipse cx="23.5" cy="1" fill="var(--fill-0, #DEDCC2)" id="Ellipse 1" opacity="0.6" rx="23.5" ry="1" />
        </svg>
      </div>
    </div>
  );
}