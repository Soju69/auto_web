"use client";

export type SavedClientProfile = {
  clientId: string;
  name: string;
  phone: string;
  email?: string;
};

const storageKey = "auto-city-pro-client-profile";

function createClientId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}`;
}

export function getSavedClientProfile(): SavedClientProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawProfile = window.localStorage.getItem(storageKey);
    return rawProfile ? (JSON.parse(rawProfile) as SavedClientProfile) : null;
  } catch {
    return null;
  }
}

export function saveClientProfile(values: { name: string; phone: string; email?: string; clientId?: string }) {
  if (typeof window === "undefined") {
    return;
  }

  const currentProfile = getSavedClientProfile();
  const nextEmail = values.email !== undefined ? values.email || undefined : currentProfile?.email;
  const nextProfile: SavedClientProfile = {
    clientId: values.clientId || currentProfile?.clientId || createClientId(),
    name: values.name,
    phone: values.phone,
    email: nextEmail
  };

  window.localStorage.setItem(storageKey, JSON.stringify(nextProfile));
  return nextProfile;
}
