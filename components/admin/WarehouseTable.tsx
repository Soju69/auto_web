"use client";

import { AlertTriangle, Minus, PackagePlus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { initialWarehouseItems, warehouseCategoryLabels } from "@/data/warehouse";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { WarehouseItem, WarehouseItemCategory } from "@/types/warehouse-item";

type DraftItem = Omit<WarehouseItem, "id" | "quantity" | "minQuantity"> & {
  quantity: string;
  minQuantity: string;
};

const emptyDraft: DraftItem = {
  sku: "",
  name: "",
  category: "part",
  compatibleWith: "",
  quantity: "1",
  minQuantity: "1",
  unit: "шт.",
  location: "",
  supplier: ""
};

export function WarehouseTable() {
  const [items, setItems] = useState<WarehouseItem[]>(initialWarehouseItems);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WarehouseItemCategory | "all">("all");
  const [draft, setDraft] = useState<DraftItem>(emptyDraft);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [item.sku, item.name, item.compatibleWith, item.location, item.supplier]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, items, query]);

  const lowStockCount = items.filter((item) => item.quantity <= item.minQuantity).length;
  const partsCount = items.filter((item) => item.category === "part").length;
  const accessoriesCount = items.filter((item) => item.category === "accessory").length;

  function changeQuantity(id: string, delta: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  }

  function updateDraft<K extends keyof DraftItem>(key: K, value: DraftItem[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function addItem() {
    if (!draft.name.trim() || !draft.sku.trim()) {
      return;
    }

    const nextItem: WarehouseItem = {
      id: `wh-${Date.now()}`,
      sku: draft.sku.trim(),
      name: draft.name.trim(),
      category: draft.category,
      compatibleWith: draft.compatibleWith.trim() || "Все модели",
      quantity: Math.max(0, Number(draft.quantity) || 0),
      minQuantity: Math.max(0, Number(draft.minQuantity) || 0),
      unit: draft.unit.trim() || "шт.",
      location: draft.location.trim() || "Не указано",
      supplier: draft.supplier.trim() || "Не указан"
    };

    setItems((current) => [nextItem, ...current]);
    setDraft(emptyDraft);
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-3">
        <WarehouseKpi label="Всего позиций" value={String(items.length)} />
        <WarehouseKpi label="Запчасти / оборудование" value={`${partsCount} / ${accessoriesCount}`} />
        <WarehouseKpi label="Ниже минимума" value={String(lowStockCount)} warning={lowStockCount > 0} />
      </div>

      <GlassCard className="p-5">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Остатки склада</h2>
            <p className="mt-2 text-sm text-luxury-soft">
              Контроль запчастей и дополнительного оборудования: остаток, минимум, место хранения и поставщик.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск по складу"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
              />
            </div>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as WarehouseItemCategory | "all")}
              className="h-12 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              <option value="all" className="bg-luxury-main">
                Все типы
              </option>
              <option value="part" className="bg-luxury-main">
                Запчасти
              </option>
              <option value="accessory" className="bg-luxury-main">
                Доп. оборудование
              </option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
              <tr>
                <th className="pb-3 pr-6 font-medium">Позиция</th>
                <th className="pb-3 pr-6 font-medium">Тип</th>
                <th className="pb-3 pr-6 font-medium">Совместимость</th>
                <th className="pb-3 pr-6 font-medium">Остаток</th>
                <th className="pb-3 pr-6 font-medium">Хранение</th>
                <th className="pb-3 pr-0 font-medium">Движение</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => {
                const isLow = item.quantity <= item.minQuantity;
                return (
                  <tr key={item.id} className="border-t border-white/8 align-top">
                    <td className="py-4 pr-6">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-white/45">{item.sku}</p>
                      <p className="mt-2 text-xs text-luxury-soft">Поставщик: {item.supplier}</p>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-white/72">
                        {warehouseCategoryLabels[item.category]}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-sm leading-6 text-luxury-soft">{item.compatibleWith}</td>
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-2">
                        {isLow ? <AlertTriangle className="h-4 w-4 text-amber-300" aria-hidden="true" /> : null}
                        <p className={cn("font-semibold", isLow ? "text-amber-200" : "text-white")}>
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-white/45">Минимум: {item.minQuantity} {item.unit}</p>
                    </td>
                    <td className="py-4 pr-6">
                      <p className="text-sm text-white">{item.location}</p>
                    </td>
                    <td className="py-4 pr-0">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Списать ${item.name}`}
                          className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-luxury-champagne/45 hover:text-white"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Добавить ${item.name}`}
                          className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-luxury-champagne/45 hover:text-white"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
            <PackagePlus className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold">Добавить позицию</h2>
            <p className="mt-1 text-sm text-luxury-soft">Новая запчасть или доп. оборудование появится в складской таблице.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InputField label="Артикул" id="warehouse-sku" value={draft.sku} onChange={(event) => updateDraft("sku", event.target.value)} />
          <InputField label="Наименование" id="warehouse-name" value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} />
          <div className="space-y-2">
            <Label htmlFor="warehouse-category">Тип</Label>
            <select
              id="warehouse-category"
              value={draft.category}
              onChange={(event) => updateDraft("category", event.target.value as WarehouseItemCategory)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              <option value="part" className="bg-luxury-main">Запчасть</option>
              <option value="accessory" className="bg-luxury-main">Доп. оборудование</option>
            </select>
          </div>
          <InputField label="Совместимость" id="warehouse-compatible" value={draft.compatibleWith} onChange={(event) => updateDraft("compatibleWith", event.target.value)} />
          <InputField label="Остаток" id="warehouse-quantity" type="number" min={0} value={draft.quantity} onChange={(event) => updateDraft("quantity", event.target.value)} />
          <InputField label="Минимум" id="warehouse-min" type="number" min={0} value={draft.minQuantity} onChange={(event) => updateDraft("minQuantity", event.target.value)} />
          <InputField label="Ед. изм." id="warehouse-unit" value={draft.unit} onChange={(event) => updateDraft("unit", event.target.value)} />
          <InputField label="Ячейка" id="warehouse-location" value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} />
          <InputField label="Поставщик" id="warehouse-supplier" value={draft.supplier} onChange={(event) => updateDraft("supplier", event.target.value)} />
        </div>

        <div className="mt-5 flex justify-end">
          <PrimaryButton type="button" onClick={addItem}>Добавить на склад</PrimaryButton>
        </div>
      </GlassCard>
    </div>
  );
}

function WarehouseKpi({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return (
    <GlassCard className="p-5">
      <p className="text-sm text-luxury-soft">{label}</p>
      <p className={cn("mt-3 font-display text-4xl font-semibold", warning ? "text-amber-200" : "text-white")}>
        {value}
      </p>
    </GlassCard>
  );
}
