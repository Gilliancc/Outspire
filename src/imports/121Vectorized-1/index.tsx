import { motion } from 'motion/react';
import svgPaths from "./svg-1a8g77510f";

export default function Component121Vectorized() {
  return (
    <div className="relative size-full" data-name="1-2 1 [Vectorized]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 331 460">
        <g clipPath="url(#clip0_23_163)" id="1-2 1 [Vectorized]">
          <rect fill="#FFFBF8" height="460" width="331" />
          <path d="M0 0H331V460H0V0Z" fill="var(--fill-0, #FEFCF9)" id="Vector" />
          <g id="background">
            <rect fill="var(--fill-0, #FDF8F1)" height="242" id="Simple Border" rx="12" stroke="var(--stroke-0, #F9F2EA)" strokeWidth="2" width="287" x="23" y="25" />
            <path d={svgPaths.p3f252e00} fill="var(--fill-0, #EFEAD3)" id="background_2" />
          </g>
          <motion.path 
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: 0.5, originY: 1 }}
            d={svgPaths.p25fcdc40} 
            fill="var(--fill-0, #DCDDBE)" 
            id="Small Plant" 
          />
          <motion.path 
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            d={svgPaths.p32f52980} 
            fill="var(--fill-0, #DCDDBE)" 
            id="Floating Dots" 
          />
          <g id="sun">
            <path d={svgPaths.p305cd340} fill="var(--fill-0, #FAE2DA)" id="Vector_2" />
            <path d={svgPaths.p31d22b00} fill="var(--fill-0, #F1D2C3)" id="Vector_3" />
          </g>
          <motion.path 
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            d={svgPaths.p1eec4600} 
            fill="var(--fill-0, #EFEAD3)" 
            id="Floating Dots_2" 
          />
          <motion.path 
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            d={svgPaths.pa0fae00} 
            fill="var(--fill-0, #EFEAD3)" 
            id="Floating Dots_3" 
          />
        </g>
        <defs>
          <clipPath id="clip0_23_163">
            <rect fill="white" height="460" width="331" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}