"use client";

import type { Lead } from "@/types/lead";
import { create } from "zustand";

type LeadStore = {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  clearLeads: () => void;
};

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  clearLeads: () => set({ leads: [] })
}));
