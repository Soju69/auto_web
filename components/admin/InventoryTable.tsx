"use client";

import { useEffect, useState } from "react";
import { cars } from "@/data/cars";
import { inventoryStatusLabels } from "@/data/inventory";
import { roleLabels } from "@/data/crm";
import { useAdminStore } from "@/hooks/use-admin-store";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { InventoryStatusBadge } from "@/components/admin/InventoryStatusBadge";
import type { BrandSlug, Car, FuelType, Transmission } from "@/types/car";
import type { InventoryStatus } from "@/types/inventory-item";

const statuses: InventoryStatus[] = ["available", "reserved", "sold", "hidden"];
const customCarsStorageKey = "auto-city-pro-custom-cars";
const customInventoryStorageKey = "auto-city-pro-custom-inventory";
const brandOptions: Array<{ slug: BrandSlug; label: string }> = [
  { slug: "kia", label: "KIA" },
  { slug: "hyundai", label: "Hyundai" },
  { slug: "xiaomi", label: "Xiaomi Auto" },
  { slug: "zeekr", label: "Zeekr" }
];
const transmissionOptions: Transmission[] = ["Автомат", "Робот", "Редуктор"];
const fuelOptions: FuelType[] = ["Бензин", "Гибрид", "Электро"];

type CarDraft = {
  brandSlug: BrandSlug;
  model: string;
  trim: string;
  year: string;
  price: string;
  mileage: string;
  transmission: Transmission;
  fuelType: FuelType;
  drivetrain: string;
  color: string;
  location: string;
  managerId: string;
};

const emptyCarDraft: CarDraft = {
  brandSlug: "kia",
  model: "",
  trim: "",
  year: "2024",
  price: "",
  mileage: "0",
  transmission: "Автомат",
  fuelType: "Бензин",
  drivetrain: "Передний",
  color: "",
  location: "Шоурум",
  managerId: ""
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
}

