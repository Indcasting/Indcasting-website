import React from "react";
import SpotlightCard from "./SpotlightCard";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function DashboardCard({ title, children, action, className = "" }: DashboardCardProps) {
  return (
    <SpotlightCard className={`dashboard-card-ui ${className}`}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </SpotlightCard>
  );
}
