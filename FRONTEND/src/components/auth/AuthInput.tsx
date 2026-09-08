"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export default function AuthInput({ icon, type, ...props }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)', display: 'flex' }}>
        {icon}
      </div>
      
      <input 
        type={isPassword && showPassword ? "text" : type} 
        {...props}
        style={{ 
          width: '100%', 
          padding: isPassword ? '16px 48px 16px 48px' : '16px 16px 16px 48px', 
          borderRadius: '12px', 
          border: '1px solid var(--input-border)', 
          backgroundColor: 'var(--card-bg)', 
          color: 'var(--ink)', 
          fontSize: '1rem', 
          outline: 'none', 
          transition: 'border-color 0.2s',
          ...props.style
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--gold)';
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--input-border)';
          if (props.onBlur) props.onBlur(e);
        }}
      />
      
      {isPassword && (
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--mid)', cursor: 'pointer', display: 'flex' }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
