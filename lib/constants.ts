import { Car, Clock3, Gauge, ShieldCheck, Sparkles, UsersRound, Wrench } from "lucide-react";

export const BRAND_NAME = "Aurum Motors";

export const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/trade-in", label: "Trade-In" },
  { href: "/service", label: "Сервис" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" }
] as const;

export const whyChooseUs = [
  {
    title: "Проверяем до публикации",
    description: "Диагностика, документы, история обслуживания и юридическая чистота собраны в ясный профиль автомобиля.",
    icon: ShieldCheck
  },
  {
    title: "Ведем сделку под ключ",
    description: "Показ, кредит, trade-in, документы и выдача проходят по одному спокойному сценарию.",
    icon: UsersRound
  },
  {
    title: "Держим премиальный ритм",
    description: "Быстрый ответ, понятные договоренности и деликатная коммуникация без перегруза клиента.",
    icon: Sparkles
  },
  {
    title: "Остаемся после покупки",
    description: "Сервис, гарантия и сопровождение остаются внутри одной экосистемы Aurum.",
    icon: Wrench
  }
];

export const serviceTypes = [
  "Диагностика",
  "Плановое ТО",
  "Проверка электроники",
  "Детейлинг",
  "Шины и тормоза",
  "Гарантийная консультация"
];

export const catalogFilters = {
  brands: ["KIA", "Hyundai", "Xiaomi Auto", "Zeekr"],
  transmissions: ["Автомат", "Робот", "Редуктор"],
  fuelTypes: ["Бензин", "Гибрид", "Электро"],
  drivetrains: ["Передний", "Задний", "Полный"]
};

export const platformPillars = [
  { label: "Каталог", icon: Car },
  { label: "Тест-драйв", icon: Clock3 },
  { label: "Trade-In", icon: Gauge },
  { label: "Сервис", icon: Wrench },
  { label: "Подбор сделки", icon: UsersRound }
];
