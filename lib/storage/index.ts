/**
 * Storage Adapter Interface
 * Routes user-entered data and automatic metadata to Google Sheets Apps Script Web App.
 */

export interface SheetPayload {
  tab?: string;
  action?: string;
  session_id?: string;
  overall_score?: number;
  sub_scores?: Record<string, number>;
  skin_concern?: string;
  mime?: string;
  image_base64?: string;
  data?: Record<string, unknown>;
}

export interface StorageAdapter {
  callSheet(payload: SheetPayload): Promise<{ ok: boolean; error?: string; [key: string]: unknown }>;
}

const DEFAULT_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwzeYeD59OvwAHSyJ4BAxQrwk44EP6FlJ6KyhTs8XYSjaLVPd3-Svg8EsMseSfVvNvw/exec";

export class GoogleSheetsStorageAdapter implements StorageAdapter {
  async callSheet(payload: SheetPayload) {
    const webappUrl =
      process.env.SHEETS_WEBAPP_URL || process.env.SHEET_WEB_APP_URL || DEFAULT_WEBAPP_URL;

    const secret = process.env.SHEETS_SECRET || process.env.SECRET || "";

    const requestBody = {
      secret,
      tab: payload.tab || "Leads",
      action: payload.action || "create",
      session_id: payload.session_id || payload.data?.session_id,
      overall_score: payload.overall_score || payload.data?.overall_score,
      sub_scores: payload.sub_scores || payload.data?.sub_scores,
      data: payload.data || {},
      ...payload,
    };

    try {
      const res = await fetch(webappUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(requestBody),
        redirect: "follow",
        cache: "no-store",
      });

      const responseData = await res.json().catch(() => ({ ok: true }));
      return responseData;
    } catch (err) {
      console.error("Storage adapter request error:", err);
      // Non-blocking fallback so user UX stays smooth
      return { ok: true, fallback: true };
    }
  }
}

export class DatabaseStorageAdapter implements StorageAdapter {
  async callSheet(): Promise<{ ok: boolean; error?: string }> {
    throw new Error("Database adapter not configured. Set DATABASE_URL and enable Supabase adapter.");
  }
}

export const storage = new GoogleSheetsStorageAdapter();
