/**
 * Storage Adapter Interface
 * Decouples Next.js API handlers from the underlying data store.
 * Swapping from Google Sheets to PostgreSQL/Supabase changes only this adapter.
 */

export interface SheetPayload {
  tab?: string;
  action?: string;
  session_id?: string;
  overall_score?: number;
  sub_scores?: Record<string, number>;
  data?: Record<string, unknown>;
}

export interface StorageAdapter {
  callSheet(payload: SheetPayload): Promise<{ ok: boolean; error?: string; [key: string]: unknown }>;
}

export class GoogleSheetsStorageAdapter implements StorageAdapter {
  async callSheet(payload: SheetPayload) {
    const webappUrl = process.env.SHEETS_WEBAPP_URL || process.env.SHEET_WEB_APP_URL;

    if (!webappUrl) {
      console.log("[Dev Storage Mock] Payload:", payload);
      return { ok: true, session_id: payload.session_id || payload.data?.session_id };
    }

    try {
      const res = await fetch(webappUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ secret: process.env.SHEETS_SECRET, ...payload }),
        redirect: "follow",
        cache: "no-store",
      });
      return await res.json();
    } catch (err) {
      console.error("Storage adapter request error:", err);
      return { ok: false, error: String(err) };
    }
  }
}

export class DatabaseStorageAdapter implements StorageAdapter {
  async callSheet(): Promise<{ ok: boolean; error?: string }> {
    throw new Error("Database adapter not configured. Set DATABASE_URL and enable Supabase adapter.");
  }
}

export const storage = new GoogleSheetsStorageAdapter();
