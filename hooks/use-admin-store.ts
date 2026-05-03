"use client";

import { create } from "zustand";
import { crmUsers, initialLeads } from "@/data/crm";
import { initialInventory } from "@/data/inventory";
import { initialServiceOrders } from "@/data/service";
import { initialTradeInRequests } from "@/data/trade-in";
import type { Lead, LeadStatus } from "@/types/lead";
import type { InventoryItem, InventoryStatus } from "@/types/inventory-item";
import type { ServiceOrder, ServiceOrderStatus } from "@/types/service-order";
import type { TradeInRequest, TradeInRequestStatus } from "@/types/trade-in-request";
import type { User, UserRole, UserStatus } from "@/types/user";

type AdminStore = {
  currentUserId: string;
  isHydrated: boolean;
  isLoading: boolean;
  users: User[];
  leads: Lead[];
  serviceOrders: ServiceOrder[];
  tradeInRequests: TradeInRequest[];
  inventory: InventoryItem[];
  hydrate: (force?: boolean) => Promise<void>;
  setCurrentUser: (id: string) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<void>;
  assignLead: (id: string, managerId: string) => Promise<void>;
  updateServiceStatus: (id: string, status: ServiceOrderStatus) => Promise<void>;
  assignServiceAdvisor: (id: string, advisorId: string) => Promise<void>;
  assignMechanic: (id: string, mechanicId: string) => Promise<void>;
  updateTradeInStatus: (id: string, status: TradeInRequestStatus) => Promise<void>;
  assignTradeInAppraiser: (id: string, appraiserId: string) => Promise<void>;
  updateTradeInEstimate: (id: string, estimatedValue: number) => Promise<void>;
  updateInventoryStatus: (carId: string, status: InventoryStatus) => Promise<void>;
  toggleInventoryVisibility: (carId: string) => Promise<void>;
  toggleFeatured: (carId: string) => Promise<void>;
  assignInventoryManager: (carId: string, managerId: string) => Promise<void>;
  updateUserRole: (id: string, role: UserRole) => Promise<void>;
  updateUserStatus: (id: string, status: UserStatus) => Promise<void>;
  createUser: (payload: {
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
  }) => Promise<void>;
};

type AdminSnapshot = {
  users: User[];
  leads: Lead[];
  serviceOrders: ServiceOrder[];
  tradeInRequests: TradeInRequest[];
  inventory: InventoryItem[];
};