export function InventoryTable() {
  const users = useAdminStore((state) => state.users);
  const inventory = useAdminStore((state) => state.inventory);
  const updateInventoryStatus = useAdminStore((state) => state.updateInventoryStatus);
  const toggleInventoryVisibility = useAdminStore((state) => state.toggleInventoryVisibility);
  const toggleFeatured = useAdminStore((state) => state.toggleFeatured);
  const assignInventoryManager = useAdminStore((state) => state.assignInventoryManager);
  const managers = users.filter((user) => user.role === "sales_manager" || user.role === "admin");
  const [addedCars, setAddedCars] = useState<Car[]>([]);
  const [addedInventory, setAddedInventory] = useState<
    Array<{ carId: string; visible: boolean; featured: boolean; status: InventoryStatus; location: string; managerId?: string }>
  >([]);
  const [draft, setDraft] = useState<CarDraft>(() => ({
    ...emptyCarDraft,
    managerId: managers[0]?.id ?? ""
  }));
  const [message, setMessage] = useState<string | null>(null);
  const allCars = [...addedCars, ...cars];
  const allInventory = [...addedInventory, ...inventory];

  useEffect(() => {
    try {
      const savedCars = window.localStorage.getItem(customCarsStorageKey);
      const savedInventory = window.localStorage.getItem(customInventoryStorageKey);
      setAddedCars(savedCars ? (JSON.parse(savedCars) as Car[]) : []);
      setAddedInventory(
        savedInventory
          ? (JSON.parse(savedInventory) as Array<{
              carId: string;
              visible: boolean;
              featured: boolean;
              status: InventoryStatus;
              location: string;
              managerId?: string;
            }>)
          : []
      );
    } catch {
      setAddedCars([]);
      setAddedInventory([]);
    }
  }, []);

  function updateDraft<K extends keyof CarDraft>(key: K, value: CarDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function saveAddedInventory(
    updater: (
      current: Array<{
        carId: string;
        visible: boolean;
        featured: boolean;
        status: InventoryStatus;
        location: string;
        managerId?: string;
      }>
    ) => Array<{
      carId: string;
      visible: boolean;
      featured: boolean;
      status: InventoryStatus;
      location: string;
      managerId?: string;
    }>
  ) {
    setAddedInventory((current) => {
      const next = updater(current);
      window.localStorage.setItem(customInventoryStorageKey, JSON.stringify(next));
      return next;
    });
  }

  function addCar() {
    setMessage(null);

    if (!draft.model.trim() || !draft.price.trim()) {
      setMessage("Укажите модель и цену автомобиля.");
      return;
    }

    const brand = brandOptions.find((item) => item.slug === draft.brandSlug)?.label ?? "KIA";
    const id = `${draft.brandSlug}-${slugify(draft.model)}-${Date.now()}`;
    const fallbackImage = cars[0]?.image ?? "";
    const car: Car = {
      id,
      brandSlug: draft.brandSlug,
      brand,
      model: draft.model.trim(),
      trim: draft.trim.trim() || "Base",
      year: Number(draft.year) || new Date().getFullYear(),
      price: Number(draft.price) || 0,
      mileage: Number(draft.mileage) || 0,
      transmission: draft.transmission,
      fuelType: draft.fuelType,
      power: "Не указано",
      drivetrain: draft.drivetrain.trim() || "Не указан",
      engine: draft.fuelType === "Электро" ? "EV-система" : "ДВС",
      color: draft.color.trim() || "Не указан",
      badge: "Новый лот",
      image: fallbackImage,
      gallery: [fallbackImage],
      description: "Автомобиль добавлен через административную панель.",
      specs: [
        { label: "Год", value: draft.year },
        { label: "Коробка", value: draft.transmission },
        { label: "Тип", value: draft.fuelType },
        { label: "Привод", value: draft.drivetrain || "Не указан" }
      ]
    };

    const nextCars = [car, ...addedCars];
    const nextInventory = [
      {
        carId: id,
        visible: true,
        featured: false,
        status: "available" as InventoryStatus,
        location: draft.location.trim() || "Шоурум",
        managerId: draft.managerId || managers[0]?.id
      },
      ...addedInventory
    ];
    setAddedCars(nextCars);
    setAddedInventory(nextInventory);
    window.localStorage.setItem(customCarsStorageKey, JSON.stringify(nextCars));
    window.localStorage.setItem(customInventoryStorageKey, JSON.stringify(nextInventory));
    setDraft({
      ...emptyCarDraft,
      managerId: managers[0]?.id ?? ""
    });
    setMessage("Автомобиль добавлен в таблицу управления каталогом.");
  }

  return (
    <GlassCard className="p-5">
      <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="font-display text-2xl font-semibold">Управление лотами</h2>
          <p className="mt-2 text-sm text-luxury-soft">
            Статус автомобиля, видимость на сайте, флаг витрины и закрепленный менеджер.
          </p>
        </div>
      </div>

      <div className="mt-5 border-b border-white/10 pb-5">
        <h3 className="font-display text-xl font-semibold">Добавить автомобиль</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="car-brand">Марка</Label>
            <select
              id="car-brand"
              value={draft.brandSlug}
              onChange={(event) => updateDraft("brandSlug", event.target.value as BrandSlug)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              {brandOptions.map((brand) => (
                <option key={brand.slug} value={brand.slug} className="bg-luxury-main">
                  {brand.label}
                </option>
              ))}
            </select>
          </div>
          <InputField label="Модель" id="car-model" value={draft.model} onChange={(event) => updateDraft("model", event.target.value)} />
          <InputField label="Комплектация" id="car-trim" value={draft.trim} onChange={(event) => updateDraft("trim", event.target.value)} />
          <InputField label="Год" id="car-year" type="number" min={1980} max={2035} value={draft.year} onChange={(event) => updateDraft("year", event.target.value)} />
          <InputField label="Цена" id="car-price" type="number" min={0} value={draft.price} onChange={(event) => updateDraft("price", event.target.value)} />
          <InputField label="Пробег" id="car-mileage" type="number" min={0} value={draft.mileage} onChange={(event) => updateDraft("mileage", event.target.value)} />
          <div className="space-y-2">
            <Label htmlFor="car-transmission">Коробка</Label>
            <select
              id="car-transmission"
              value={draft.transmission}
              onChange={(event) => updateDraft("transmission", event.target.value as Transmission)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              {transmissionOptions.map((item) => (
                <option key={item} value={item} className="bg-luxury-main">
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="car-fuel">Тип</Label>
            <select
              id="car-fuel"
              value={draft.fuelType}
              onChange={(event) => updateDraft("fuelType", event.target.value as FuelType)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              {fuelOptions.map((item) => (
                <option key={item} value={item} className="bg-luxury-main">
                  {item}
                </option>
              ))}
            </select>
          </div>
          <InputField label="Привод" id="car-drivetrain" value={draft.drivetrain} onChange={(event) => updateDraft("drivetrain", event.target.value)} />
          <InputField label="Цвет" id="car-color" value={draft.color} onChange={(event) => updateDraft("color", event.target.value)} />
          <InputField label="Место хранения" id="car-location" value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} />
          <div className="space-y-2">
            <Label htmlFor="car-manager">Менеджер</Label>
            <select
              id="car-manager"
              value={draft.managerId}
              onChange={(event) => updateDraft("managerId", event.target.value)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
            >
              {managers.map((user) => (
                <option key={user.id} value={user.id} className="bg-luxury-main">
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-luxury-soft">
            {message ?? "Новый автомобиль появится в таблице управления лотами."}
          </p>
          <PrimaryButton type="button" onClick={addCar}>
            Добавить автомобиль
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-xs uppercase tracking-[0.2em] text-white/35">
            <tr>
              <th className="pb-3 pr-6 font-medium">Автомобиль</th>
              <th className="pb-3 pr-6 font-medium">Финансы</th>
              <th className="pb-3 pr-6 font-medium">Менеджер</th>
              <th className="pb-3 pr-6 font-medium">Публикация</th>
              <th className="pb-3 pr-6 font-medium">Статус</th>
              <th className="pb-3 pr-0 font-medium">Витрина</th>
            </tr>
          </thead>
          <tbody>
            {allInventory.map((item) => {
              const car = allCars.find((carItem) => carItem.id === item.carId);
              const manager = users.find((user) => user.id === item.managerId);

              if (!car) {
                return null;
              }

              return (
                <tr key={item.carId} className="border-t border-white/8 align-top">
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">
                      {car.brand} {car.model} {car.trim}
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      {car.year} · {car.drivetrain} · {car.fuelType}
                    </p>
                    <p className="mt-2 text-xs text-luxury-soft">{item.location}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="font-medium text-white">{formatCurrency(car.price)}</p>
                    <p className="mt-2 text-sm text-luxury-soft">{formatMileage(car.mileage)}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <select
                      value={item.managerId ?? ""}
                      onChange={(event) =>
                        addedInventory.some((addedItem) => addedItem.carId === item.carId)
                          ? saveAddedInventory((current) =>
                              current.map((addedItem) =>
                                addedItem.carId === item.carId ? { ...addedItem, managerId: event.target.value } : addedItem
                              )
                            )
                          : assignInventoryManager(item.carId, event.target.value)
                      }
                      className="h-11 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                    >
                      {managers.map((user) => (
                        <option key={user.id} value={user.id} className="bg-luxury-main">
                          {user.name} · {roleLabels[user.role]}
                        </option>
                      ))}
                    </select>
                    {manager ? (
                      <p className="mt-2 text-xs text-white/45">Загрузка: {manager.workload ?? 0}</p>
                    ) : null}
                  </td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={() =>
                        addedInventory.some((addedItem) => addedItem.carId === item.carId)
                          ? saveAddedInventory((current) =>
                              current.map((addedItem) =>
                                addedItem.carId === item.carId ? { ...addedItem, visible: !addedItem.visible } : addedItem
                              )
                            )
                          : toggleInventoryVisibility(item.carId)
                      }
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {item.visible ? "Показан на сайте" : "Скрыт с сайта"}
                    </button>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="space-y-3">
                      <InventoryStatusBadge status={item.status} />
                      <select
                        value={item.status}
                        onChange={(event) =>
                          addedInventory.some((addedItem) => addedItem.carId === item.carId)
                            ? saveAddedInventory((current) =>
                                current.map((addedItem) =>
                                  addedItem.carId === item.carId
                                    ? { ...addedItem, status: event.target.value as InventoryStatus }
                                    : addedItem
                                )
                              )
                            : updateInventoryStatus(item.carId, event.target.value as InventoryStatus)
                        }
                        className="h-11 min-w-[200px] rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status} className="bg-luxury-main">
                            {inventoryStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="py-4 pr-0">
                    <button
                      type="button"
                      onClick={() =>
                        addedInventory.some((addedItem) => addedItem.carId === item.carId)
                          ? saveAddedInventory((current) =>
                              current.map((addedItem) =>
                                addedItem.carId === item.carId ? { ...addedItem, featured: !addedItem.featured } : addedItem
                              )
                            )
                          : toggleFeatured(item.carId)
                      }
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {item.featured ? "На главной" : "Обычный лот"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
