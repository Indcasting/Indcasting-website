"use client";

import React from 'react';

export interface NeobrutalistCardProps {
  image?: React.ReactNode;
  tags?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  metadata?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function NeobrutalistCard({
  image,
  tags,
  title,
  subtitle,
  metadata,
  content,
  actions,
  onClick,
  className = '',
  style
}: NeobrutalistCardProps) {
  return (
    <div 
      className={`neobrutalist-card ${image ? 'has-image' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .neobrutalist-card {
          display: flex;
          background-color: var(--dash-surface, #111);
          border: 2px solid var(--dash-border, #333);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 4px 4px 0px 0px var(--dash-border, #333);
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: ${onClick ? 'pointer' : 'default'};
          flex-direction: column;
          color: var(--dash-text-main, #fff);
          position: relative;
        }
        
        .neobrutalist-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px 0px var(--gold, #c9a84c);
          border-color: var(--gold, #c9a84c);
        }

        @media (min-width: 640px) {
          .neobrutalist-card.has-image:not(.vertical-layout) {
            flex-direction: row;
          }
        }

        .neobrutalist-card-image {
          width: 100%;
          min-height: 200px;
          border-bottom: 2px solid var(--dash-border, #333);
          position: relative;
          overflow: hidden;
        }
        
        /* Apply neobrutalist border changes to the image container on hover */
        .neobrutalist-card:hover .neobrutalist-card-image {
          border-color: var(--gold, #c9a84c);
        }

        @media (min-width: 640px) {
          .neobrutalist-card.has-image:not(.vertical-layout) .neobrutalist-card-image {
            width: 40%;
            min-height: auto;
            border-bottom: none;
            border-right: 2px solid var(--dash-border, #333);
          }
        }

        .neobrutalist-card-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .neobrutalist-card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .neobrutalist-card-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .neobrutalist-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--dash-text-main, #fff);
          margin: 0;
          letter-spacing: -0.02em;
        }

        .neobrutalist-card-subtitle {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--gold, #c9a84c);
          margin: 0;
        }

        .neobrutalist-card-metadata {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          padding: 16px 0;
          border-top: 2px solid var(--dash-border, #333);
          border-bottom: 2px solid var(--dash-border, #333);
        }
        
        .neobrutalist-card:hover .neobrutalist-card-metadata {
          border-color: rgba(201, 168, 76, 0.3);
        }

        .neobrutalist-card-content {
          color: var(--dash-text-muted, #888);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .neobrutalist-card-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: auto;
          padding-top: 8px;
          flex-wrap: wrap;
        }
      `}} />
      
      {image && (
        <div className="neobrutalist-card-image">
          {image}
        </div>
      )}
      
      <div className="neobrutalist-card-body">
        {tags && (
          <div className="neobrutalist-card-tags">
            {tags}
          </div>
        )}
        
        <div className="neobrutalist-card-header">
          <h3 className="neobrutalist-card-title">{title}</h3>
          {subtitle && <p className="neobrutalist-card-subtitle">{subtitle}</p>}
        </div>
        
        {metadata && (
          <div className="neobrutalist-card-metadata">
            {metadata}
          </div>
        )}
        
        {content && (
          <div className="neobrutalist-card-content">
            {content}
          </div>
        )}
        
        {actions && (
          <div 
            className="neobrutalist-card-actions"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
