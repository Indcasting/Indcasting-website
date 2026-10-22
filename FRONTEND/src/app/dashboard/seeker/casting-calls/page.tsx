"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Search, Filter, MoreVertical, MapPin, Users, Calendar, Play, Pause, Copy, Edit2, Trash2, X, Film, Activity, Clock, CheckCircle, Flame, Sparkles, LayoutGrid, List, Columns, MessageSquare, ChevronRight, BarChart2, Star, Target } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SeekerCastingCalls() {
  const router = useRouter();
  
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

  type CastingCallCard = {
    id: string | number;
    title: string;
    company: string;
    category: string;
    genre: string;
    location: string;
    apps: number;
    reviewed: number;
    shortlisted: number;
    auditions: number;
    deadline: string;
    deadlineColor: string;
    status: string;
    date: string;
    experience: string;
    ageRange: string;
    gender: string;
    language: string;
    compensation: string;
    completionPercentage: number;
    raw?: any;
  };

  const [calls, setCalls] = useState<CastingCallCard[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState("");
  const [newBudget, setNewBudget] = useState("");

  const formatDeadline = (value: unknown) => {
    if (!value) return "Not specified";
    const date = new Date(String(value));
    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const mapCastingCall = (item: any): CastingCallCard => {
    const statusValue = String(item.status || "active").toLowerCase();
    const status = statusValue === "closed" || statusValue === "inactive"
      ? "Closed"
      : statusValue === "reviewing" ? "Reviewing"
      : statusValue === "auditions" ? "Auditions" : "Live";
    const category = item.category || item.role || "Actors";
    const budget = item.budget;
    return {
      id: item.id,
      title: item.title || "Untitled casting call",
      company: item.company || item.seeker?.companyName || item.seeker?.name || "Your Production",
      category,
      genre: item.type || item.role || category,
      location: item.location || "Not specified",
      apps: Array.isArray(item.applications) ? item.applications.length : 0,
      reviewed: 0,
      shortlisted: 0,
      auditions: 0,
      deadline: formatDeadline(item.applicationDeadline || item.shootEndDate),
      deadlineColor: "#6b7280",
      status,
      date: formatDeadline(item.createdAt),
      experience: item.experience || "Not specified",
      ageRange: item.age || "Any",
      gender: item.gender || "Any",
      language: Array.isArray(item.languages) ? item.languages.join(", ") : item.languages || "Any",
      compensation: budget === null || budget === undefined ? "Not specified" : `₹${Number(budget).toLocaleString("en-IN")}`,
      completionPercentage: 0,
      raw: item,
    };
  };

  const loadCastingCalls = async () => {
    setIsLoading(true);
    setPageError("");
    try {
      const [userResponse, callsResponse] = await Promise.all([
        fetch(`${API_URL}/auth/me`, { credentials: "include", cache: "no-store" }),
        fetch(`${API_URL}/casting-calls`, { credentials: "include", cache: "no-store" }),
      ]);

      if (userResponse.status === 401) {
        throw new Error("Your session has expired. Please log in again.");
      }
      if (!userResponse.ok) {
        throw new Error("Unable to load your account. Please refresh and try again.");
      }
      if (!callsResponse.ok) {
        throw new Error("Unable to load casting calls from the backend.");
      }

      const userData = await userResponse.json();
      const callsData = await callsResponse.json();
      const user = userData?.user ?? userData;
      const userId = user?.id ? String(user.id) : null;
      setCurrentUserId(userId);

      const records = Array.isArray(callsData) ? callsData : callsData?.data;
      if (!Array.isArray(records)) {
        throw new Error("The casting-calls endpoint returned an unexpected response.");
      }

      // The API currently returns all calls; display only calls owned by this seeker.
      const ownRecords = userId
        ? records.filter((item: any) => String(item.seekerId ?? item.seeker?.id ?? "") === userId)
        : [];
      setCalls(ownRecords.map(mapCastingCall));
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Something went wrong while loading casting calls.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCastingCalls();
    // Load once when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid");
  const filterOptions = ["All", "Actors", "Models", "Voice Artists", "Dancers", "Singers"];
  const [filterType, setFilterType] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Form State
  const [isCreating, setIsCreating] = useState(false);
  const [editingCall, setEditingCall] = useState<CastingCallCard | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const openCreateModal = () => {
    setEditingCall(null);
    setNewTitle("");
    setNewCategory("");
    setNewLocation("");
    setNewDeadline("");
    setNewBudget("");
    setPageError("");
    setIsCreating(true);
  };

  const openEditModal = (call: CastingCallCard) => {
    setEditingCall(call);
    setNewTitle(call.title);
    setNewCategory(call.category);
    setNewLocation(call.location);
    const rawDeadline = call.raw?.applicationDeadline;
    setNewDeadline(rawDeadline ? String(rawDeadline).slice(0, 10) : "");
    setNewBudget(call.raw?.budget === undefined || call.raw?.budget === null ? "" : String(call.raw.budget));
    setPageError("");
    setIsCreating(true);
  };

  const handleCreateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCategory || !newLocation.trim() || !newDeadline || !newBudget.trim()) {
      setPageError("Please complete all required fields.");
      return;
    }

    setIsSaving(true);
    setPageError("");
    try {
      const payload = {
        title: newTitle.trim(),
        category: newCategory,
        role: newCategory,
        location: newLocation.trim(),
        applicationDeadline: newDeadline,
        // The backend DTO validates budget as a string.
        budget: String(newBudget).trim(),
        company: editingCall?.company || "Your Production",
        type: editingCall?.raw?.type || "Casting",
      };
      const isEditing = Boolean(editingCall);
      const response = await fetch(
        isEditing
          ? `${API_URL}/casting-calls/${encodeURIComponent(String(editingCall!.id))}`
          : `${API_URL}/casting-calls`,
        {
          method: isEditing ? "PATCH" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = Array.isArray(result?.message) ? result.message.join(", ") : result?.message;
        throw new Error(message || `Could not ${isEditing ? "update" : "create"} casting call (HTTP ${response.status}).`);
      }

      setIsCreating(false);
      setEditingCall(null);
      setNewTitle("");
      setNewCategory("");
      setNewLocation("");
      setNewDeadline("");
      setNewBudget("");
      await loadCastingCalls();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not save casting call.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCall = async (call: CastingCallCard) => {
    const confirmed = window.confirm(`Delete "${call.title}"? This action cannot be undone.`);
    if (!confirmed) return;

    setIsDeletingId(call.id);
    setPageError("");
    try {
      const response = await fetch(`${API_URL}/casting-calls/${encodeURIComponent(String(call.id))}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        const message = Array.isArray(result?.message) ? result.message.join(", ") : result?.message;
        throw new Error(message || `Could not delete casting call (HTTP ${response.status}).`);
      }
      setCalls(previous => previous.filter(item => String(item.id) !== String(call.id)));
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not delete casting call.");
    } finally {
      setIsDeletingId(null);
    }
  };

  const getStatusVisuals = (status: string) => {
    switch (status) {
      case "Live": return { color: "#10b981", bg: "rgba(16,185,129,0.1)", dot: "animate-pulse" };
      case "Reviewing": return { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", dot: "" };
      case "Auditions": return { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", dot: "" };
      case "Shortlisting": return { color: "#a855f7", bg: "rgba(168,85,247,0.1)", dot: "" };
      case "Closed": return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
      default: return { color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "" };
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          call.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || call.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalApps = calls.reduce((acc, curr) => acc + curr.apps, 0);
  const totalShortlisted = calls.reduce((acc, curr) => acc + curr.shortlisted, 0);
  const totalAuditions = calls.reduce((acc, curr) => acc + curr.auditions, 0);

  const kanbanColumns = ["Live", "Reviewing", "Auditions", "Closed"];

  return (
    <div className="pcc-container">
      <style dangerouslySetInnerHTML={{__html: `
        .pcc-container {
          padding: 20px 0 80px 0;
          color: var(--dash-text-main, #000);
          position: relative;
          min-height: 100vh;
        }
        
        /* Cinematic Background */
        .pcc-container::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
          z-index: -1;
          pointer-events: none;
        }

        /* Hero Header */
        .pcc-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .pcc-title {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.03em;
          color: var(--dash-text-main, #fff);
        }
        .pcc-subtitle {
          font-size: 1.1rem;
          color: #888;
          max-width: 500px;
          line-height: 1.6;
        }

        /* Stats Row */
        .pcc-stats {
          display: flex;
          gap: 16px;
        }
        .pcc-stat-card {
          background: var(--dash-surface, linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3)));
          border: 1px solid var(--dash-border, rgba(255,255,255,0.05));
          border-radius: 16px;
          padding: 20px;
          min-width: 160px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; flex-direction: column; gap: 8px;
        }
        .pcc-stat-val { font-size: 1.8rem; font-weight: 800; color: var(--dash-text-main, #fff); line-height: 1; }
        .pcc-stat-label { font-size: 0.8rem; color: var(--dash-text-muted, #888); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: flex; alignItems: center; gap: 6px; }

        /* Floating Controls */
        .pcc-controls {
          position: sticky; top: 80px; z-index: 100; margin-bottom: 40px;
          background: var(--dash-surface, rgba(15, 15, 15, 0.75)); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--dash-border, rgba(255, 255, 255, 0.08)); border-radius: 20px;
          padding: 16px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          display: flex; flex-direction: column; gap: 20px;
        }
        .pcc-search-row { display: flex; align-items: center; gap: 16px; }
        .pcc-search-wrap {
          flex: 1; display: flex; align-items: center; gap: 12px;
          background: var(--dash-surface, rgba(0,0,0,0.4)); border: 1px solid var(--dash-border, rgba(255,255,255,0.1));
          border-radius: 12px; padding: 12px 20px; transition: all 0.3s ease;
        }
        .pcc-search-wrap:focus-within { border-color: rgba(212, 175, 55, 0.4); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1); }
        .pcc-search-input { flex: 1; background: transparent; border: none; color: var(--dash-text-main, #fff); font-size: 1rem; outline: none; }
        
        .pcc-view-toggle { display: flex; background: var(--dash-surface, rgba(0,0,0,0.5)); border-radius: 10px; padding: 4px; border: 1px solid var(--dash-border, rgba(255,255,255,0.05)); }
        .pcc-view-btn { padding: 8px 16px; border-radius: 6px; border: none; background: transparent; color: var(--dash-text-muted, #888); font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .pcc-view-btn.active { background: var(--dash-hover-bg, rgba(255,255,255,0.1)); color: var(--dash-text-main, #fff); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

        .pcc-filter-chips { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; }
        .pcc-filter-chips::-webkit-scrollbar { display: none; }
        .pcc-chip { padding: 8px 20px; border-radius: 100px; background: var(--dash-surface, rgba(255,255,255,0.03)); border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); color: var(--dash-text-muted, #aaa); font-size: 0.85rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s; }
        .pcc-chip:hover { background: var(--dash-hover-bg, rgba(255,255,255,0.08)); color: var(--dash-text-main, #fff); }
        .pcc-chip.active { background: rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.5); color: var(--gold); }

        /* Dashboard Layout */
        .pcc-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }
        @media (max-width: 1024px) { .pcc-layout { grid-template-columns: 1fr; } }

        /* Grid View */
        .pcc-grid { display: flex; flex-direction: column; gap: 24px; }

        /* Kanban View */
        .pcc-kanban { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 24px; }
        .pcc-kanban-col { min-width: 350px; flex: 1; background: var(--dash-surface, rgba(0,0,0,0.2)); border-radius: 24px; padding: 20px; border: 1px solid var(--dash-border, rgba(255,255,255,0.03)); }
        .pcc-kanban-header { font-size: 1rem; font-weight: 700; color: var(--dash-text-main, #fff); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Production Card */
        .prod-card {
          background: var(--dash-surface, linear-gradient(145deg, #181818, #0a0a0a));
          border: 1px solid var(--dash-border, rgba(255,255,255,0.06));
          border-radius: 20px;
          padding: 24px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow: hidden;
        }
        .prod-card:hover {
          transform: translate(-2px, -2px);
          border-color: var(--gold, #c9a84c);
          box-shadow: 6px 6px 0px 0px var(--gold, #c9a84c);
        }
        .prod-card::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent);
          transform: skewX(-20deg); transition: 0.5s; pointer-events: none;
        }
        .prod-card:hover::after { left: 150%; }

        .prod-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .prod-logo-wrap { display: flex; gap: 16px; align-items: center; }
        .prod-logo { width: 48px; height: 48px; border-radius: 12px; background: var(--dash-surface, rgba(255,255,255,0.05)); display: flex; align-items: center; justify-content: center; border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); }
        .prod-card:hover .prod-logo { transform: rotate(5deg) scale(1.05); border-color: rgba(212,175,55,0.3); }
        
        .prod-title { font-size: 1.4rem; font-weight: 800; color: var(--dash-text-main, #fff); margin: 0 0 4px 0; letter-spacing: -0.01em; }
        .prod-company { font-size: 0.95rem; color: var(--dash-text-muted, #888); }
        
        .prod-status-badge {
          display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 100px;
          font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }

        .prod-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px 0; border-top: 1px solid var(--dash-border, rgba(255,255,255,0.05)); border-bottom: 1px solid var(--dash-border, rgba(255,255,255,0.05)); margin-bottom: 20px; }
        .meta-col { display: flex; flex-direction: column; gap: 4px; }
        .meta-lbl { font-size: 0.8rem; color: var(--dash-text-muted, #666); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .meta-val { font-size: 0.95rem; color: var(--dash-text-main, #eee); font-weight: 500; display: flex; align-items: center; gap: 6px; }

        /* Metric Bar */
        .metric-wrap { margin-bottom: 12px; }
        .metric-top { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px; }
        .metric-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .metric-bar-fill { height: 100%; background: var(--gold); border-radius: 10px; transition: width 1s ease; }

        .prod-actions { display: flex; justify-content: space-between; align-items: center; }
        .action-btn { background: none; border: none; color: var(--dash-text-muted, #aaa); font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover { color: var(--dash-text-main, #fff); }
        
        .btn-view-apps { background: rgba(212, 175, 55, 0.1); color: var(--gold); padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2); }
        .btn-view-apps:hover { background: var(--gold); color: #000; box-shadow: 0 5px 15px rgba(212,175,55,0.3); transform: translateY(-2px); }

        /* Quick Actions Overlay (Appears on hover in top right) */
        .quick-actions { position: absolute; top: 24px; right: 24px; display: flex; gap: 8px; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease; }
        .prod-card:hover .quick-actions { opacity: 1; transform: translateY(0); }
        .qa-btn { width: 36px; height: 36px; border-radius: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; transition: all 0.2s; }
        .qa-btn:hover { background: rgba(255,255,255,0.1); }
        .qa-btn.delete:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: rgba(239, 68, 68, 0.4); }

        /* Insights Sidebar */
        .insights-panel { background: var(--dash-surface, rgba(0,0,0,0.3)); border: 1px solid var(--dash-border, rgba(255,255,255,0.05)); border-radius: 24px; padding: 24px; height: fit-content; position: sticky; top: 230px; }
        .insights-header { font-size: 1.1rem; font-weight: 800; color: var(--dash-text-main, #fff); margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; }
        .insight-block { margin-bottom: 24px; }
        .insight-lbl { font-size: 0.8rem; color: var(--dash-text-muted, #888); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
        .insight-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--dash-surface, rgba(255,255,255,0.02)); border-radius: 12px; border: 1px solid var(--dash-border, rgba(255,255,255,0.03)); margin-bottom: 8px; transition: background 0.2s; color: var(--dash-text-main) }
        .insight-item:hover { background: var(--dash-hover-bg, rgba(255,255,255,0.05)); }
        .insight-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(212, 175, 55, 0.1); display: flex; align-items: center; justify-content: center; color: var(--gold); }
        
        /* Modals */
        .cine-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 9999; display: flex; alignItems: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease-out; }
        .cine-modal-content { background-color: var(--dash-surface, #111); border: 1px solid var(--dash-border, rgba(255,255,255,0.1)); border-radius: 24px; width: 100%; max-width: 600px; box-shadow: 0 40px 80px rgba(0,0,0,0.8); overflow: hidden; display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />

      {pageError && (
        <div role="alert" style={{ margin: "0 0 20px", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <span>{pageError}</span>
          <button type="button" onClick={() => setPageError("")} aria-label="Dismiss error" style={{ background: "transparent", color: "inherit", border: 0, cursor: "pointer" }}><X size={16} /></button>
        </div>
      )}

      {/* Premium Hero */}
      <div className="pcc-hero">
        <div>
          <h1 className="pcc-title">My Productions</h1>
          <p className="pcc-subtitle">Manage your active casting projects, monitor applications, and organize auditions from one cinematic workspace.</p>
        </div>
        
        <div className="pcc-stats">
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Film size={14} /> Total Productions</span>
            <span className="pcc-stat-val">{calls.length}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Users size={14} /> Applicants</span>
            <span className="pcc-stat-val">{totalApps}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Target size={14} /> Shortlisted</span>
            <span className="pcc-stat-val">{totalShortlisted}</span>
          </div>
          <div className="pcc-stat-card">
            <span className="pcc-stat-label"><Calendar size={14} /> Auditions</span>
            <span className="pcc-stat-val">{totalAuditions}</span>
          </div>
        </div>
      </div>

      {pageError && (
        <div role="alert" style={{ marginBottom: 20, padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#fca5a5" }}>
          {pageError}
          <button onClick={() => void loadCastingCalls()} style={{ marginLeft: 12, background: "transparent", border: 0, color: "inherit", textDecoration: "underline", cursor: "pointer" }}>Retry</button>
        </div>
      )}

      {/* Floating Control Bar */}
      <div className="pcc-controls">
        <div className="pcc-search-row">
          <div className="pcc-search-wrap">
            <Search size={20} color="rgba(255,255,255,0.4)" />
            <input 
              type="text" 
              className="pcc-search-input" 
              placeholder="Search productions, roles, or locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="pcc-view-toggle">
            <button className={`pcc-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <LayoutGrid size={16} /> Editorial
            </button>
            <button className={`pcc-view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>
              <Columns size={16} /> Kanban
            </button>
          </div>

          <button 
            style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(212,175,55,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={openCreateModal}
          >
            <PlusCircle size={18} /> New Casting Call
          </button>
        </div>
        
        <div className="pcc-filter-chips">
          {filterOptions.map(opt => (
            <button key={opt} className={`pcc-chip ${filterType === opt ? 'active' : ''}`} onClick={() => setFilterType(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="pcc-layout">
        
        {/* Left Column: Productions */}
        <div>
          {isLoading ? (
            <div style={{ padding: "80px 20px", textAlign: "center", color: "#888" }}>Loading your casting calls from the server…</div>
          ) : filteredCalls.length === 0 ? (
            <div style={{ paddingTop: "56px",  padding: '80px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <Film size={64} color="var(--gold)" style={{ margin: '0 auto 24px auto', opacity: 0.5 }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>You haven't launched a production yet</h2>
              <p style={{ color: '#888', marginBottom: '24px' }}>Create a casting call and start discovering exceptional talent.</p>
              <button 
                onClick={openCreateModal}
                style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '14px 28px', borderRadius: '100px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <PlusCircle size={18} /> Create Your First Casting Call
              </button>
            </div>
          ) : (
            viewMode === 'grid' ? (
              <div className="pcc-grid">
                {filteredCalls.map(call => <ProductionCard key={call.id} call={call} getStatusVisuals={getStatusVisuals} router={router} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} onEdit={openEditModal} onDelete={handleDeleteCall} isDeleting={isDeletingId === call.id} />)}
              </div>
            ) : (
              <div className="pcc-kanban">
                {kanbanColumns.map(col => (
                  <div key={col} className="pcc-kanban-col">
                    <div className="pcc-kanban-header">
                      {col} <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                        {filteredCalls.filter(c => c.status === col).length}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {filteredCalls.filter(c => c.status === col).map(call => (
                        <ProductionCard key={call.id} call={call} getStatusVisuals={getStatusVisuals} router={router} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} onEdit={openEditModal} onDelete={handleDeleteCall} isDeleting={isDeletingId === call.id} isCompact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Right Column: Insights Sidebar */}
        {viewMode === 'grid' && (
          <div className="insights-panel">
            <h3 className="insights-header"><Sparkles size={18} color="var(--gold)" /> Platform Insights</h3>
            
            <div className="insight-block">
              <div className="insight-lbl">Today's Auditions</div>
              <div className="insight-item">
                <div className="insight-icon"><Play size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Lead Actor Reading</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>2:00 PM via Zoom</div>
                </div>
              </div>
            </div>

            <div className="insight-block">
              <div className="insight-lbl">Action Required</div>
              <div className="insight-item" style={{ borderLeft: '3px solid #ef4444' }}>
                <div className="insight-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Clock size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Lead Actor Deadline</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Closing Today</div>
                </div>
              </div>
            </div>

            <div className="insight-block">
              <div className="insight-lbl">Recent Applications</div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Users size={16} /></div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>+12 New Applicants</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>Background Dancers</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal (Placeholder for UI) */}
      {isCreating && (
        <div className="cine-modal-overlay" onClick={() => { setIsCreating(false); setEditingCall(null); }}>
          <div className="cine-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>{editingCall ? "Edit Production" : "Launch New Production"}</h2>
              <button onClick={() => { setIsCreating(false); setEditingCall(null); }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateNew} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Role Title</label>
                <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Lead Actor" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Category</label>
                <select required value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                  <option value="" disabled>Select category</option>
                  {filterOptions.filter(o => o !== "All").map(opt => <option key={opt} value={opt} style={{ color: '#000' }}>{opt}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Location</label>
                  <input required type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. Mumbai" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Application Deadline</label>
                  <input required type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} min={new Date().toISOString().slice(0, 10)} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Budget (₹)</label>
                <input required type="number" min="1" step="1" value={newBudget} onChange={e => setNewBudget(e.target.value)} placeholder="e.g. 5000" style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ padding: '24px 0 0 0', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <button type="button" onClick={() => { setIsCreating(false); setEditingCall(null); }} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" disabled={isSaving} style={{ background: 'var(--gold)', border: 'none', color: '#000', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, cursor: isSaving ? 'wait' : 'pointer', opacity: isSaving ? 0.7 : 1 }}>{isSaving ? "Saving…" : editingCall ? "Save Changes" : "Create Casting Call"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent for Production Cards
function ProductionCard({ call, getStatusVisuals, router, hoveredCard, setHoveredCard, onEdit, onDelete, isDeleting = false, isCompact = false }: any) {
  const statusVis = getStatusVisuals(call.status);
  const isHovered = hoveredCard === call.id;

  if (isCompact) {
    // Kanban simplified view
    return (
      <div 
        className="prod-card" 
        style={{ padding: '16px', marginBottom: 0 }}
        onMouseEnter={() => setHoveredCard(call.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>{call.title}</h4>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '12px' }}>{call.genre}</div>
        
        <div className="metric-wrap" style={{ marginBottom: '16px' }}>
          <div className="metric-top">
            <span style={{ color: '#aaa' }}>Completion</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{call.completionPercentage}%</span>
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${call.completionPercentage}%`, background: statusVis.color }}></div>
          </div>
        </div>
        
        <button 
          className="btn-view-apps" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          onClick={() => router.push('/dashboard/seeker/applications')}
        >
          View Apps ({call.apps})
        </button>
      </div>
    );
  }

  // Full Editorial Grid View
  return (
    <div 
      className="prod-card"
      onMouseEnter={() => setHoveredCard(call.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Quick Actions (Hover) */}
      <div className="quick-actions">
        <button className="qa-btn" title="Edit Casting" aria-label={`Edit ${call.title}`} onClick={() => onEdit(call)}><Edit2 size={16} /></button>
        <button className="qa-btn" title="View Analytics" aria-label={`View analytics for ${call.title}`} onClick={() => router.push('/dashboard/seeker/analytics')}><BarChart2 size={16} /></button>
        <button className="qa-btn" title="Duplicate" aria-label={`Duplicate ${call.title}`} onClick={() => window.alert("Duplicate is not yet supported by the backend. Use New Casting Call to create a separate record.")}><Copy size={16} /></button>
        <button className="qa-btn delete" title={isDeleting ? "Deleting…" : "Delete Casting"} aria-label={`Delete ${call.title}`} disabled={isDeleting} onClick={() => onDelete(call)}><Trash2 size={16} /></button>
      </div>

      <div className="prod-header">
        <div className="prod-logo-wrap">
          <div className="prod-logo"><Film size={24} color="var(--gold)" /></div>
          <div>
            <h3 className="prod-title">{call.title}</h3>
            <div className="prod-company">{call.genre} • {call.company}</div>
          </div>
        </div>
        
        <div className="prod-status-badge" style={{ background: statusVis.bg, color: statusVis.color, border: `1px solid ${statusVis.color}40` }}>
          <div className={`status-dot ${statusVis.dot}`} style={{ background: statusVis.color }}></div>
          {call.status}
        </div>
      </div>

      <div className="prod-meta">
        <div className="meta-col">
          <span className="meta-lbl">Location</span>
          <span className="meta-val"><MapPin size={14} color="var(--gold)" /> {call.location}</span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Role Type</span>
          <span className="meta-val"><Star size={14} color="#3b82f6" /> {call.category}</span>
        </div>
        <div className="meta-col">
          <span className="meta-lbl">Deadline</span>
          <span className="meta-val" style={{ color: call.deadlineColor }}><Clock size={14} /> {call.deadline}</span>
        </div>
      </div>

      {/* Analytics Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Applications</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{call.apps}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Reviewed</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{call.reviewed}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Shortlisted</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{call.shortlisted}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Auditions</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{call.auditions}</div>
        </div>
      </div>

      <div className="metric-wrap" style={{ marginBottom: '24px' }}>
        <div className="metric-top">
          <span style={{ color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pipeline Completion</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{call.completionPercentage}%</span>
        </div>
        <div className="metric-bar-bg">
          <div className="metric-bar-fill" style={{ width: `${call.completionPercentage}%`, background: 'linear-gradient(90deg, #d4af37, #fef3c7)' }}></div>
        </div>
      </div>

      <div className="prod-actions">
        <button 
          className="btn-view-apps action-btn"
          onClick={() => router.push('/dashboard/seeker/applications')}
        >
          View Applications <ChevronRight size={16} />
        </button>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="action-btn"><Calendar size={16} /> Manage Auditions</button>
        </div>
      </div>
    </div>
  );
}
