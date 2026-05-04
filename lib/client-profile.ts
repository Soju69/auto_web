"use client";

export type SavedClientProfile = {
  clientId: string;
  name: string;
  phone: string;
  email?: string;
};

export type RegisteredClientProfile = SavedClientProfile & {
  password: string;
};

const storageKey = "auto-city-pro-client-profile";
const registryKey = "auto-city-pro-client-registry";

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
  updateRegisteredClient(nextProfile);
  return nextProfile;
}

export function getRegisteredClients(): RegisteredClientProfile[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawRegistry = window.localStorage.getItem(registryKey);
    return rawRegistry ? (JSON.parse(rawRegistry) as RegisteredClientProfile[]) : [];
  } catch {
    return [];
  }
}

export function findRegisteredClientByPhone(phone: string) {
  const normalizedPhone = normalizePhone(phone);
  return getRegisteredClients().find((client) => normalizePhone(client.phone) === normalizedPhone) ?? null;
}

export function registerClientProfile(values: {
  name: string;
  phone: string;
  email?: string;
  password: string;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const existingClient = findRegisteredClientByPhone(values.phone);

  if (existingClient) {
    return null;
  }

  const nextClient: RegisteredClientProfile = {
    clientId: createClientId(),
    name: values.name,
    phone: values.phone,
    email: values.email || undefined,
    password: values.password
  };
  const nextRegistry = [nextClient, ...getRegisteredClients()];
  window.localStorage.setItem(registryKey, JSON.stringify(nextRegistry));
  window.localStorage.setItem(storageKey, JSON.stringify(stripPassword(nextClient)));
  return stripPassword(nextClient);
}

export function updateClientProfile(values: SavedClientProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(values));
  updateRegisteredClient(values);
  return values;
}

function updateRegisteredClient(profile: SavedClientProfile) {
  const clients = getRegisteredClients();
  let didUpdate = false;
  const nextRegistry = clients.map((client) => {
    if (client.clientId !== profile.clientId) {
      return client;
    }

    didUpdate = true;
    return {
      ...client,
      name: profile.name,
      phone: profile.phone,
      email: profile.email
    };
  });

  if (didUpdate) {
    window.localStorage.setItem(registryKey, JSON.stringify(nextRegistry));
  }
}

function stripPassword(client: RegisteredClientProfile): SavedClientProfile {
  return {
    clientId: client.clientId,
    name: client.name,
    phone: client.phone,
    email: client.email
  };
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}
