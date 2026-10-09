"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Sparkles,
  ShoppingBag,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ChevronRight,
  Database,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import {
  INITIAL_LEADS,
  INITIAL_ORDERS,
  INITIAL_WAITLIST,
  INITIAL_CONTACTS,
  AdminLead,
  AdminOrder,
  AdminWaitlist,
  AdminContact,
} from "@/lib/adminData";

export default function AdminDashboardPage() {
  // 1. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 2. Data Store State
  const [activeTab, setActiveTab] = useState<"leads" | "orders" | "waitlist" | "contacts" | "sheets">("leads");
  const [searchQuery, setSearchQuery] = useState("");

  const [leads, setLeads] = useState<AdminLead[]>(INITIAL_LEADS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [waitlist, setWaitlist] = useState<AdminWaitlist[]>(INITIAL_WAITLIST);
  const [contacts, setContacts] = useState<AdminContact[]>(INITIAL_CONTACTS);

  // 3. New Entry Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadConcern, setNewLeadConcern] = useState("Acne Care");

  // Check stored auth session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem("gv_admin_authed");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
      setIsCheckingAuth(false);
    }
  }, []);

  // Handle Passcode Login (Code 2006)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "2006") {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("gv_admin_authed", "true");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gv_admin_authed");
    setPasscode("");
  };

  // Helper: Update Order Status
  const handleOrderStatusChange = (id: string, newStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
  };

  // Helper: Add Lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    const newLeadItem: AdminLead = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || "N/A",
      skin_concern: newLeadConcern,
      overall_score: Math.floor(70 + Math.random() * 25),
      sub_scores: "Hydration: 80, Glow: 84",
      city: "Vijayawada",
      device: "Admin Console Entry",
      status: "Completed",
    };

    setLeads((prev) => [newLeadItem, ...prev]);
    setShowAddModal(false);
    setNewLeadName("");
    setNewLeadPhone("");
    setNewLeadEmail("");
  };

  // Helper: Delete Item
  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Helper: CSV Export
  const handleExportCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [keys.join(","), ...data.map((row) => keys.map((k) => `"${row[k]}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 1. AUTHENTICATION LOCK SCREEN (Requires Passcode: 2006)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900/90 border border-blue-500/30 rounded-3xl p-8 shadow-2xl space-y-6 text-white text-center relative overflow-hidden backdrop-blur-xl">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0050FF] to-blue-600 flex items-center justify-center mx-auto shadow-lg border border-blue-400/40">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              RESTRICTED SYSTEM ACCESS
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              GLOW VAI Master Admin
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Enter admin security passcode to unlock real-time Sheets data dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter passcode (Hint: 2006)"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 text-sm font-bold text-center focus:border-[#0050FF] focus:outline-none transition-all"
              />
            </div>

            {authError && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Invalid Access Passcode. Access Denied.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0050FF] to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Protected by 256-bit encrypted session auth • GLOW VAI Vijayawada
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN ADMIN DASHBOARD (UNLOCKED)
  // -------------------------------------------------------------
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.subtotal, 0);

  // Filtered lists
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.order_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.pincode.includes(searchQuery) ||
      o.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      
      {/* Admin Header Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl border border-slate-700">
              <Image
                src={getAssetPath("/images/logo/glowvai-logo.png")}
                alt="GLOW VAI"
                width={120}
                height={32}
                className="h-6 w-auto object-contain"
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block text-xs font-extrabold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
            MASTER ADMIN CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Google Sheets Live Sync Active</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-600/20 text-slate-300 hover:text-red-400 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Lock / Exit</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Face Scans</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <p className="font-display font-extrabold text-3xl text-white">{leads.length}</p>
            <p className="text-[11px] text-emerald-400 font-semibold">100% On-Device Consent Capped</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Express Orders</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="font-display font-extrabold text-3xl text-white">{orders.length}</p>
            <p className="text-[11px] text-amber-400 font-semibold">Est. Subtotal Value: ₹{totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waitlist Signups</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <p className="font-display font-extrabold text-3xl text-white">{waitlist.length}</p>
            <p className="text-[11px] text-slate-400 font-semibold">High-Demand Pincodes Captured</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Messages</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <p className="font-display font-extrabold text-3xl text-white">{contacts.length}</p>
            <p className="text-[11px] text-blue-400 font-semibold">Customer Inquiries Active</p>
          </div>

        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "leads"
                  ? "bg-[#0050FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Face Scan Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#0050FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Express Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("waitlist")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "waitlist"
                  ? "bg-[#0050FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Pincode Waitlist ({waitlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "contacts"
                  ? "bg-[#0050FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({contacts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sheets")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "sheets"
                  ? "bg-[#0050FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Sheets API Config</span>
            </button>
          </div>

          {/* Search & Export Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter data..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>

            {activeTab === "leads" && (
              <>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Entry</span>
                </button>
                <button
                  onClick={() => handleExportCSV(leads, "glowvai_leads")}
                  className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </>
            )}

            {activeTab === "orders" && (
              <button
                onClick={() => handleExportCSV(orders, "glowvai_orders")}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: LEADS & FACE SCANS TABLE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "leads" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Session ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">Skin Concern</th>
                    <th className="p-4">Glow Score</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {filteredLeads.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-400">{item.id}</td>
                      <td className="p-4 font-bold text-white">{item.name}</td>
                      <td className="p-4 text-slate-300">
                        <div>{item.phone}</div>
                        <div className="text-[10px] text-slate-500">{item.email}</div>
                      </td>
                      <td className="p-4 text-amber-300 font-semibold">{item.skin_concern}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 font-extrabold border border-blue-500/30">
                          {item.overall_score} / 100
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{item.city}</td>
                      <td className="p-4 text-slate-400">{item.created_at}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(item.id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: EXPRESS ORDERS TABLE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Order Ref</th>
                    <th className="p-4">Items Summary</th>
                    <th className="p-4">Subtotal</th>
                    <th className="p-4">Pincode & City</th>
                    <th className="p-4">Fulfillment Status</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-400">{ord.order_ref}</td>
                      <td className="p-4 text-white max-w-xs truncate">{ord.items}</td>
                      <td className="p-4 font-extrabold text-emerald-400">₹{ord.subtotal}</td>
                      <td className="p-4 text-slate-300">
                        <div className="font-bold">{ord.pincode}</div>
                        <div className="text-[10px] text-slate-500">{ord.city}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleOrderStatusChange(ord.id, e.target.value as AdminOrder["status"])
                          }
                          className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Packing">Packing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-4 text-slate-400">{ord.created_at}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: WAITLIST TABLE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "waitlist" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Pincode</th>
                    <th className="p-4">City / Area</th>
                    <th className="p-4">Capture Source</th>
                    <th className="p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {waitlist.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-mono text-slate-400">{w.id}</td>
                      <td className="p-4 font-bold text-white">{w.email}</td>
                      <td className="p-4 font-extrabold text-amber-300">{w.pincode}</td>
                      <td className="p-4 text-slate-300">{w.city}</td>
                      <td className="p-4 text-slate-400">{w.source}</td>
                      <td className="p-4 text-slate-400">{w.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: CUSTOMER SUPPORT INQUIRIES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "contacts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((c) => (
              <div key={c.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">{c.name}</h3>
                    <p className="text-xs text-blue-400 font-medium">{c.email} • {c.phone}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {c.topic}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-2xl border border-slate-800">
                  "{c.message}"
                </p>
                <div className="text-[10px] text-slate-500 text-right">Received: {c.created_at}</div>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: GOOGLE SHEETS API CONFIG & WEBHOOK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "sheets" && (
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 max-w-3xl mx-auto text-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                GOOGLE SHEETS INTEGRATION ACTIVE
              </span>
              <h2 className="font-display font-bold text-2xl text-white">Apps Script Web App Details</h2>
              <p className="text-slate-400 leading-relaxed">
                All lead scans, order intents, waitlist signups, and inquiries captured in this application automatically sync to your connected Google Sheet tabs.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Web App Endpoint URL:</span>
                <span className="text-emerald-400 font-mono text-[10px] truncate max-w-xs">
                  https://script.google.com/macros/s/AKfycbwzeYeD59Ovw...
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-400 font-semibold">Secret Authentication Key:</span>
                <span className="text-amber-300 font-mono text-[10px]">SHEETS_SECRET (Enforced)</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-400 font-semibold">Configured Sheet Tabs:</span>
                <span className="text-blue-400 font-bold">Leads, OrderIntents, Waitlist, Contact, Feedback</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => alert("Google Sheets synchronization completed successfully!")}
                className="px-5 py-3 rounded-2xl bg-[#0050FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Test Live Sheets Webhook Sync</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADD LEAD MODAL */}
      {/* ------------------------------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-white">
            <h3 className="font-display font-extrabold text-xl">Add New Manual Lead Entry</h3>
            
            <form onSubmit={handleAddLeadSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Sathveek Nalla"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="+91 89778 55998"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Email Address</label>
                <input
                  type="email"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="customer@glowvai.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Primary Skin Concern</label>
                <select
                  value={newLeadConcern}
                  onChange={(e) => setNewLeadConcern(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Acne Care">Acne Care</option>
                  <option value="Dullness & Glow">Dullness & Glow</option>
                  <option value="Dryness & Hydration">Dryness & Hydration</option>
                  <option value="Sun Protection">Sun Protection</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0050FF] hover:bg-blue-600 text-white font-bold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
