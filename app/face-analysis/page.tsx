"use client";

import React, { useReducer, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accent } from "@/components/ui/Accent";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { analyse, AnalysisReport } from "@/lib/analysis";
import { getRecommendedProducts, EXCEL_DATABASE_PRODUCTS, ExcelProduct } from "@/lib/recommend";
import { formatPrice } from "@/lib/utils";
import { leadFormSchema } from "@/lib/schemas";
import { BRAND_NAME, siteConfig } from "@/config/site";
import { fastDeliveryClaim } from "@/config/claims";
import { trackEvent } from "@/lib/analytics";
import { useCartStore } from "@/lib/store/cart";
import { pickPersona, levelFor } from "@/config/personas";
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
  Flame,
  Zap,
  Check,
} from "lucide-react";

type FlowState =
  | "SCAN_READY"
  | "CAMERA_STARTING"
  | "SCANNING"
  | "ANALYSING"
  | "RESULT"
  | "CAMERA_DENIED"
  | "ANALYSIS_FAILED";

interface FlowContext {
  state: FlowState;
  sessionId: string;
  report: AnalysisReport | null;
  cameraFeedback: string;
  errorMessage: string;
  formSubmitted: boolean;
  isSubmittingForm: boolean;
}

type FlowAction =
  | { type: "START_CAMERA" }
  | { type: "CAMERA_DENIED" }
  | { type: "UPDATE_FEEDBACK"; message: string }
  | { type: "ANALYSIS_START" }
  | { type: "ANALYSIS_SUCCESS"; report: AnalysisReport; sessionId: string }
  | { type: "ANALYSIS_FAILED"; message: string }
  | { type: "FORM_SUBMIT_START" }
  | { type: "FORM_SUBMIT_SUCCESS" }
  | { type: "RETAKE" };

function flowReducer(state: FlowContext, action: FlowAction): FlowContext {
  switch (action.type) {
    case "START_CAMERA":
      return { ...state, state: "CAMERA_STARTING", cameraFeedback: "Initializing camera..." };
    case "CAMERA_DENIED":
      return { ...state, state: "CAMERA_DENIED", cameraFeedback: "" };
    case "UPDATE_FEEDBACK":
      return { ...state, state: "SCANNING", cameraFeedback: action.message };
    case "ANALYSIS_START":
      return { ...state, state: "ANALYSING", cameraFeedback: "Calculating luminance & skin aura vibe..." };
    case "ANALYSIS_SUCCESS":
      return { ...state, state: "RESULT", report: action.report, sessionId: action.sessionId };
    case "ANALYSIS_FAILED":
      return { ...state, state: "ANALYSIS_FAILED", errorMessage: action.message };
    case "FORM_SUBMIT_START":
      return { ...state, isSubmittingForm: true };
    case "FORM_SUBMIT_SUCCESS":
      return { ...state, isSubmittingForm: false, formSubmitted: true };
    case "RETAKE":
      return { ...state, state: "SCAN_READY", report: null, cameraFeedback: "", formSubmitted: false };
    default:
      return state;
  }
}

