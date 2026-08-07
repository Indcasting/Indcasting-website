"use client";

import React from "react";
import DashboardCardWrapper from "./DashboardCardWrapper";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "", style, onClick, ...props }: SpotlightCardProps) {
  return (
    <DashboardCardWrapper className={className} style={style} onClick={onClick} {...props}>
      {children}
    </DashboardCardWrapper>
  );
}
