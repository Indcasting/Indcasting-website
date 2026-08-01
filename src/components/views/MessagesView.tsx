"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
}

export default function MessagesView() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Casting Director",
      text: "Welcome to IndCasting!",
      time: "10:00 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);
  }, [router]);

  function sendMessage() {
    if (!newMessage.trim()) return;
    const message: ChatMessage = {
      id: Date.now(),
      sender: user.name,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  }

  return (
    <div className="messages-container dashboard-card-ui" style={{ padding: '24px', margin: 0 }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--dash-text-main)' }}>Messages</h2>
      
      <div className="chat-box" style={{ 
        height: '400px', 
        overflowY: 'auto', 
        padding: '16px', 
        border: '1px solid var(--dash-border)',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === user?.name ? "own-message" : ""}`}
            style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '12px',
              backgroundColor: message.sender === user?.name ? 'rgba(232, 169, 58, 0.1)' : 'var(--dash-bg)',
              border: '1px solid var(--dash-border)',
              marginLeft: message.sender === user?.name ? 'auto' : '0',
              marginRight: message.sender === user?.name ? '0' : 'auto',
              maxWidth: '70%'
            }}
          >
            <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--dash-text-main)' }}>{message.sender}</strong>
            <p style={{ margin: 0, color: 'var(--dash-text-main)' }}>{message.text}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)', display: 'block', marginTop: '8px', textAlign: 'right' }}>{message.time}</span>
          </div>
        ))}
      </div>

      <div className="message-input" style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--dash-border)',
            backgroundColor: 'var(--dash-bg)',
            color: 'var(--dash-text-main)'
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'var(--gold)',
          color: 'var(--ink)',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Send
        </button>
      </div>
    </div>
  );
}
