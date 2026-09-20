import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const PATH_VARIANTS = {
  normal: { opacity: 1 },
  animate: (i) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const WhatsAppIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 18, color = "currentColor", style = {}, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <svg
        fill="none"
        height={size}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        {...props}
      >
        {[
          "M14 3h1",
          "M14 17h1",
          "M10 17H7l-4 4v-7",
          "M9 3h1",
          "M19 3a2 2 0 0 1 2 2",
          "M3 9v1",
          "M21 9v1",
          "M21 14v1a2 2 0 0 1-2 2",
          "M5 3a2 2 0 0 0-2 2",
        ].map((d, index) => (
          <motion.path
            animate={controls}
            custom={index + 1}
            d={d}
            key={d}
            variants={PATH_VARIANTS}
          />
        ))}
      </svg>
    );
  }
);

WhatsAppIcon.displayName = "WhatsAppIcon";

export default WhatsAppIcon;
