"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Send,
  Paperclip,
  MoreHorizontal,
  Phone,
  Video,
  ArrowLeft,
  CheckCheck,
  Image as ImageIcon,
  UserRound,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
  read?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

/* =========================================================
   MOCK DATA
========================================================= */

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Rahul Kapoor",
    role: "Casting Director",
    avatar: "/images/img_8.png",
    online: true,
    lastMessage:
      "We would like to schedule your audition for next week.",
    lastTime: "10:42 AM",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Riya, I came across your profile on IndCasting.",
        time: "10:18 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Rahul, thank you for reaching out. I'd love to hear more about the project.",
        time: "10:21 AM",
        read: true,
      },
      {
        id: 3,
        sender: "them",
        text: "We're currently casting for a lead role in an upcoming OTT series.",
        time: "10:25 AM",
      },
      {
        id: 4,
        sender: "me",
        text: "That sounds interesting. Could you share some details about the character?",
        time: "10:29 AM",
        read: true,
      },
      {
        id: 5,
        sender: "them",
        text: "She's a 26-year-old journalist with a strong emotional arc throughout the series.",
        time: "10:34 AM",
      },
      {
        id: 6,
        sender: "them",
        text: "We would like to schedule your audition for next week.",
        time: "10:42 AM",
      },
      {
        id: 7,
        sender: "me",
        text: "Absolutely. I'm available next week. Please let me know the date and time.",
        time: "10:45 AM",
        read: true,
      },
      {
        id: 8,
        sender: "them",
        text: "I'll send you the audition details shortly.",
        time: "10:48 AM",
      },
      {
        id: 9,
        sender: "me",
        text: "Perfect. I'll keep an eye out for them.",
        time: "10:50 AM",
        read: true,
      },
      {
        id: 10,
        sender: "them",
        text: "Also, please bring a printed copy of your updated portfolio.",
        time: "10:54 AM",
      },
      {
        id: 11,
        sender: "me",
        text: "Sure, I'll have it ready.",
        time: "10:57 AM",
        read: true,
      },
    ],
  },

  {
    id: 2,
    name: "Sneha Agarwal",
    role: "Casting Agency Head",
    avatar: "/images/img_2.png",
    online: false,
    lastMessage: "Please send across your updated showreel.",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello Riya, your profile looks like a good fit for one of our upcoming projects.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Thank you, Sneha. I'd be happy to be considered.",
        time: "Yesterday",
        read: true,
      },
      {
        id: 3,
        sender: "them",
        text: "Please send across your updated showreel.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 3,
    name: "Amit Verma",
    role: "Producer",
    avatar: "/images/img12.jpg",
    online: true,
    lastMessage: "The production dates are looking good.",
    lastTime: "Monday",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Hi Amit, just checking if there are any updates regarding the casting call.",
        time: "Monday",
        read: true,
      },
      {
        id: 2,
        sender: "them",
        text: "The production dates are looking good.",
        time: "Monday",
      },
    ],
  },

  {
    id: 4,
    name: "Meera Shah",
    role: "Talent Manager",
    avatar: "/images/img4.jpg",
    online: false,
    lastMessage: "I'll keep you updated.",
    lastTime: "Sunday",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Your portfolio has been shortlisted for the campaign.",
        time: "Sunday",
      },
      {
        id: 2,
        sender: "me",
        text: "That's great to hear. Thank you!",
        time: "Sunday",
        read: true,
      },
      {
        id: 3,
        sender: "them",
        text: "I'll keep you updated.",
        time: "Sunday",
      },
    ],
  },

  {
    id: 5,
    name: "Karan Malhotra",
    role: "Director",
    avatar: "/images/img11.jpg",
    online: false,
    lastMessage: "Thanks for your application.",
    lastTime: "Aug 7",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Thanks for your application.",
        time: "Aug 7",
      },
      {
        id: 2,
        sender: "me",
        text: "Thank you for considering my profile.",
        time: "Aug 7",
        read: true,
      },
    ],
  },
];

