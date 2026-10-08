/**
 * Client Info Collector for IP, Location (via OS Geolocation / IP fallback), Browser & OS
 */

export interface ClientDetails {
  ip: string;
  location: string;
  browser: string;
  os: string;
}

export function parseUserAgent(): { browser: string; os: string } {
  if (typeof navigator === "undefined") {
    return { browser: "Unknown Browser", os: "Unknown OS" };
  }

  const ua = navigator.userAgent;
  let browser = "Chrome";
  let os = "Android";

  // OS Detection
  if (/android/i.test(ua)) {
    const match = ua.match(/Android\s([0-9\.]+)/i);
    os = match ? `Android ${match[1]}` : "Android";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    const match = ua.match(/OS\s([0-9_]+)/i);
    os = match ? `iOS ${match[1].replace(/_/g, ".")}` : "iOS";
  } else if (/windows nt 10/i.test(ua)) {
    os = "Windows 10/11";
  } else if (/mac os x/i.test(ua)) {
    os = "macOS";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  // Browser Detection
  if (/Instagram/i.test(ua)) {
    browser = "Instagram App";
  } else if (/FBAN|FBAV/i.test(ua)) {
    browser = "Facebook App";
  } else if (/Edg/i.test(ua)) {
    browser = "Edge";
  } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
    const match = ua.match(/Chrome\/([0-9]+)/);
    browser = match ? `Chrome ${match[1]}` : "Chrome";
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    const match = ua.match(/Version\/([0-9]+)/);
    browser = match ? `Safari ${match[1]}` : "Safari";
  } else if (/Firefox/i.test(ua)) {
    const match = ua.match(/Firefox\/([0-9]+)/);
    browser = match ? `Firefox ${match[1]}` : "Firefox";
  }

  return { browser, os };
}

export async function fetchClientIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "127.0.0.1";
  } catch {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.ip || "127.0.0.1";
    } catch {
      return "127.0.0.1";
    }
  }
}

export async function requestLocationWithOSPermission(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolveIPLocation().then(resolve);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Vijayawada";
          const state = data.address?.state || "Andhra Pradesh";
          resolve(`${city}, ${state}`);
        } catch {
          resolveIPLocation().then(resolve);
        }
      },
      () => {
        // Geolocation denied or timed out -> Fallback to IP geolocation
        resolveIPLocation().then(resolve);
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  });
}

async function resolveIPLocation(): Promise<string> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    if (data.city && data.region) {
      return `${data.city}, ${data.region}`;
    }
    return "Vijayawada, Andhra Pradesh";
  } catch {
    return "Vijayawada, Andhra Pradesh";
  }
}
