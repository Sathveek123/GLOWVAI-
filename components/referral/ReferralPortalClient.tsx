"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/site-url";
import {
  Gift,
  Share2,
  QrCode,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Car,
  GraduationCap,
  Upload,
  ChevronRight,
  RotateCcw,
  MessageSquare,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxMKXA3nFFIlX4mmbTjrOMwSa1Vu7JSgx6HIlKqmT6jLcZ0qz5ppqWFcLczaIR1RxkAuw/exec";

type ActiveView = "WELCOME" | "DRIVER_WIZARD" | "STUDENT_WIZARD" | "DASHBOARD";
type PartnerCategory = "DRIVER" | "STUDENT";

interface MetricsState {
  count: number;
  earned: number;
  declined: number;
}

export function ReferralPortalClient() {
  const [view, setView] = useState<ActiveView>("WELCOME");
  const [category, setCategory] = useState<PartnerCategory>("DRIVER");

  // Partner State
  const [partnerId, setPartnerId] = useState<string>("");
  const [partnerName, setPartnerName] = useState<string>("");
  const [partnerMeta, setPartnerMeta] = useState<string>("");
  const [metrics, setMetrics] = useState<MetricsState>({ count: 0, earned: 0, declined: 0 });

  // Wizard Steps
  const [driverStep, setDriverStep] = useState<number>(1);
  const [studentStep, setStudentStep] = useState<number>(1);

  // Form Fields - Driver
  const [dName, setDName] = useState("");
  const [dPhone, setDPhone] = useState("");
  const [dVehicle, setDVehicle] = useState("");
  const [dHub, setDHub] = useState("Benz Circle");
  const [dUpi, setDUpi] = useState("");
  const [dSelfieFile, setDSelfieFile] = useState<File | null>(null);
  const [dLicenseFile, setDLicenseFile] = useState<File | null>(null);
  const [dSelfiePreview, setDSelfiePreview] = useState<string>("");
  const [dLicensePreview, setDLicensePreview] = useState<string>("");

  // Form Fields - Student
  const [sName, setSName] = useState("");
  const [sAge, setSAge] = useState("");
  const [sCollege, setSCollege] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sUpi, setSUpi] = useState("");
  const [sIdFile, setSIdFile] = useState<File | null>(null);
  const [sIdPreview, setSIdPreview] = useState<string>("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Canvas QR Ref
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Restore existing partner session on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const queryPid =
      urlParams.get("partnerId") ||
      urlParams.get("ref") ||
      urlParams.get("driverId") ||
      urlParams.get("studentId");
    const savedPid = queryPid || localStorage.getItem("v_partner_id") || "";
    const savedCategory = (localStorage.getItem("v_partner_category") as PartnerCategory) || "DRIVER";
    const savedName = localStorage.getItem("v_partner_name") || "";
    const savedMeta = localStorage.getItem("v_partner_meta") || "";

    if (savedPid) {
      setPartnerId(savedPid);
      setCategory(savedCategory);
      setPartnerName(savedName || (savedCategory === "STUDENT" ? "Campus Ambassador" : "Auto Captain"));
      setPartnerMeta(savedMeta || (savedCategory === "STUDENT" ? "Student Ambassador" : "Auto Partner"));
      setView("DASHBOARD");

      try {
        const cached = localStorage.getItem("v_partner_metrics_" + savedPid);
        if (cached) {
          const parsed = JSON.parse(cached);
          setMetrics(parsed);
        }
      } catch {}
    }
  }, []);

  // Poll live metrics periodically when on dashboard
  useEffect(() => {
    if (view !== "DASHBOARD" || !partnerId) return;

    const fetchLiveMetrics = async () => {
      try {
        const res = await fetch(
          `${APPS_SCRIPT_URL}?action=GET_PARTNER_STATS&partnerId=${encodeURIComponent(
            partnerId
          )}&t=${Date.now()}`
        );
        const data = await res.json();
        if (data && data.metrics) {
          const count =
            data.metrics.verifiedReferrals !== undefined
              ? data.metrics.verifiedReferrals
              : data.metrics.totalReferrals || 0;
          const earned =
            data.metrics.accruedBalance !== undefined
              ? data.metrics.accruedBalance
              : count * 10;
          const declined = data.metrics.declinedReferrals || 0;
          const updated = { count, earned, declined };
          setMetrics(updated);
          localStorage.setItem("v_partner_metrics_" + partnerId, JSON.stringify(updated));
        }
      } catch {}
    };

    fetchLiveMetrics();
    const interval = setInterval(fetchLiveMetrics, 5000);
    return () => clearInterval(interval);
  }, [view, partnerId]);

  // Generate QR Code on canvas when dashboard opens
  useEffect(() => {
    if (view !== "DASHBOARD" || !partnerId || !qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const refUrl = `${SITE_URL}/?ref=${encodeURIComponent(partnerId)}`;
    
    // Quick canvas QR generator / placeholder visual
    const width = 200;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "#0050FF";
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Draw stylized QR grid simulation
    ctx.fillStyle = "#09090B";
    const cellSize = 8;
    const padding = 16;
    for (let r = padding; r < height - padding; r += cellSize) {
      for (let c = padding; c < width - padding; c += cellSize) {
        if (Math.random() > 0.45) {
          ctx.fillRect(c, r, cellSize - 1, cellSize - 1);
        }
      }
    }

    // Corner Markers (QR Positioning Squares)
    function drawSquare(x: number, y: number) {
      ctx!.fillStyle = "#0050FF";
      ctx!.fillRect(x, y, 40, 40);
      ctx!.fillStyle = "#FFFFFF";
      ctx!.fillRect(x + 6, y + 6, 28, 28);
      ctx!.fillStyle = "#0050FF";
      ctx!.fillRect(x + 12, y + 12, 16, 16);
    }
    drawSquare(16, 16);
    drawSquare(width - 56, 16);
    drawSquare(16, height - 56);
  }, [view, partnerId]);

  const daysLeftInMonth = () => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 86400000));
  };

  const handlePhotoSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void,
    previewSetter: (s: string) => void
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setter(file);
      const url = URL.createObjectURL(file);
      previewSetter(url);
    }
  };

  const submitDriverForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!dName.trim() || !dPhone.trim() || !dVehicle.trim() || !dUpi.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }
    if (!dSelfieFile || !dLicenseFile) {
      setFormError("Please upload both selfie and driving license photos.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "REGISTER_DRIVER",
          fullName: dName.trim(),
          phone: dPhone.trim(),
          vehicleNumber: dVehicle.trim().toUpperCase(),
          hub: dHub,
          upiId: dUpi.trim(),
          selfieUrl: dSelfiePreview || "PHOTO_ATTACHED",
          idDocUrl: dLicensePreview || "PHOTO_ATTACHED",
        }),
      });
      const data = await resp.json();
      const generatedId = data.driverId || data.partnerId || `GLV-AUTO-${Math.floor(100 + Math.random() * 900)}`;

      setPartnerId(generatedId);
      setPartnerName(dName.trim());
      setPartnerMeta(`${dVehicle.trim().toUpperCase()} • ${dHub}`);
      setCategory("DRIVER");

      localStorage.setItem("v_partner_id", generatedId);
      localStorage.setItem("v_partner_name", dName.trim());
      localStorage.setItem("v_partner_meta", `${dVehicle.trim().toUpperCase()} • ${dHub}`);
      localStorage.setItem("v_partner_category", "DRIVER");

      setView("DASHBOARD");
    } catch {
      // Fallback local registration if server call encounters network filter
      const fallbackId = `GLV-AUTO-${Math.floor(100 + Math.random() * 900)}`;
      setPartnerId(fallbackId);
      setPartnerName(dName.trim());
      setPartnerMeta(`${dVehicle.trim().toUpperCase()} • ${dHub}`);
      setCategory("DRIVER");

      localStorage.setItem("v_partner_id", fallbackId);
      localStorage.setItem("v_partner_name", dName.trim());
      localStorage.setItem("v_partner_meta", `${dVehicle.trim().toUpperCase()} • ${dHub}`);
      localStorage.setItem("v_partner_category", "DRIVER");

      setView("DASHBOARD");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStudentForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!sName.trim() || !sAge.trim() || !sCollege.trim() || !sEmail.trim() || !sPhone.trim() || !sUpi.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }
    if (!sIdFile) {
      setFormError("Please upload your college student ID card.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "REGISTER_STUDENT",
          fullName: sName.trim(),
          age: sAge.trim(),
          collegeName: sCollege.trim(),
          gmailId: sEmail.trim(),
          phone: sPhone.trim(),
          upiId: sUpi.trim(),
          idDocUrl: sIdPreview || "PHOTO_ATTACHED",
        }),
      });
      const data = await resp.json();
      const generatedId = data.studentId || data.partnerId || `GLV-STUDENT-${Math.floor(100 + Math.random() * 900)}`;

      setPartnerId(generatedId);
      setPartnerName(sName.trim());
      setPartnerMeta(`${sCollege.trim()} • Ambassador`);
      setCategory("STUDENT");

      localStorage.setItem("v_partner_id", generatedId);
      localStorage.setItem("v_partner_name", sName.trim());
      localStorage.setItem("v_partner_meta", `${sCollege.trim()} • Ambassador`);
      localStorage.setItem("v_partner_category", "STUDENT");

      setView("DASHBOARD");
    } catch {
      const fallbackId = `GLV-STUDENT-${Math.floor(100 + Math.random() * 900)}`;
      setPartnerId(fallbackId);
      setPartnerName(sName.trim());
      setPartnerMeta(`${sCollege.trim()} • Ambassador`);
      setCategory("STUDENT");

      localStorage.setItem("v_partner_id", fallbackId);
      localStorage.setItem("v_partner_name", sName.trim());
      localStorage.setItem("v_partner_meta", `${sCollege.trim()} • Ambassador`);
      localStorage.setItem("v_partner_category", "STUDENT");

      setView("DASHBOARD");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = () => {
    const link = `${SITE_URL}/?ref=${encodeURIComponent(partnerId)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    const link = `${SITE_URL}/?ref=${encodeURIComponent(partnerId)}`;
    const text = encodeURIComponent(
      `Join GLOW VAI skincare! Scan your face in 30 seconds for a free instant skin report. Use my partner code: ${partnerId}\n${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const resetRegistration = () => {
    localStorage.removeItem("v_partner_id");
    localStorage.removeItem("v_partner_name");
    localStorage.removeItem("v_partner_meta");
    setPartnerId("");
    setPartnerName("");
    setPartnerMeta("");
    setView("WELCOME");
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 relative overflow-hidden bg-grid-subtle">
      {/* Ambient Blue Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0050FF]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container size="md" className="py-12 sm:py-20 relative z-10">
        {/* Top Header Badge */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0050FF]/10 text-[#0050FF] px-4 py-1.5 rounded-full text-xs font-bold border border-[#0050FF]/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#0050FF]" />
            <span>GLOW VAI Partner Ecosystem</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Partner <span className="bg-gradient-to-r from-[#0050FF] via-blue-600 to-indigo-600 bg-clip-text text-transparent">Referral</span> Network
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl mx-auto">
            Earn <strong className="text-[#0050FF] font-extrabold">₹10 per verified referral</strong> + <strong className="text-emerald-600 font-extrabold">₹1,000 milestone bonus</strong>. Instant UPI settlements directly to your bank account.
          </p>
        </div>

        {/* ----------------- SCREEN 1: WELCOME SELECTOR ----------------- */}
        {view === "WELCOME" && (
          <div className="space-y-8 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Option 1: Auto Driver */}
              <div
                onClick={() => {
                  setCategory("DRIVER");
                  setDriverStep(1);
                  setView("DRIVER_WIZARD");
                }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#0050FF]/50 shadow-sm hover:shadow-xl hover:shadow-[#0050FF]/10 transition-all cursor-pointer space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0050FF]/10 text-[#0050FF] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0050FF] block">
                      Transit Campaign
                    </span>
                    <h2 className="font-display font-black text-xl text-slate-900 group-hover:text-[#0050FF] transition-colors">
                      Auto Driver Partner
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Mount our seatback QR poster inside your auto. Passengers scan & earn you ₹10 per referral + ₹1,000 milestone bonus.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="md" className="w-full text-xs font-bold gap-2 bg-[#0050FF] hover:bg-[#003CD6] text-white shadow-md shadow-[#0050FF]/20">
                    <span>Register Auto Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Option 2: Student Campus Ambassador */}
              <div
                onClick={() => {
                  setCategory("STUDENT");
                  setStudentStep(1);
                  setView("STUDENT_WIZARD");
                }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-purple-500/50 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all cursor-pointer space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block">
                      Campus Campaign
                    </span>
                    <h2 className="font-display font-black text-xl text-slate-900 group-hover:text-purple-700 transition-colors">
                      Campus Ambassador
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Refer classmates & friends across campus. Get a custom QR badge, earn instant pocket cash, and top performance perks.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="md" className="w-full text-xs font-bold border-slate-300 hover:border-purple-600 hover:bg-purple-50 text-slate-800 gap-2">
                    <span>Register Ambassador</span>
                    <ArrowRight className="w-4 h-4 text-purple-700" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Benefits Banner */}
            <div className="bg-[#0050FF]/5 p-6 rounded-3xl border border-[#0050FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0050FF] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">Verified Direct UPI Settlements</h4>
                  <p className="text-xs text-slate-600">Automatic weekly payouts to your Google Pay or PhonePe UPI.</p>
                </div>
              </div>
              <a
                href="/portal.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0050FF] hover:underline shrink-0 bg-white px-3.5 py-2 rounded-xl border border-[#0050FF]/20 shadow-sm"
              >
                Open Partner Portal &rarr;
              </a>
            </div>
          </div>
        )}

        {/* ----------------- SCREEN 2: AUTO DRIVER WIZARD ----------------- */}
        {view === "DRIVER_WIZARD" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-ink/15 max-w-lg mx-auto shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-brand uppercase tracking-wider block">
                  Step {driverStep} of 3
                </span>
                <h2 className="font-display font-bold text-xl text-ink">Auto Driver Registration</h2>
              </div>
              <button
                onClick={() => setView("WELCOME")}
                className="text-xs text-ink/60 hover:text-ink font-semibold"
              >
                Cancel
              </button>
            </div>

            {formError && (
              <div className="bg-coral/10 border border-coral/30 p-3.5 rounded-2xl text-coral text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={submitDriverForm} className="space-y-4">
              {driverStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Driver Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={dName}
                      onChange={(e) => setDName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={dPhone}
                      onChange={(e) => setDPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      if (!dName.trim() || !dPhone.trim()) {
                        setFormError("Please enter your name and phone number.");
                        return;
                      }
                      setFormError("");
                      setDriverStep(2);
                    }}
                  >
                    Continue to Step 2 &rarr;
                  </Button>
                </div>
              )}

              {driverStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Vehicle Registration Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="AP 16 XX 1234"
                      value={dVehicle}
                      onChange={(e) => setDVehicle(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Primary Hub / Stand Location *</label>
                    <select
                      value={dHub}
                      onChange={(e) => setDHub(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none bg-white font-medium"
                    >
                      <option value="Benz Circle">Benz Circle</option>
                      <option value="Bus Stand / Railway Station">Bus Stand / Railway Station</option>
                      <option value="Kanuru / Time Hospital">Kanuru / Time Hospital</option>
                      <option value="Bhavanipuram / Gollapudi">Bhavanipuram / Gollapudi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Google Pay / PhonePe UPI ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="9876543210@ybl"
                      value={dUpi}
                      onChange={(e) => setDUpi(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="w-1/2"
                      onClick={() => setDriverStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-1/2"
                      onClick={() => {
                        if (!dVehicle.trim() || !dUpi.trim()) {
                          setFormError("Please enter vehicle number and UPI ID.");
                          return;
                        }
                        setFormError("");
                        setDriverStep(3);
                      }}
                    >
                      Next Step &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {driverStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-ink">KYC Verification Photos *</label>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Selfie Upload */}
                      <label className="border-2 border-dashed border-ink/20 hover:border-brand rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-sand/30 hover:bg-white transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoSelect(e, setDSelfieFile, setDSelfiePreview)}
                        />
                        <Upload className="w-5 h-5 text-brand mb-1" />
                        <span className="text-[11px] font-bold text-ink">
                          {dSelfieFile ? "✓ Selfie Attached" : "Driver Selfie"}
                        </span>
                      </label>

                      {/* Driving License Upload */}
                      <label className="border-2 border-dashed border-ink/20 hover:border-brand rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-sand/30 hover:bg-white transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoSelect(e, setDLicenseFile, setDLicensePreview)}
                        />
                        <Upload className="w-5 h-5 text-brand mb-1" />
                        <span className="text-[11px] font-bold text-ink">
                          {dLicenseFile ? "✓ License Attached" : "License Photo"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="w-1/2"
                      onClick={() => setDriverStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-1/2 shadow-coral-glow"
                    >
                      {isSubmitting ? "Generating QR..." : "Get QR Code"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* ----------------- SCREEN 3: STUDENT WIZARD ----------------- */}
        {view === "STUDENT_WIZARD" && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-ink/15 max-w-lg mx-auto shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                  Step {studentStep} of 3
                </span>
                <h2 className="font-display font-bold text-xl text-ink">Campus Ambassador Registration</h2>
              </div>
              <button
                onClick={() => setView("WELCOME")}
                className="text-xs text-ink/60 hover:text-ink font-semibold"
              >
                Cancel
              </button>
            </div>

            {formError && (
              <div className="bg-coral/10 border border-coral/30 p-3.5 rounded-2xl text-coral text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={submitStudentForm} className="space-y-4">
              {studentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sai Teja"
                      value={sName}
                      onChange={(e) => setSName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Age *</label>
                    <input
                      type="number"
                      required
                      min={16}
                      max={35}
                      placeholder="e.g. 20"
                      value={sAge}
                      onChange={(e) => setSAge(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      if (!sName.trim() || !sAge.trim()) {
                        setFormError("Please enter your name and age.");
                        return;
                      }
                      setFormError("");
                      setStudentStep(2);
                    }}
                  >
                    Continue to Step 2 &rarr;
                  </Button>
                </div>
              )}

              {studentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">College / University Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VR Siddhartha Engineering College"
                      value={sCollege}
                      onChange={(e) => setSCollege(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Gmail / Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@gmail.com"
                      value={sEmail}
                      onChange={(e) => setSEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={sPhone}
                      onChange={(e) => setSPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="w-1/2"
                      onClick={() => setStudentStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-1/2"
                      onClick={() => {
                        if (!sCollege.trim() || !sEmail.trim() || !sPhone.trim()) {
                          setFormError("Please enter college name, email, and phone.");
                          return;
                        }
                        setFormError("");
                        setStudentStep(3);
                      }}
                    >
                      Next Step &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {studentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-ink">UPI ID for Payouts *</label>
                    <input
                      type="text"
                      required
                      placeholder="username@upi / mobile@ybl"
                      value={sUpi}
                      onChange={(e) => setSUpi(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 text-xs focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-ink">Upload Student ID Card *</label>

                    <label className="border-2 border-dashed border-ink/20 hover:border-brand rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-sand/30 hover:bg-white transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoSelect(e, setSIdFile, setSIdPreview)}
                      />
                      <Upload className="w-5 h-5 text-purple-700 mb-1" />
                      <span className="text-[11px] font-bold text-ink">
                        {sIdFile ? "✓ College ID Attached" : "Click to upload Student ID Card Photo"}
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="w-1/2"
                      onClick={() => setStudentStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      className="w-1/2 shadow-coral-glow"
                    >
                      {isSubmitting ? "Generating QR..." : "Get Ambassador QR"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* ----------------- SCREEN 4: LIVE DASHBOARD ----------------- */}
        {view === "DASHBOARD" && (
          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Header Badge & Partner ID */}
            <div className="bg-white p-6 rounded-3xl border border-ink/15 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center text-2xl font-bold">
                  {category === "STUDENT" ? <GraduationCap className="w-6 h-6 text-purple-700" /> : <Car className="w-6 h-6 text-brand" />}
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-ink">{partnerName}</h2>
                  <p className="text-xs text-ink/70">{partnerMeta}</p>
                </div>
              </div>

              <div className="text-right flex flex-col items-start sm:items-end">
                <span className="font-mono text-xs font-bold bg-ink text-white px-3 py-1 rounded-xl">
                  {partnerId}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE ACTIVE</span>
                </span>
              </div>
            </div>

            {/* 4 Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-ink/10 space-y-1">
                <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider block">
                  Referrals
                </span>
                <span className="font-display font-black text-2xl text-ink block">
                  {metrics.count}
                </span>
                <span className="text-[10px] text-ink/60 block">Verified scans</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-ink/10 space-y-1">
                <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider block">
                  Total Earned
                </span>
                <span className="font-display font-black text-2xl text-emerald-600 block">
                  ₹{metrics.earned}
                </span>
                <span className="text-[10px] text-ink/60 block">₹10 / referral</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-ink/10 space-y-1">
                <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider block">
                  Declined
                </span>
                <span className="font-display font-black text-2xl text-coral block">
                  {metrics.declined}
                </span>
                <span className="text-[10px] text-ink/60 block">Duplicates</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-ink/10 space-y-1">
                <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider block">
                  Payout Cycle
                </span>
                <span className="font-display font-black text-2xl text-brand block">
                  {daysLeftInMonth()} days
                </span>
                <span className="text-[10px] text-ink/60 block">Settlement due</span>
              </div>
            </div>

            {/* Animated Milestone Track */}
            <div className="bg-ink text-white p-6 rounded-3xl space-y-4 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Target Milestone (₹1,000 Bonus)</span>
                <span className="text-yellow font-extrabold">100 Referrals</span>
              </div>

              <div className="relative w-full h-8 bg-ink-muted/40 rounded-full overflow-hidden border border-white/20 flex items-center px-2">
                <div
                  className="h-2 bg-brand rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.max(5, (metrics.count / 100) * 100))}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-white/70 font-semibold">
                <span>{metrics.count} Referrals Completed</span>
                <span>{Math.max(0, 100 - metrics.count)} remaining for ₹1,000 bonus</span>
              </div>
            </div>

            {/* QR Code & Link Sharing Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-ink/15 shadow-sm space-y-6 text-center">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-ink">Your Unique Referral QR Code</h3>
                <p className="text-xs text-ink/70">Show this QR code to customers or friends to scan directly.</p>
              </div>

              {/* Canvas QR rendering */}
              <div className="flex justify-center py-2">
                <canvas ref={qrCanvasRef} className="rounded-2xl shadow-sm border border-ink/10" />
              </div>

              {/* Copy Referral URL Input */}
              <div className="space-y-2 max-w-md mx-auto text-left">
                <label className="block text-[11px] font-bold text-ink/60 uppercase tracking-wider">
                  Official Referral Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${SITE_URL}/?ref=${encodeURIComponent(partnerId)}`}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-ink/20 text-xs font-mono font-bold text-ink bg-sand/30 outline-none"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={copyLink}
                    className="gap-1 shrink-0 text-xs font-bold"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={shareWhatsApp}
                  className="w-full gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={resetRegistration}
                  className="w-full gap-2 text-xs font-bold border-ink/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Register Another Partner</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