/* =========================================================
   STYLES
========================================================= */

const STYLES = `
  * {
    box-sizing: border-box;
  }

  .messages-page {
  transform: translateY(-90px);
  width: 100%;
  height: calc(100vh + 90px);
  margin-top: -150px;
  min-height: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: var(--cream);
  color: var(--ink);
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  overflow: hidden;
  position: relative;
  border-radius: 0;
}

  html.dark .messages-page {
    --ink: #f4f4f4;
    --cream: #0b0b0b;
    --white: #141414;
    --mist: #292929;
    --mid: #a8a8a8;
    --bubble: #202020;
  }

  /* =====================================================
     TOP BAR
  ===================================================== */

  .messages-topbar {
  flex-shrink: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-bottom: 1px solid var(--mist);
  background: var(--cream);
}

  .messages-heading h1 {
    margin: 0;

    font-family:
      "Instrument Serif",
      Georgia,
      serif;

    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
  }

  .messages-heading p {
    margin: 6px 0 0;

    color: var(--mid);

    font-size: .76rem;
  }

  .messages-top-actions {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .top-action {
    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--mist);
    border-radius: 50%;

    background: transparent;
    color: var(--mid);

    cursor: pointer;

    transition: .2s ease;
  }

  .top-action:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  /* =====================================================
     MAIN APP
  ===================================================== */

  .messages-shell {
    flex: 1;
    width: 100%;
    min-height: 0;
    display: grid;
    grid-template-columns: 340px minmax(0, 1fr);
    overflow: hidden;
  }

  /* =====================================================
     CONVERSATION SIDEBAR
  ===================================================== */

  .conversation-panel {
    min-width: 0;
    min-height: 0;

    display: flex;
    flex-direction: column;

    border-right: 1px solid var(--mist);

    background: var(--cream);

    overflow: hidden;
  }

  .conversation-search {
    padding: 18px 18px 12px;

    flex-shrink: 0;
  }

  .search-box {
    position: relative;
  }

  .search-box svg {
    position: absolute;

    left: 13px;
    top: 50%;

    transform: translateY(-50%);

    color: var(--mid);
  }

  .search-box input {
    width: 100%;

    height: 42px;

    padding: 0 14px 0 40px;

    border: 1px solid var(--mist);
    border-radius: 12px;

    outline: none;

    background: var(--white);
    color: var(--ink);

    font-family: inherit;
    font-size: .8rem;

    transition: .2s ease;
  }

  .search-box input:focus {
    border-color: var(--gold);

    box-shadow:
      0 0 0 3px rgba(201,168,76,.08);
  }

  .conversation-filter {
    display: flex;

    gap: 5px;

    padding: 5px 18px 13px;

    flex-shrink: 0;
  }

  .filter-btn {
    padding: 6px 11px;

    border: none;
    border-radius: 999px;

    background: transparent;
    color: var(--mid);

    font-size: .7rem;
    font-weight: 600;

    cursor: pointer;
  }

  .filter-btn.active {
    background: rgba(201,168,76,.12);
    color: var(--gold);
  }

  .conversation-list {
    flex: 1;

    min-height: 0;

    overflow-y: auto;
    overflow-x: hidden;

    overscroll-behavior: contain;
  }

  .conversation-list::-webkit-scrollbar {
    width: 5px;
  }

  .conversation-list::-webkit-scrollbar-thumb {
    background: var(--mist);
    border-radius: 10px;
  }

  .conversation {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 12px;

    padding: 13px 18px;

    border: none;
    border-left: 3px solid transparent;

    background: transparent;

    color: inherit;

    text-align: left;

    cursor: pointer;

    transition:
      background .2s ease,
      border-color .2s ease;
  }

  .conversation:hover {
    background: rgba(201,168,76,.045);
  }

  .conversation.active {
    background: rgba(201,168,76,.09);

    border-left-color: var(--gold);
  }

  .conversation-avatar {
    position: relative;

    width: 48px;
    height: 48px;

    flex-shrink: 0;
  }

  .conversation-avatar img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    border-radius: 50%;

    display: block;
  }

  .online-dot {
    position: absolute;

    right: 0;
    bottom: 1px;

    width: 11px;
    height: 11px;

    border-radius: 50%;

    background: #25a56a;

    border: 2px solid var(--cream);
  }

  .conversation-content {
    min-width: 0;
    flex: 1;
  }

  .conversation-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 10px;
  }

  .conversation-name {
    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: .83rem;
    font-weight: 700;
  }

  .conversation-time {
    flex-shrink: 0;

    color: var(--mid);

    font-size: .64rem;
  }

  .conversation-bottom {
    display: flex;
    align-items: center;

    gap: 7px;

    margin-top: 4px;
  }

  .conversation-preview {
    flex: 1;

    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: var(--mid);

    font-size: .72rem;
  }

  .unread-count {
    min-width: 19px;
    height: 19px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 5px;

    border-radius: 999px;

    background: var(--gold);
    color: #111;

    font-size: .62rem;
    font-weight: 800;
  }

  /* =====================================================
     CHAT PANEL
  ===================================================== */

  .chat-panel {
    min-width: 0;
    min-height: 0;

    display: flex;
    flex-direction: column;

    background: var(--white);

    overflow: hidden;
  }

  .chat-header {
    height: 76px;

    flex-shrink: 0;

    display: flex;
    align-items: center;

    padding: 0 24px;

    border-bottom: 1px solid var(--mist);

    background: var(--white);
  }

  .mobile-back {
    display: none;

    width: 35px;
    height: 35px;

    margin-right: 7px;

    border: none;
    border-radius: 50%;

    background: transparent;
    color: var(--mid);

    cursor: pointer;
  }

  .chat-avatar {
    position: relative;

    width: 44px;
    height: 44px;

    flex-shrink: 0;
  }

  .chat-avatar img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    border-radius: 50%;
  }

  .chat-contact {
    min-width: 0;

    margin-left: 12px;
  }

  .chat-contact-name {
    font-size: .9rem;
    font-weight: 750;
  }

  .chat-contact-status {
    margin-top: 3px;

    color: var(--mid);

    font-size: .68rem;
  }

  .chat-contact-status.online {
    color: #2b9a68;
  }

  .chat-header-actions {
    display: flex;
    align-items: center;

    gap: 4px;

    margin-left: auto;
  }

  .chat-header-btn {
    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: transparent;
    color: var(--mid);

    cursor: pointer;

    transition: .2s ease;
  }

  .chat-header-btn:hover {
    background: rgba(201,168,76,.08);
    color: var(--gold);
  }

  /* =====================================================
     CHAT BODY - IMPORTANT SCROLL FIX
  ===================================================== */

  .chat-body {
    flex: 1;

    min-height: 0;

    width: 100%;

    overflow-y: scroll;
    overflow-x: hidden;

    padding: 28px 32px 24px;

    background:
      radial-gradient(
        circle at 20% 10%,
        rgba(201,168,76,.025),
        transparent 30%
      ),
      var(--white);

    overscroll-behavior: contain;

    scrollbar-width: thin;
  }

  .chat-body::-webkit-scrollbar {
    width: 7px;
  }

  .chat-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-body::-webkit-scrollbar-thumb {
    background: var(--mist);
    border-radius: 10px;
  }

  .chat-body::-webkit-scrollbar-thumb:hover {
    background: #c7bda9;
  }

  .date-separator {
    display: flex;
    align-items: center;
    gap: 12px;

    margin: 4px 0 28px;

    color: var(--mid);

    font-size: .65rem;
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .date-separator::before,
  .date-separator::after {
    content: "";

    height: 1px;

    flex: 1;

    background: var(--mist);
  }

  .message-row {
    display: flex;

    width: 100%;

    margin-bottom: 12px;
  }

  .message-row.me {
    justify-content: flex-end;
  }

  .message-bubble {
    max-width: min(570px, 72%);

    padding: 11px 14px;

    border-radius: 17px;

    font-size: .8rem;
    line-height: 1.6;

    position: relative;

    word-break: break-word;
  }

  .message-row.them .message-bubble {
  border-bottom-left-radius: 5px;

  background: var(--bubble);
  color: var(--ink);
}

/* DARK MODE — incoming messages */
html.dark .message-row.them .message-bubble {
  background: #202020;
  color: #f4f4f4;
}

/* Sent messages */
.message-row.me .message-bubble {
  border-bottom-right-radius: 5px;

  background: linear-gradient(
    135deg,
    var(--gold),
    var(--gold2)
  );

  color: #111111;
}

html.dark .message-row.me .message-bubble {
  background: linear-gradient(
    135deg,
    var(--gold),
    var(--gold2)
  );

  color: #111111;
}

  .message-time {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 4px;

  margin-top: 5px;

  font-size: .59rem;

  opacity: .7;
}

html.dark .message-row.them .message-time {
  color: #d0d0d0;
}

html.dark .message-row.me .message-time {
  color: #222;
}

  .message-read {
    display: inline-flex;
    align-items: center;
  }

  /* =====================================================
     TYPING
  ===================================================== */

  .typing {
    display: flex;
    align-items: center;

    gap: 4px;

    width: fit-content;

    margin: 2px 0 12px;

    padding: 10px 14px;

    border-radius: 17px;
    border-bottom-left-radius: 5px;

    background: var(--bubble);
  }

  .typing span {
    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: var(--mid);

    animation: typingPulse 1.2s infinite;
  }

  .typing span:nth-child(2) {
    animation-delay: .15s;
  }

  .typing span:nth-child(3) {
    animation-delay: .3s;
  }

  @keyframes typingPulse {
    0%,
    60%,
    100% {
      opacity: .35;
      transform: translateY(0);
    }

    30% {
      opacity: 1;
      transform: translateY(-3px);
    }
  }

  /* =====================================================
     COMPOSER
  ===================================================== */

  .composer {
    flex-shrink: 0;

    padding: 13px 24px 18px;

    border-top: 1px solid var(--mist);

    background: var(--white);
  }

  .composer-box {
    min-height: 48px;

    display: flex;
    align-items: flex-end;

    gap: 7px;

    padding: 6px 7px 6px 13px;

    border: 1px solid var(--mist);
    border-radius: 15px;

    background: var(--cream);

    transition: .2s ease;
  }

  .composer-box:focus-within {
    border-color: var(--gold);

    box-shadow:
      0 0 0 3px rgba(201,168,76,.08);
  }

  .composer-input {
    flex: 1;

    min-width: 0;

    max-height: 120px;

    padding: 8px 2px;

    resize: none;

    border: none;
    outline: none;

    background: transparent;

    color: var(--ink);

    font-family: inherit;
    font-size: .8rem;

    line-height: 1.5;
  }

  .composer-input::placeholder {
    color: var(--mid);
  }

  .composer-action {
    width: 36px;
    height: 36px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 50%;

    background: transparent;
    color: var(--mid);

    cursor: pointer;

    transition: .2s ease;
  }

  .composer-action:hover {
    color: var(--gold);
    background: rgba(201,168,76,.08);
  }

  .send-button {
    background: var(--ink);
    color: var(--cream);
  }

  .send-button:hover {
    background: var(--gold);
    color: #111;
  }

  html.dark .send-button {
    background: white;
    color: #111;
  }

  .composer-footer {
    display: flex;
    justify-content: space-between;

    padding: 7px 4px 0;

    color: var(--mid);

    font-size: .62rem;
  }

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  .empty-chat {
    flex: 1;

    min-height: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 30px;
  }

  .empty-chat-inner {
    max-width: 340px;

    text-align: center;
  }

  .empty-chat-mark {
    width: 68px;
    height: 68px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 18px;

    border-radius: 22px;

    background: rgba(201,168,76,.1);

    color: var(--gold);
  }

  .empty-chat h2 {
    margin: 0;

    font-family:
      "Instrument Serif",
      Georgia,
      serif;

    font-size: 1.8rem;
    font-weight: 400;
  }

  .empty-chat p {
    margin: 8px 0 0;

    color: var(--mid);

    font-size: .78rem;
    line-height: 1.6;
  }

  /* =====================================================
     MOBILE
  ===================================================== */

  @media(max-width: 800px) {


    .messages-shell {
      grid-template-columns: 1fr;
    }

    .conversation-panel {
      display: flex;
    }

    .chat-panel {
      display: none;
    }

    .messages-shell.chat-open .conversation-panel {
      display: none;
    }

    .messages-shell.chat-open .chat-panel {
      display: flex;
    }

    .mobile-back {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chat-header {
      height: 68px;
      padding: 0 13px;
    }

    .chat-body {
      padding: 22px 16px 16px;
    }

    .composer {
      padding: 10px 12px 13px;
    }

    .message-bubble {
      max-width: 82%;
    }

    .chat-header-btn:nth-child(1),
    .chat-header-btn:nth-child(2) {
      display: none;
    }
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function MessagesPage() {
  const [conversations, setConversations] = useState<
    Conversation[]
  >(INITIAL_CONVERSATIONS);

  const [selectedId, setSelectedId] = useState<number | null>(
    1
  );

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "unread"
  >("all");

  const [message, setMessage] = useState("");

  const [showTyping, setShowTyping] = useState(false);

  const selectedConversation =
    conversations.find(
      (conversation) =>
        conversation.id === selectedId
    ) || null;

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        conversation.name
          .toLowerCase()
          .includes(searchValue) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "all" ||
        conversation.unread > 0;

      return matchesSearch && matchesFilter;
    });
  }, [conversations, search, filter]);

  /* =====================================================
     SELECT CONVERSATION
  ===================================================== */

  const selectConversation = (id: number) => {
    setSelectedId(id);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation
      )
    );
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed || !selectedConversation) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      read: false,
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: trimmed,
              lastTime: newMessage.time,
              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    setMessage("");

    setShowTyping(true);

    window.setTimeout(() => {
      setShowTyping(false);
    }, 1800);
  };

  /* =====================================================
     ENTER TO SEND
  ===================================================== */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="messages-page">

        {/* =================================================
            MESSAGE APPLICATION
        ================================================= */}

        <div
          className={`messages-shell ${
            selectedConversation
              ? "chat-open"
              : ""
          }`}
        >

          {/* =================================================
              CONVERSATION SIDEBAR
          ================================================= */}

          <aside className="conversation-panel">

            <div className="conversation-search">

              <div className="search-box">

                <Search size={16} />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search conversations..."
                />

              </div>

            </div>

            <div className="conversation-filter">

              <button
                className={`filter-btn ${
                  filter === "all"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter("all")
                }
              >
                All
              </button>

              <button
                className={`filter-btn ${
                  filter === "unread"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter("unread")
                }
              >
                Unread
              </button>

            </div>

            <div className="conversation-list">

              {filteredConversations.map(
                (conversation) => (
                  <button
                    key={conversation.id}
                    className={`conversation ${
                      selectedId ===
                      conversation.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      selectConversation(
                        conversation.id
                      )
                    }
                  >

                    <div className="conversation-avatar">

                      <img
                        src={
                          conversation.avatar
                        }
                        alt={
                          conversation.name
                        }
                      />

                      {conversation.online && (
                        <span className="online-dot" />
                      )}

                    </div>

                    <div className="conversation-content">

                      <div className="conversation-top">

                        <span className="conversation-name">
                          {
                            conversation.name
                          }
                        </span>

                        <span className="conversation-time">
                          {
                            conversation.lastTime
                          }
                        </span>

                      </div>

                      <div className="conversation-bottom">

                        <span className="conversation-preview">
                          {
                            conversation.lastMessage
                          }
                        </span>

                        {conversation.unread >
                          0 && (
                          <span className="unread-count">
                            {
                              conversation.unread
                            }
                          </span>
                        )}

                      </div>

                    </div>

                  </button>
                )
              )}

              {filteredConversations.length ===
                0 && (
                <div
                  style={{
                    padding: "45px 20px",
                    textAlign: "center",
                    color: "var(--mid)",
                    fontSize: ".78rem",
                  }}
                >
                  No conversations found.
                </div>
              )}

            </div>

          </aside>

          {/* =================================================
              CHAT PANEL
          ================================================= */}

          <section className="chat-panel">

            {selectedConversation ? (
              <>
                {/* CHAT HEADER */}

                <header className="chat-header">

                  <button
                    className="mobile-back"
                    onClick={() =>
                      setSelectedId(null)
                    }
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <div className="chat-avatar">

                    <img
                      src={
                        selectedConversation.avatar
                      }
                      alt={
                        selectedConversation.name
                      }
                    />

                    {selectedConversation.online && (
                      <span className="online-dot" />
                    )}

                  </div>

                  <div className="chat-contact">

                    <Link
                      href={`/talents/${selectedConversation.name
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-")}`}
                      className="chat-contact-name"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {
                        selectedConversation.name
                      }
                    </Link>

                    <div
                      className={`chat-contact-status ${
                        selectedConversation.online
                          ? "online"
                          : ""
                      }`}
                    >
                      {selectedConversation.online
                        ? "Online"
                        : selectedConversation.role}
                    </div>

                  </div>

                  <div className="chat-header-actions">

                    <button
                      className="chat-header-btn"
                      title="Call"
                    >
                      <Phone size={17} />
                    </button>

                    <button
                      className="chat-header-btn"
                      title="Video call"
                    >
                      <Video size={18} />
                    </button>

                    <button
                      className="chat-header-btn"
                      title="More options"
                    >
                      <MoreHorizontal
                        size={19}
                      />
                    </button>

                  </div>

                </header>

                {/* =================================================
                    SCROLLABLE CHAT BODY
                ================================================= */}

                <div className="chat-body">

                  <div className="date-separator">
                    Today
                  </div>

                  {selectedConversation.messages.map(
                    (item) => (
                      <div
                        key={item.id}
                        className={`message-row ${
                          item.sender
                        }`}
                      >

                        <div className="message-bubble">

                          <div>
                            {item.text}
                          </div>

                          <div className="message-time">

                            {item.time}

                            {item.sender ===
                              "me" && (
                              <span className="message-read">
                                <CheckCheck
                                  size={12}
                                />
                              </span>
                            )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                  {showTyping && (
                    <div className="typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}

                </div>

                {/* =================================================
                    MESSAGE COMPOSER
                ================================================= */}

                <div className="composer">

                  <div className="composer-box">

                    <button
                      className="composer-action"
                      title="Attach file"
                    >
                      <Paperclip size={17} />
                    </button>

                    <button
                      className="composer-action"
                      title="Add image"
                    >
                      <ImageIcon size={17} />
                    </button>

                    <textarea
                      className="composer-input"
                      rows={1}
                      value={message}
                      onChange={(e) =>
                        setMessage(
                          e.target.value
                        )
                      }
                      onKeyDown={handleKeyDown}
                      placeholder="Write a message..."
                    />

                    <button
                      className="composer-action send-button"
                      onClick={sendMessage}
                      title="Send message"
                    >
                      <Send size={16} />
                    </button>

                  </div>

                  <div className="composer-footer">

                    <span>
                      Enter to send
                    </span>

                    <span>
                      Shift + Enter for new line
                    </span>

                  </div>

                </div>
              </>
            ) : (
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="empty-chat">

                <div className="empty-chat-inner">

                  <div className="empty-chat-mark">
                    <UserRound size={27} />
                  </div>

                  <h2>
                    Your messages
                  </h2>

                  <p>
                    Select a conversation
                    from the left to continue
                    chatting with casting
                    directors, producers and
                    other industry professionals.
                  </p>

                </div>

              </div>
            )}

          </section>

        </div>

      </div>
    </>
  );
}