export default function FaceAnalysisPage() {
  const [flow, dispatch] = useReducer(flowReducer, {
    state: "SCAN_READY",
    sessionId: "",
    report: null,
    cameraFeedback: "Center your face inside the frame",
    errorMessage: "",
    formSubmitted: false,
    isSubmittingForm: false,
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    skinConcern: "hydration",
    consent: true,
    imageConsent: true,
    marketingOptIn: false,
    ageConfirmed: true,
    consentVersion: "v1.0-dpdp-2024",
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
  }, [flow.state]);

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

      dispatch({ type: "UPDATE_FEEDBACK", message: "Face natural light and stay still..." });

      setTimeout(() => {
        dispatch({ type: "UPDATE_FEEDBACK", message: "Analyzing facial skin luminance..." });
        setTimeout(executeFrameAnalysis, 1500);
      }, 2000);
    } catch {
      dispatch({ type: "CAMERA_DENIED" });
      trackEvent({ name: "scan_camera_denied" });
    }
  };

  const executeFrameAnalysis = async () => {
    dispatch({ type: "ANALYSIS_START" });

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    try {
      if (videoRef.current && ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 400, 400);
      }

      const report = await analyse(canvas);

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      const sessionId = `scan-${Date.now()}`;

      if (canvas) {
        const imageBase64 = canvas.toDataURL("image/jpeg", 0.85);
        const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";
        
        fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "create",
            data: {
              name: form.name || "Event Guest",
              phone: form.phone || "",
              email: form.email || "",
              skin_concern: form.skinConcern || "Hydration",
              image_base64: imageBase64,
              score: report.overall,
              browser: typeof navigator !== "undefined" ? navigator.userAgent : "Browser",
              os: typeof navigator !== "undefined" ? navigator.platform : "OS",
              location: "India",
              ip: "Client IP"
            }
          }),
          mode: "no-cors",
        }).catch(() => {});
      }

      dispatch({ type: "ANALYSIS_SUCCESS", report, sessionId });
      trackEvent({
        name: "scan_complete",
        scoreBand: report.overall > 80 ? "high" : report.overall > 60 ? "mid" : "low",
      });
    } catch {
      dispatch({
        type: "ANALYSIS_FAILED",
        message: "Analysis failed. Please try capturing in better window light.",
      });
    } finally {
      ctx?.clearRect(0, 0, 400, 400);
      canvas.width = 0;
      canvas.height = 0;
    }
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

      try {
        ctx?.drawImage(img, 0, 0, 400, 400);
        const report = await analyse(canvas);
        const sessionId = `scan-${Date.now()}`;

        const imageBase64 = canvas.toDataURL("image/jpeg", 0.85);
        const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";

        fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "create",
            data: {
              name: form.name || "Event Guest",
              phone: form.phone || "",
              email: form.email || "",
              skin_concern: form.skinConcern || "Hydration",
              image_base64: imageBase64,
              score: report.overall,
              browser: typeof navigator !== "undefined" ? navigator.userAgent : "Browser",
              os: typeof navigator !== "undefined" ? navigator.platform : "OS",
              location: "India",
              ip: "Client IP"
            }
          }),
          mode: "no-cors",
        }).catch(() => {});

        dispatch({ type: "ANALYSIS_SUCCESS", report, sessionId });
      } catch {
        dispatch({ type: "ANALYSIS_FAILED", message: "Could not process image." });
      } finally {
        URL.revokeObjectURL(url);
        ctx?.clearRect(0, 0, 400, 400);
        canvas.width = 0;
        canvas.height = 0;
      }
    };
    img.src = url;
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validated = leadFormSchema.safeParse({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      consent: form.consent,
      marketingOptIn: form.marketingOptIn,
      ageConfirmed: form.ageConfirmed,
      consentVersion: form.consentVersion,
      website: form.website,
    });

    if (!validated.success) {
      const errMap: Record<string, string> = {};
      validated.error.issues.forEach((issue) => {
        if (issue.path[0]) errMap[issue.path[0].toString()] = issue.message;
      });
      setErrors(errMap);
      return;
    }

    dispatch({ type: "FORM_SUBMIT_START" });
    trackEvent({ name: "scan_form_submit", ageConfirmed: form.ageConfirmed });

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";
    
    try {
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "update_lead",
          data: {
            session_id: flow.sessionId,
            name: form.name,
            phone: form.phone,
            email: form.email || "",
            skin_concern: form.skinConcern || "Hydration",
            overall_score: flow.report?.overall || 75,
            sub_scores: flow.report?.subScores,
          }
        }),
        mode: "no-cors",
      }).catch(() => {});

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sessionId: flow.sessionId,
          overall_score: flow.report?.overall,
          sub_scores: flow.report?.subScores,
        }),
      }).catch(() => {});
    } catch {}

    dispatch({ type: "FORM_SUBMIT_SUCCESS" });
  };

  const recommendedProducts = EXCEL_DATABASE_PRODUCTS.slice(0, 5);

  const getGenZAuraTitle = (score: number) => {
    if (score >= 80) return "Main Character Glass Skin ✨";
    if (score >= 60) return "Radiant Dewy Vibe 🌿";
    if (score >= 40) return "Fresh Reset Energy ⚡";
    return "Gentle Barrier Nurture 🤍";
  };

  const getGenZVibeCopy = (score: number) => {
    if (score >= 80) return "Your skin luminance is giving high-glow perfection! Keep that moisture barrier protected with clean actives.";
    if (score >= 60) return "Solid skin vibe! A touch of hydrating niacinamide and daily SPF will lock in your natural radiance.";
    if (score >= 40) return "Your skin is asking for extra hydration and barrier love. A gentle wash and calming moisturizer will bring out that glow!";
    return "Time for a soothing reset! Focus on soft hydration and lightweight ceramides to strengthen your moisture shield.";
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col justify-between selection:bg-brand selection:text-white">
      <CartDrawer />

      {/* Header */}
      <header className="border-b border-white/10 py-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand to-rose-500 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-brand/20">
                G
              </span>
              <span className="bg-gradient-to-r from-white via-slate-200 to-brand bg-clip-text text-transparent">
                {BRAND_NAME}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-brand/20 text-brand px-2.5 py-1 rounded-full border border-brand/30">
                Gen Z Skin Analyzer
              </span>
              <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                Back to store
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Container */}
      <main className="py-8 sm:py-12 flex-1">
        <Container size="md">

          {/* STEP 1: SCAN READY & CAMERA SCREEN */}
          {(flow.state === "SCAN_READY" ||
            flow.state === "CAMERA_STARTING" ||
            flow.state === "SCANNING" ||
            flow.state === "ANALYSING") && (
            <div className="max-w-xl mx-auto space-y-6">
              
              <div className="text-center space-y-3">
                <Badge variant="brand" size="md" className="bg-brand/20 text-brand border-brand/30 px-3 py-1">
                  Step 1 of 2: Face Scan
                </Badge>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
                  Instant <Accent>Glass Skin</Accent> Analysis ✨
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Take a 5-second selfie scan to reveal your skin score & personalized routine from Minimalist & The Derma Co.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 text-center backdrop-blur-xl">
                
                {flow.state === "SCAN_READY" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-white/10 space-y-1">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <h4 className="font-bold text-xs text-white">Natural Light</h4>
                        <p className="text-[11px] text-slate-400">Face a window for accurate brightness reading.</p>
                      </div>
                      <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-white/10 space-y-1">
                        <Info className="w-4 h-4 text-rose-400" />
                        <h4 className="font-bold text-xs text-white">No Heavy Filters</h4>
                        <p className="text-[11px] text-slate-400">Bare skin gives real texture insights.</p>
                      </div>
                      <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-white/10 space-y-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-xs text-white">Clear Frame</h4>
                        <p className="text-[11px] text-slate-400">Keep hair away from forehead & cheeks.</p>
                      </div>
                      <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-white/10 space-y-1">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        <h4 className="font-bold text-xs text-white">100% Private</h4>
                        <p className="text-[11px] text-slate-400">Analysed live in your browser.</p>
                      </div>
                    </div>

                    {inAppBrowser && (
                      <div className="bg-amber-500/20 p-3 rounded-2xl border border-amber-500/40 text-xs text-amber-300 space-y-2">
                        <p>In-app browser detected. For best camera access, open in Chrome or Safari:</p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }}
                          className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 mx-auto"
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
                        className="w-full bg-gradient-to-r from-brand to-rose-500 hover:from-brand/90 hover:to-rose-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand/20 flex items-center justify-center gap-2 text-sm"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Start Camera Scan</span>
                      </Button>

                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500">OR</span>
                        <div className="flex-grow border-t border-white/10"></div>
                      </div>

                      <label className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-3 px-4 rounded-2xl border border-white/10 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-brand" />
                        <span>Upload Selfie Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-3xl overflow-hidden bg-slate-950 border-2 border-brand/50 flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                      <div className="absolute inset-6 border-2 border-dashed border-rose-400 rounded-full pointer-events-none opacity-80 animate-pulse" />
                    </div>

                    <div aria-live="polite" className="bg-brand/20 px-4 py-2 rounded-full text-xs font-bold text-rose-300 inline-flex items-center gap-2 border border-brand/30">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{flow.cameraFeedback}</span>
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={executeFrameAnalysis}
                        className="border-white/20 text-white hover:bg-white/10 text-xs"
                      >
                        Analyze Frame Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CAMERA DENIED / FALLBACK STATE */}
          {flow.state === "CAMERA_DENIED" && (
            <div className="max-w-md mx-auto bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6 text-center">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-bold text-white focus:outline-none">
                Camera Access Blocked
              </h2>
              <p className="text-xs text-slate-300">
                Allow camera access in your browser site permissions, or simply upload a photo from your gallery below.
              </p>

              <label className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-rose-500 text-white font-bold text-xs py-3.5 px-4 rounded-2xl cursor-pointer shadow-lg">
                <Upload className="w-4 h-4" />
                <span>Upload a Photo Selfie</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => dispatch({ type: "RETAKE" })}
                className="text-xs text-slate-400 hover:text-white underline block mx-auto"
              >
                Try camera again
              </button>
            </div>
          )}

          {/* ANALYSIS FAILED STATE */}
          {flow.state === "ANALYSIS_FAILED" && (
            <div className="max-w-md mx-auto bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6 text-center">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-bold text-white focus:outline-none">
                Lighting Check Needed
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {flow.errorMessage || "We couldn't get a clear brightness reading. Try standing facing a window!"}
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => dispatch({ type: "RETAKE" })}
                className="bg-brand text-white font-bold text-xs"
              >
                Retake Selfie Scan
              </Button>
            </div>
          )}

          {/* STEP 2: GAMIFIED RESULTS + DATA COLLECTION FORM (AFTER SCAN) */}
          {flow.state === "RESULT" && flow.report && (
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Gamified Aura Score Card */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand block">
                      Gen Z Vibe Report
                    </span>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-black text-white focus:outline-none flex items-center gap-2">
                      <span>{getGenZAuraTitle(flow.report.overall)}</span>
                    </h2>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "RETAKE" })}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-800 px-3 py-2 rounded-xl border border-white/10 hover:bg-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-brand" />
                    <span>Scan Again</span>
                  </button>
                </div>

                {/* Score & Vibe Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative z-10">
                  <div className="sm:col-span-5 bg-slate-800/80 p-6 rounded-3xl text-center space-y-2 border border-white/10 backdrop-blur-md">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Skin Vibe Score
                    </span>
                    <div className="font-display font-black text-6xl bg-gradient-to-r from-white via-rose-200 to-brand bg-clip-text text-transparent">
                      {flow.report.overall}
                      <span className="text-xl font-bold text-slate-500">/92</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Live Pixel Sampled
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    {[
                      { name: "Hydration Energy", score: flow.report.subScores.hydration, icon: Zap, color: "from-cyan-500 to-blue-500" },
                      { name: "Texture Smoothness", score: flow.report.subScores.texture, icon: Sparkles, color: "from-rose-500 to-pink-500" },
                      { name: "Tone Radiance", score: flow.report.subScores.tone, icon: Sun, color: "from-amber-400 to-yellow-500" },
                      { name: "Barrier Defense", score: flow.report.subScores.clarity, icon: Flame, color: "from-emerald-400 to-teal-500" },
                    ].map((s) => {
                      const IconComp = s.icon;
                      return (
                        <div key={s.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-200">
                            <span className="flex items-center gap-1.5">
                              <IconComp className="w-3.5 h-3.5 text-brand" />
                              {s.name}
                            </span>
                            <span className="text-slate-400">{s.score}/100</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
                              style={{ width: `${s.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/10 text-xs text-slate-300 leading-relaxed">
                  <p>{getGenZVibeCopy(flow.report.overall)}</p>
                </div>
              </div>

              {/* Recommended Routine Cards (Minimalist & The Derma Co Excel Database) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-white">Your Curated 4-Step Routine</h3>
                    <p className="text-xs text-slate-400">Exclusively from Minimalist & The Derma Co Excel database</p>
                  </div>
                  <span className="text-[11px] font-bold text-brand bg-brand/20 px-2.5 py-1 rounded-full border border-brand/30">
                    5 Products Matched
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedProducts.map((prod) => (
                    <div key={prod.id} className="bg-slate-900 p-4 rounded-2xl border border-white/10 flex flex-col justify-between gap-3 hover:border-brand/40 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                            {prod.brand}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {prod.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-white leading-snug">{prod.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{prod.benefit}</p>
                        <div className="text-[10px] text-rose-300 font-semibold bg-rose-950/40 p-2 rounded-xl border border-rose-500/20">
                          Active: {prod.keyActives}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-black text-white">{formatPrice(prod.price)}</span>
                          <span className="text-[10px] text-slate-500 line-through">{formatPrice(prod.mrp)}</span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => addItem({ id: prod.id, slug: prod.id, name: prod.name, size: "Standard", price: prod.price, mrp: prod.mrp, image: "/images/hero/product.png" })}
                          className="bg-brand text-white text-xs font-bold py-1.5 px-3 rounded-xl"
                        >
                          Add Routine
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATA COLLECTION FORM (AFTER SCAN PAGE) */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
                
                {flow.formSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-black text-xl text-white">Your Skin Report Is Saved!</h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      Thank you, {form.name}! We have saved your custom report and discount code. Check your phone for instant routine updates.
                    </p>
                    <div className="pt-2">
                      <Link href="/shop">
                        <Button variant="primary" size="md" className="bg-brand text-white font-bold text-xs px-6 py-3 rounded-xl">
                          Shop Recommended Products
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 bg-brand/20 text-brand text-[10px] font-bold px-2.5 py-1 rounded-full border border-brand/30">
                        <Lock className="w-3 h-3" /> Save & Unlock Full Report
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                        Claim Your 15% OFF Event Coupon & Saved Scan Report
                      </h3>
                      <p className="text-xs text-slate-300">
                        Enter your details to save your skin vibe score and receive your instant discount code on WhatsApp.
                      </p>
                    </div>

                    <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-200">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ananya Roy"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-brand focus:outline-none"
                          />
                          {errors.name && <p className="text-[11px] font-bold text-rose-400">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-200">Phone Number *</label>
                          <div className="flex gap-2">
                            <span className="px-3.5 py-3 rounded-xl bg-slate-800 text-brand font-bold text-xs border border-white/15">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              inputMode="tel"
                              placeholder="98765 43210"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-brand focus:outline-none"
                            />
                          </div>
                          {errors.phone && <p className="text-[11px] font-bold text-rose-400">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-200">Email Address (Optional)</label>
                          <input
                            type="email"
                            placeholder="ananya@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-brand focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-200">Primary Skin Goal</label>
                          <select
                            value={form.skinConcern}
                            onChange={(e) => setForm({ ...form, skinConcern: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/15 text-xs text-white focus:border-brand focus:outline-none font-semibold"
                          >
                            <option value="hydration">Dehydration & Dryness</option>
                            <option value="texture">Uneven Texture & Pores</option>
                            <option value="tone">Dullness & Hyperpigmentation</option>
                            <option value="clarity">Active Acne & Oiliness</option>
                            <option value="sensitivity">Redness & Sensitivity</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={form.consent}
                            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                            className="mt-0.5 rounded text-brand focus:ring-brand"
                          />
                          <span>
                            I agree to GLOW VAI using my details to save my skin score report and contact me about my routine. *
                          </span>
                        </label>

                        <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.marketingOptIn}
                            onChange={(e) => setForm({ ...form, marketingOptIn: e.target.checked })}
                            className="mt-0.5 rounded text-brand focus:ring-brand"
                          />
                          <span>Send me skin tips and exclusive offer codes on WhatsApp.</span>
                        </label>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={flow.isSubmittingForm}
                        className="w-full bg-gradient-to-r from-brand to-rose-500 hover:from-brand/90 hover:to-rose-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand/20 flex items-center justify-center gap-2 text-sm"
                      >
                        {flow.isSubmittingForm ? "Saving Report..." : "Save Report & Get 15% OFF Coupon"}
                      </Button>
                    </form>
                  </>
                )}

              </div>

              {/* Actions & Sharing */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/shop" className="flex-1">
                  <Button variant="primary" size="md" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 rounded-2xl border border-white/10 flex items-center justify-center gap-2">
                    <span>Explore Full Shop Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`I scored ${flow.report.overall}/92 on GLOW VAI Glass Skin Analyzer! Try it now: ${siteConfig.url}/face-analysis`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-950 text-emerald-300 font-bold text-xs px-5 py-3.5 rounded-2xl border border-emerald-500/30 hover:bg-emerald-900 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Score on WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 bg-slate-900/40 text-xs text-slate-500">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
