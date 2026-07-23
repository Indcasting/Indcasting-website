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

export default function MessagesPage() {
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
    <div className="messages-page">

      <div className="messages-container">

        <h1>Messages</h1>

        <div className="chat-box">

          {messages.map((message) => (

            <div
              key={message.id}
              className={
                message.sender === user?.name
                  ? "message own-message"
                  : "message"
              }
            >

              <strong>{message.sender}</strong>

              <p>{message.text}</p>

              <span>{message.time}</span>

            </div>

          ))}

        </div>

        <div className="message-input">

          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}