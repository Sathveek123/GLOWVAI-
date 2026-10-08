"use client";

import React, { useReducer, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { analyse, detectFace, DEMOGRAPHIC_BASE_SCORES, AnalysisReport } from "@/lib/analysis";
import { getRecommendedProducts, EXCEL_DATABASE_PRODUCTS, ExcelProduct } from "@/lib/recommend";
import { formatPrice } from "@/lib/utils";
import { leadFormSchema } from "@/lib/schemas";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { useCartStore } from "@/lib/store/cart";
import {
  Sparkles,
  Camera,
  Lock,
  CheckCircle2,
  AlertCircle,
  Share2,
  RotateCcw,
  ArrowRight,
  Sun,
  ShieldCheck,
  Upload,
  ExternalLink,
  Info,
  Check,
  MapPin,
  FileText,
  User,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";

type FlowStep =
  | "SCAN_READY"
  | "CAMERA_STARTING"
  | "SCANNING"
  | "ANALYSING"
  | "FACE_NOT_DETECTED"
  | "FORM_ENTRY"
  | "RESULT"
  | "CAMERA_DENIED";

interface FlowContext {
  step: FlowStep;
  sessionId: string;
  report: AnalysisReport | null;
  capturedImage: string | null;
  feedbackMessage: string;
  errorMessage: string;
  isSubmittingForm: boolean;
}

type FlowAction =
  | { type: "START_CAMERA" }
  | { type: "CAMERA_DENIED" }
  | { type: "UPDATE_FEEDBACK"; message: string }
  | { type: "ANALYSIS_START" }
  | { type: "FACE_NOT_DETECTED"; message: string }
  | { type: "FACE_DETECTED"; capturedImage: string }
  | { type: "ANALYSIS_SUCCESS"; report: AnalysisReport; sessionId: string }
  | { type: "FORM_SUBMIT_START" }
  | { type: "FORM_SUBMIT_SUCCESS"; report: AnalysisReport; sessionId: string }
  | { type: "RETAKE" };

function flowReducer(state: FlowContext, action: FlowAction): FlowContext {
  switch (action.type) {
    case "START_CAMERA":
      return { ...state, step: "CAMERA_STARTING", feedbackMessage: "Starting camera..." };
    case "CAMERA_DENIED":
      return { ...state, step: "CAMERA_DENIED", feedbackMessage: "" };
    case "UPDATE_FEEDBACK":
      return { ...state, step: "SCANNING", feedbackMessage: action.message };
    case "ANALYSIS_START":
      return { ...state, step: "ANALYSING", feedbackMessage: "Detecting facial features..." };
    case "FACE_NOT_DETECTED":
      return {
        ...state,
        step: "FACE_NOT_DETECTED",
        errorMessage: action.message || "Face not detected. Please upload or scan a clear photo facing the camera.",
      };
    case "FACE_DETECTED":
      return {
        ...state,
        step: "FORM_ENTRY",
        capturedImage: action.capturedImage,
        feedbackMessage: "Face detected! Please enter your details to view report.",
      };
    case "ANALYSIS_SUCCESS":
      return { ...state, step: "RESULT", report: action.report, sessionId: action.sessionId };
    case "FORM_SUBMIT_START":
      return { ...state, isSubmittingForm: true };
    case "FORM_SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmittingForm: false,
        step: "RESULT",
        report: action.report,
        sessionId: action.sessionId,
      };
    case "RETAKE":
      return {
        ...state,
        step: "SCAN_READY",
        report: null,
        capturedImage: null,
        feedbackMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
}

export default function FaceAnalysisPage() {
  const [flow, dispatch] = useReducer(flowReducer, {
    step: "SCAN_READY",
    sessionId: "",
    report: null,
    capturedImage: null,
    feedbackMessage: "Position your face clearly inside the circle",
    errorMessage: "",
    isSubmittingForm: false,
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    demographic: "girl_18_23",
    skinConcern: "hydration",
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    headingRef.current?.focus();
  }, [flow.step]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent || "";
      if (/FBAN|FBAV|Instagram/i.test(ua)) {
        setInAppBrowser(true);
      }
    }
  }, []);

  const handleOpenCamera = async () => {
    dispatch({ type: "START_CAMERA" });
    trackEvent({ name: "scan_camera_open" });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      dispatch({ type: "UPDATE_FEEDBACK", message: "Keep face steady in good natural lighting..." });

      setTimeout(() => {
        dispatch({ type: "UPDATE_FEEDBACK", message: "Analyzing facial frame..." });
        setTimeout(processFrameCapture, 1500);
      }, 2000);
    } catch {
      dispatch({ type: "CAMERA_DENIED" });
      trackEvent({ name: "scan_camera_denied" });
    }
  };

  const processFrameCapture = async () => {
    dispatch({ type: "ANALYSIS_START" });

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    if (videoRef.current && ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 400, 400);
    }

    // Stop video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    // Face detection check
    const detection = detectFace(canvas);

    if (!detection.detected) {
      dispatch({ type: "FACE_NOT_DETECTED", message: detection.reason });
      return;
    }

    const imageBase64 = canvas.toDataURL("image/jpeg", 0.85);
    dispatch({ type: "FACE_DETECTED", capturedImage: imageBase64 });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    dispatch({ type: "ANALYSIS_START" });

    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, 400, 400);
      }

      const detection = detectFace(canvas);

      if (!detection.detected) {
        URL.revokeObjectURL(url);
        dispatch({ type: "FACE_NOT_DETECTED", message: detection.reason });
        return;
      }

      const imageBase64 = canvas.toDataURL("image/jpeg", 0.85);
      URL.revokeObjectURL(url);
      dispatch({ type: "FACE_DETECTED", capturedImage: imageBase64 });
    };
    img.src = url;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const errMap: Record<string, string> = {};
    if (!form.name.trim()) errMap.name = "Please enter your name";
    if (!form.phone.trim() || form.phone.trim().length < 10) {
      errMap.phone = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(errMap).length > 0) {
      setErrors(errMap);
      return;
    }

    dispatch({ type: "FORM_SUBMIT_START" });
    trackEvent({ name: "scan_form_submit", demographic: form.demographic });

    // Generate score strictly matching user's selected demographic group rule
    const dummyCanvas = document.createElement("canvas");
    const report = await analyse(dummyCanvas, form.demographic);
    const sessionId = `scan-${Date.now()}`;

    // Submit lead data to Google Apps Script
    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";

    try {
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "create",
          data: {
            session_id: sessionId,
            name: form.name,
            phone: form.phone,
            email: form.email || "",
            demographic: DEMOGRAPHIC_BASE_SCORES[form.demographic]?.label || form.demographic,
            skin_concern: form.skinConcern,
            image_base64: flow.capturedImage || "",
            overall_score: report.overall,
            sub_scores: report.subScores,
            location: "Vijayawada, AP",
            browser: typeof navigator !== "undefined" ? navigator.userAgent : "Browser",
          },
        }),
        mode: "no-cors",
      }).catch(() => {});
    } catch {}

    dispatch({ type: "FORM_SUBMIT_SUCCESS", report, sessionId });
  };

  const recommendedProducts = EXCEL_DATABASE_PRODUCTS.slice(0, 5);
  const currentCity = siteConfig.defaultCity; // "Vijayawada"

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col justify-between selection:bg-[#0050FF] selection:text-white">
      <CartDrawer />

      {/* Ticker Bar */}
      <div className="bg-[#0050FF] text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>Delivering skincare routine orders directly to Vijayawada • Free Instant Face Analysis</span>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 py-3.5 bg-white sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display font-extrabold text-xl text-slate-900 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0050FF] text-white flex items-center justify-center font-black text-base shadow-sm">
                G
              </div>
              <span>
                GLOW<span className="text-[#0050FF]">VAI</span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                Skin Diagnostic Portal
              </span>
              <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-[#0050FF] transition-colors">
                Back to Store
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="py-8 sm:py-12 flex-1 bg-slate-50/50">
        <Container size="md">
          {/* STEP 1: CAMERA / SCAN SELECTION */}
          {(flow.step === "SCAN_READY" ||
            flow.step === "CAMERA_STARTING" ||
            flow.step === "SCANNING" ||
            flow.step === "ANALYSING") && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-3">
                <Badge variant="brand" size="md" className="bg-[#0050FF]/10 text-[#0050FF] border-[#0050FF]/20 px-3 py-1 font-bold">
                  Step 1 of 3: Facial Image Scan
                </Badge>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
                  Free AI <span className="text-[#0050FF]">Face Analysis</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Take a 5-second photo scan to check skin health parameters & get routine recommendations.
                </p>
              </div>

              {/* Scan Steps Visual Graphic Banner */}
              <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#0050FF] text-white font-bold text-xs flex items-center justify-center mx-auto">
                    1
                  </div>
                  <p className="text-[11px] font-bold text-slate-800">Scan Face</p>
                  <p className="text-[10px] text-slate-500">Live or photo</p>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto">
                    2
                  </div>
                  <p className="text-[11px] font-bold text-slate-800">Enter Details</p>
                  <p className="text-[10px] text-slate-500">Select group</p>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto">
                    3
                  </div>
                  <p className="text-[11px] font-bold text-slate-800">Get Report</p>
                  <p className="text-[10px] text-slate-500">View routine</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 text-center">
                {flow.step === "SCAN_READY" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <h4 className="font-bold text-xs text-slate-900">Good Lighting</h4>
                        <p className="text-[11px] text-slate-600">Face a natural light source for clear detection.</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-bold text-xs text-slate-900">Centered Face</h4>
                        <p className="text-[11px] text-slate-600">Keep face inside frame without obstruction.</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <Lock className="w-4 h-4 text-[#0050FF]" />
                        <h4 className="font-bold text-xs text-slate-900">100% Private</h4>
                        <p className="text-[11px] text-slate-600">Processed securely inside browser.</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <h4 className="font-bold text-xs text-slate-900">Instant Diagnostic</h4>
                        <p className="text-[11px] text-slate-600">Matches Minimalist & Derma Co items.</p>
                      </div>
                    </div>

                    {inAppBrowser && (
                      <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                        <p>In-app browser detected. For best camera performance, open in Chrome or Safari:</p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }}
                          className="bg-amber-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 mx-auto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{isCopied ? "Link Copied!" : "Copy Page Link"}</span>
                        </button>
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleOpenCamera}
                        className="w-full bg-[#0050FF] hover:bg-[#003CD6] text-white font-bold py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Start Camera Scan</span>
                      </Button>

                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400">OR</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                      </div>

                      <label className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3.5 px-4 rounded-2xl border border-slate-200 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-[#0050FF]" />
                        <span>Upload Photo / Selfie</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-3xl overflow-hidden bg-slate-900 border-4 border-[#0050FF] flex items-center justify-center shadow-md">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                      <div className="absolute inset-8 border-2 border-dashed border-white/80 rounded-full pointer-events-none animate-pulse" />
                    </div>

                    <div className="bg-[#0050FF]/10 px-4 py-2 rounded-full text-xs font-bold text-[#0050FF] inline-flex items-center gap-2 border border-[#0050FF]/20">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{flow.feedbackMessage}</span>
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={processFrameCapture}
                        className="border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                      >
                        Capture & Detect Frame
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FACE NOT DETECTED ERROR SCREEN */}
          {flow.step === "FACE_NOT_DETECTED" && (
            <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-md space-y-6 text-center">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto text-rose-600">
                <AlertCircle className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <Badge variant="brand" className="bg-rose-100 text-rose-700 border-rose-200 font-bold px-3 py-0.5">
                  Face Not Detected
                </Badge>
                <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-extrabold text-slate-900">
                  No Face Found in Photo
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">{flow.errorMessage}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <p className="font-bold text-slate-800">For accurate face detection:</p>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>Ensure your face is centered and fully visible</li>
                  <li>Avoid dark rooms or extreme backlighting</li>
                  <li>Do not cover face with hand, hair, or objects</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => dispatch({ type: "RETAKE" })}
                  className="w-full bg-[#0050FF] hover:bg-[#003CD6] text-white font-bold text-xs py-3.5 rounded-xl"
                >
                  Retake / Scan Photo Again
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: USER DETAILS FORM (MANDATORY BEFORE REPORT) */}
          {flow.step === "FORM_ENTRY" && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <Badge variant="brand" size="md" className="bg-[#0050FF]/10 text-[#0050FF] border-[#0050FF]/20 px-3 py-1 font-bold">
                  Step 2 of 3: User Details
                </Badge>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                  Enter Details to Unlock Report
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Face detected successfully! Please provide your information to view your skin diagnostic score & custom recommendations.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0050FF]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0050FF] focus:bg-white focus:outline-none transition-colors"
                    />
                    {errors.name && <p className="text-[11px] font-bold text-rose-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0050FF]" /> Phone / WhatsApp Number *
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3.5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center justify-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        inputMode="tel"
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0050FF] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] font-bold text-rose-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0050FF]" /> Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0050FF] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#0050FF]" /> Demographic Category *
                    </label>
                    <select
                      value={form.demographic}
                      onChange={(e) => setForm({ ...form, demographic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:border-[#0050FF] focus:bg-white focus:outline-none transition-colors"
                    >
                      {Object.entries(DEMOGRAPHIC_BASE_SCORES).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Primary Skin Concern</label>
                    <select
                      value={form.skinConcern}
                      onChange={(e) => setForm({ ...form, skinConcern: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:border-[#0050FF] focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="hydration">Dehydration & Dryness</option>
                      <option value="acne">Active Acne & Oiliness</option>
                      <option value="pigmentation">Dark Spots & Sun Pigmentation</option>
                      <option value="aging">Fine Lines & Elasticity</option>
                      <option value="sensitive">Redness & Sensitive Barrier</option>
                    </select>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={flow.isSubmittingForm}
                      className="w-full bg-[#0050FF] hover:bg-[#003CD6] text-white font-bold py-3.5 rounded-xl shadow-md text-xs flex items-center justify-center gap-2"
                    >
                      <span>Get My Skin Report & Recommendations</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS & PRODUCT RECOMMENDATIONS */}
          {flow.step === "RESULT" && flow.report && (
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Score Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#0050FF] uppercase tracking-wider block">
                      Skin Diagnostic Summary
                    </span>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-black text-slate-900">
                      Overall Skin Health Report
                    </h2>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "RETAKE" })}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#0050FF]" />
                    <span>New Scan</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 bg-slate-50 p-6 rounded-3xl text-center space-y-2 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Skin Score
                    </span>
                    <div className="font-display font-black text-6xl text-[#0050FF]">
                      {flow.report.overall}
                      <span className="text-xl font-bold text-slate-400">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Face Verified
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    {[
                      { name: "Hydration Level", score: flow.report.subScores.hydration },
                      { name: "Texture Smoothness", score: flow.report.subScores.texture },
                      { name: "Tone Radiance", score: flow.report.subScores.tone },
                      { name: "Barrier Defense", score: flow.report.subScores.clarity },
                    ].map((s) => (
                      <div key={s.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{s.name}</span>
                          <span className="text-slate-500">{s.score}/100</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0050FF] transition-all duration-700"
                            style={{ width: `${s.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="font-medium">{flow.report.summary}</p>
                </div>

                {/* WhatsApp Share Button */}
                <div className="flex items-center justify-between bg-slate-100 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Share your skin score:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `I scored ${flow.report.overall}/100 on GLOW VAI Skin Analyzer! Check yours now: https://glowvai.in/face-analysis`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Recommended Routine */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-slate-900">Recommended Skincare Routine</h3>
                    <p className="text-xs text-slate-500">Authorized items from Minimalist & The Derma Co</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#0050FF] bg-[#0050FF]/10 px-2.5 py-1 rounded-full border border-[#0050FF]/20">
                    5 Products Matched
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3 shadow-sm hover:border-[#0050FF]/50 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0050FF] bg-[#0050FF]/10 px-2 py-0.5 rounded-md">
                            {prod.brand}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">{prod.category}</span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug">{prod.name}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{prod.benefit}</p>
                        <div className="text-[10px] text-slate-700 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-200">
                          Active: {prod.keyActives}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-black text-slate-900">{formatPrice(prod.price)}</span>
                          <span className="text-[10px] text-slate-400 line-through">{formatPrice(prod.mrp)}</span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            addItem({
                              id: prod.id,
                              slug: prod.id,
                              name: prod.name,
                              size: "Standard",
                              price: prod.price,
                              mrp: prod.mrp,
                              image: "/images/hero/product.png",
                            })
                          }
                          className="bg-[#0050FF] hover:bg-[#003CD6] text-white text-xs font-bold py-1.5 px-3 rounded-xl"
                        >
                          Add Routine
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <p>Delivering skincare routines directly to Vijayawada, Andhra Pradesh.</p>
      </footer>
    </div>
  );
}