async function fetchJson<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const useAdminStore = create<AdminStore>((set) => ({
  currentUserId: crmUsers[0]?.id ?? "",
  isHydrated: false,
  isLoading: false,
  users: crmUsers,
  leads: initialLeads,
  serviceOrders: initialServiceOrders,
  tradeInRequests: initialTradeInRequests,
  inventory: initialInventory,
  hydrate: async (force = false) => {
    const state = useAdminStore.getState();

    if (state.isHydrated && !force) {
      return;
    }

    set({ isLoading: true });

    try {
      const snapshot = await fetchJson<AdminSnapshot>("/api/admin/snapshot");
      const nextCurrentUserId =
        snapshot.users.some((user) => user.id === state.currentUserId)
          ? state.currentUserId
          : snapshot.users[0]?.id ?? "";

      set({
        ...snapshot,
        currentUserId: nextCurrentUserId,
        isHydrated: true,
        isLoading: false
      });
    } catch (error) {
      console.error("Не удалось загрузить данные админки", error);
      set({ isLoading: false });
    }
  },
  setCurrentUser: (id) => set({ currentUserId: id }),
  updateLeadStatus: async (id, status) => {
    const lead = await fetchJson<Lead>(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    set((state) => ({
      leads: state.leads.map((item) => (item.id === id ? lead : item))
    }));
  },
  assignLead: async (id, managerId) => {
    const lead = await fetchJson<Lead>(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ managerId })
    });

    set((state) => ({
      leads: state.leads.map((item) => (item.id === id ? lead : item))
    }));
  },
  updateServiceStatus: async (id, status) => {
    const order = await fetchJson<ServiceOrder>(`/api/admin/service-orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    set((state) => ({
      serviceOrders: state.serviceOrders.map((item) => (item.id === id ? order : item))
    }));
  },
  assignServiceAdvisor: async (id, advisorId) => {
    const order = await fetchJson<ServiceOrder>(`/api/admin/service-orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ advisorId })
    });

    set((state) => ({
      serviceOrders: state.serviceOrders.map((item) => (item.id === id ? order : item))
    }));
  },
  assignMechanic: async (id, mechanicId) => {
    const order = await fetchJson<ServiceOrder>(`/api/admin/service-orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ mechanicId })
    });

    set((state) => ({
      serviceOrders: state.serviceOrders.map((item) => (item.id === id ? order : item))
    }));
  },
  updateTradeInStatus: async (id, status) => {
    const request = await fetchJson<TradeInRequest>(`/api/admin/trade-in/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    set((state) => ({
      tradeInRequests: state.tradeInRequests.map((item) => (item.id === id ? request : item))
    }));
  },
  assignTradeInAppraiser: async (id, appraiserId) => {
    const request = await fetchJson<TradeInRequest>(`/api/admin/trade-in/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ appraiserId })
    });

    set((state) => ({
      tradeInRequests: state.tradeInRequests.map((item) => (item.id === id ? request : item))
    }));
  },
  updateTradeInEstimate: async (id, estimatedValue) => {
    const request = await fetchJson<TradeInRequest>(`/api/admin/trade-in/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ estimatedValue })
    });

    set((state) => ({
      tradeInRequests: state.tradeInRequests.map((item) => (item.id === id ? request : item))
    }));
  },
  updateInventoryStatus: async (carId, status) => {
    const inventoryItem = await fetchJson<InventoryItem>(`/api/admin/inventory/${carId}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    set((state) => ({
      inventory: state.inventory.map((item) => (item.carId === carId ? inventoryItem : item))
    }));
  },
  toggleInventoryVisibility: async (carId) => {
    const currentItem = useAdminStore.getState().inventory.find((item) => item.carId === carId);

    if (!currentItem) {
      return;
    }

    const inventoryItem = await fetchJson<InventoryItem>(`/api/admin/inventory/${carId}`, {
      method: "PATCH",
      body: JSON.stringify({ visible: !currentItem.visible })
    });

    set((state) => ({
      inventory: state.inventory.map((item) => (item.carId === carId ? inventoryItem : item))
    }));
  },
  toggleFeatured: async (carId) => {
    const currentItem = useAdminStore.getState().inventory.find((item) => item.carId === carId);

    if (!currentItem) {
      return;
    }

    const inventoryItem = await fetchJson<InventoryItem>(`/api/admin/inventory/${carId}`, {
      method: "PATCH",
      body: JSON.stringify({ featured: !currentItem.featured })
    });

    set((state) => ({
      inventory: state.inventory.map((item) => (item.carId === carId ? inventoryItem : item))
    }));
  },
  assignInventoryManager: async (carId, managerId) => {
    const inventoryItem = await fetchJson<InventoryItem>(`/api/admin/inventory/${carId}`, {
      method: "PATCH",
      body: JSON.stringify({ managerId })
    });

    set((state) => ({
      inventory: state.inventory.map((item) => (item.carId === carId ? inventoryItem : item))
    }));
  },
  updateUserRole: async (id, role) => {
    const user = await fetchJson<User>(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ role })
    });

    set((state) => ({
      users: state.users.map((item) => (item.id === id ? user : item))
    }));
  },
  updateUserStatus: async (id, status) => {
    const user = await fetchJson<User>(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });

    set((state) => ({
      users: state.users.map((item) => (item.id === id ? user : item))
    }));
  },
  createUser: async (payload) => {
    const user = await fetchJson<User>("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    set((state) => ({
      users: [user, ...state.users]
    }));
  }
}));
