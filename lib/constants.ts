import {
  Car,
  Clock3,
  Gauge,
  Headphones,
  ShieldCheck,
  Sparkles,
  Umbrella,
  UsersRound,
  Wrench
} from "lucide-react";

export const BRAND_NAME = "АВТО СИТИ ПРО";

export const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/trade-in", label: "Trade-In" },
  { href: "/service", label: "Сервис" },
  { href: "/insurance", label: "Страхование" },
  { href: "/consultation", label: "Консультация" },
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
    description: "Сервис, гарантия и сопровождение остаются внутри одной экосистемы АВТО СИТИ ПРО.",
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
  { label: "Каталог", href: "/catalog", icon: Car },
  { label: "Тест-драйв", href: "/catalog/kia-k5-gt-line", icon: Clock3 },
  { label: "Trade-In", href: "/trade-in", icon: Gauge },
  { label: "Сервис", href: "/service", icon: Wrench },
  { label: "Страхование", href: "/insurance", icon: Umbrella },
  { label: "Консультация", href: "/consultation", icon: Headphones },
  { label: "Подбор сделки", href: "/contact", icon: UsersRound }
];
