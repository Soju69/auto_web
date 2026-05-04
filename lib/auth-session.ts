"use client";

import type { UserRole } from "@/types/user";

export type AuthSession =
  | {
      type: "client";
      clientId: string;
      name: string;
      phone: string;
      email?: string;
    }
  | {
      type: "employee";
      name: string;
      email: string;
      role: UserRole;
    };

const storageKey = "auto-city-pro-auth-session";

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(storageKey);
    return rawSession ? (JSON.parse(rawSession) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
}

export function getDefaultAdminPath(role: UserRole) {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "sales_manager") {
    return "/admin/leads";
  }

  if (role === "service_manager" || role === "mechanic") {
    return "/admin/service";
  }

  return "/admin/trade-in";
}

export function canAccessAdminPath(role: UserRole, pathname: string) {
  if (role === "admin") {
    return true;
  }

  if (role === "sales_manager") {
    return pathname === "/admin" || pathname.startsWith("/admin/leads") || pathname.startsWith("/admin/catalog");
  }

  if (role === "service_manager" || role === "mechanic") {
    return pathname.startsWith("/admin/service");
  }

  return pathname.startsWith("/admin/trade-in");
}
