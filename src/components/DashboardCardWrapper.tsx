import React from "react";
import { motion } from "framer-motion";

interface DashboardCardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function DashboardCardWrapper({
  children,
  onClick,
  className = "",
  style,
  ...props
}: DashboardCardWrapperProps) {
  const isInteractive = !!onClick || className.includes("cursor-pointer") || className.includes("hover:");

  return (
    <motion.div
      onClick={onClick}
      whileHover={isInteractive ? { y: -4, scale: 1.015 } : {}}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        borderRadius: "18px",
        background: "rgba(18, 18, 20, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: isInteractive ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style
      }}
      className={`dashboard-card-wrapper ${className}`}
      {...props}
    >
      {/* Optional Hover Glow Effect for Interactive Cards */}
      {isInteractive && (
        <motion.div 
          className="card-glow"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}
      
      {/* Content wrapper with relative z-index to stay above the glow */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
