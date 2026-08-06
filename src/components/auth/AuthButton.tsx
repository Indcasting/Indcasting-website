"use client";

import React from "react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function AuthButton({ isLoading = false, loadingText, children, ...props }: AuthButtonProps) {
  return (
    <button 
      {...props}
      disabled={isLoading || props.disabled}
      style={{
        width: '100%', 
        padding: '16px', 
        borderRadius: '12px', 
        backgroundColor: 'var(--gold)', 
        color: '#000',
        fontSize: '1.05rem', 
        fontWeight: 700, 
        border: 'none', 
        cursor: isLoading ? 'not-allowed' : 'pointer',
        marginTop: '12px', 
        transition: 'transform 0.1s, opacity 0.2s',
        opacity: isLoading ? 0.7 : 1, 
        transform: isLoading ? 'scale(0.98)' : 'scale(1)',
        ...props.style
      }}
      onMouseDown={(e) => {
        if (!isLoading) e.currentTarget.style.transform = 'scale(0.98)';
        if (props.onMouseDown) props.onMouseDown(e);
      }}
      onMouseUp={(e) => {
        if (!isLoading) e.currentTarget.style.transform = 'scale(1)';
        if (props.onMouseUp) props.onMouseUp(e);
      }}
      onMouseLeave={(e) => {
        if (!isLoading) e.currentTarget.style.transform = 'scale(1)';
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}
