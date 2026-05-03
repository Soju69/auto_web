import type { Brand, BrandSlug, Car } from "@/types/car";

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

const carImages = {
  kiaK5Front: commons("2024 Kia K5 (DL3) 1.jpg"),
  kiaK5Rear: commons("2024 Kia K5 (DL3) 2.jpg"),
  kiaK5Interior: commons("2024 Kia K5 interior.jpg"),
  kiaSportageFront: commons("2024 Kia Sportage SX HEV front.jpg"),
  kiaEv6Main: commons("Kia EV6.jpg"),
  kiaEv6Front: commons("Kia EV6 GT (2024) (53624893933).jpg"),
  kiaEv6Side: commons("Kia EV6 GT (2024) (53625134480).jpg"),
  hyundaiSonataFront: commons("2024 Hyundai Sonata (facelift), front.jpg"),
  hyundaiSonataAlt: commons("2024 Hyundai Sonata SEL, front right, 07-22-2024.jpg"),
  hyundaiSonataRear: commons("2024 Hyundai Sonata, rear.jpg"),
  hyundaiTucsonFront: commons("Hyundai Tucson (NX4, SWB) Facelift Sindelfingen 2024 IMG 9232.jpg"),
  hyundaiTucsonSide: commons("Hyundai Tucson (NX4, SWB) Facelift Sindelfingen 2024 IMG 9237.jpg"),
  hyundaiTucsonAlt: commons("Hyundai Tucson (NX4, SWB) Facelift IMG 2347.jpg"),
  hyundaiIoniqMain: commons("2024 Hyundai Ioniq 5.jpg"),
  hyundaiIoniqFront: commons("Hyundai Ioniq 5.jpg"),
  hyundaiIoniqAlt: commons("Hyundai Ioniq 5 (2024) (53649177218).jpg"),
  xiaomiSu7Pro: commons("Xiaomi SU7 Pro in Tianhe, Guangzhou 20250713.jpg"),
  xiaomiSu7Front: commons("Xiaomi SU7 with Tianjin plates, lower angle from front.jpg"),
  xiaomiSu7Purple: commons("Xiaomi SU7 purple front view (March 21, 2025).jpg"),
  xiaomiSu7Max: commons("Xiaomi SU7 Max.jpg"),
  xiaomiSu7MaxFront: commons("Xiaomi SU7 Max 001.jpg"),
  xiaomiSu7MaxRear: commons("Xiaomi SU7 Max rear-20240413.jpg"),
  zeekr001Main: commons("2023 Zeekr 001.jpg"),
  zeekr001Alt: commons("Zeekr 001 001.jpg"),
  zeekr001Classic: commons("Zeekr 001.jpg"),
  zeekrXMain: commons("Zeekr X 015.jpg"),
  zeekrXFront: commons("Zeekr X 001.jpg"),
  zeekrXAlt: commons("Zeekr X 010.jpg"),
  zeekr009Main: commons("Zeekr 009 020.jpg"),
  zeekr009Front: commons("Zeekr 009 01-cropped.jpg"),
  zeekr009Alt: commons("Zeekr 009 009.jpg")
};

export const brands: Brand[] = [
  {
    slug: "kia",
    name: "KIA",
    eyebrow: "Точный городской премиум",
    title: "KIA для клиентов, которым важны дизайн, ликвидность и спокойная эксплуатация.",
    description:
      "Сильная линейка седанов, кроссоверов и EV: понятная стоимость владения, хорошее оснащение и быстрая сделка.",
    heroImage: carImages.kiaK5Front,
    strengths: ["ликвидность", "комфорт", "гарантия", "современные ассистенты"],
    featuredModels: ["K5", "Sportage", "EV6"]
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    eyebrow: "Баланс технологий и надёжности",
    title: "Hyundai закрывает ежедневные сценарии без лишнего шума и компромиссов.",
    description:
      "От бизнес-седана до электрического кроссовера: автомобили с сильной эргономикой, мягким ходом и прозрачной историей.",
    heroImage: carImages.hyundaiTucsonFront,
    strengths: ["надёжность", "семейный комфорт", "экономичность", "понятный сервис"],
    featuredModels: ["Sonata", "Tucson", "IONIQ 5"]
  },
  {
    slug: "xiaomi",
    name: "Xiaomi Auto",
    eyebrow: "Новая цифровая скорость",
    title: "Xiaomi Auto выглядит как гаджет будущего, но ощущается как взрослый GT.",
    description:
      "Электрические седаны с сильной динамикой, продвинутой электроникой и интерьером в логике connected product.",
    heroImage: carImages.xiaomiSu7Pro,
    strengths: ["электроплатформа", "быстрая зарядка", "цифровой салон", "динамика"],
    featuredModels: ["SU7", "SU7 Max"]
  },
  {
    slug: "zeekr",
    name: "Zeekr",
    eyebrow: "Электрический бизнес-класс",
    title: "Zeekr делает премиальную электромобильность спокойной, просторной и уверенной.",
    description:
      "Флагманские EV для семьи, офиса и дальних поездок: запас хода, тишина, богатое оснащение и сильный статус.",
    heroImage: carImages.zeekr001Main,
    strengths: ["запас хода", "простор", "премиальная тишина", "быстрая сделка"],
    featuredModels: ["001", "X", "009"]
  }
];

export const cars: Car[] = [
  {
    id: "kia-k5-gt-line",
    brandSlug: "kia",
    brand: "KIA",
    model: "K5",
    trim: "GT-Line",
    year: 2024,
    price: 3890000,
    mileage: 8200,
    transmission: "Автомат",
    fuelType: "Бензин",
    power: "194 л.с.",
    drivetrain: "Передний",
    engine: "2.5 GDI",
    color: "Graphite Gray",
    badge: "Бизнес-седан",
    image: carImages.kiaK5Front,
    gallery: [carImages.kiaK5Front, carImages.kiaK5Rear, carImages.kiaK5Interior],
    description:
      "K5 в аккуратной комплектации GT-Line: выразительный силуэт, спокойный салон и понятная экономика владения для ежедневных поездок.",
    specs: [
      { label: "Салон", value: "кожа, вентиляция" },
      { label: "Ассистенты", value: "адаптивный круиз" },
      { label: "История", value: "один владелец" }
    ]
  },
  {
    id: "kia-sportage-prestige",
    brandSlug: "kia",
    brand: "KIA",
    model: "Sportage",
    trim: "Prestige",
    year: 2024,
    price: 4490000,
    mileage: 6400,
    transmission: "Автомат",
    fuelType: "Бензин",
    power: "190 л.с.",
    drivetrain: "Полный",
    engine: "2.5 MPI",
    color: "Snow White Pearl",
    badge: "Семейный SUV",
    image: carImages.kiaSportageFront,
    gallery: [carImages.kiaSportageFront, carImages.kiaSportageFront, carImages.kiaSportageFront],
    description:
      "Sportage для семьи и города: высокая посадка, полный привод, чистая история и оснащение без лишней сложности.",
    specs: [
      { label: "Климат", value: "2 зоны" },
      { label: "Камеры", value: "360 градусов" },
      { label: "Гарантия", value: "12 месяцев" }
    ]
  },
  {
    id: "kia-ev6-long-range",
    brandSlug: "kia",
    brand: "KIA",
    model: "EV6",
    trim: "Long Range",
    year: 2023,
    price: 5890000,
    mileage: 11800,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "325 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "77.4 кВт·ч",
    range: "до 506 км",
    color: "Aurora Black",
    badge: "Электро GT",
    image: carImages.kiaEv6Main,
    gallery: [carImages.kiaEv6Main, carImages.kiaEv6Front, carImages.kiaEv6Side],
    description:
      "EV6 с большим запасом хода и быстрой зарядкой: автомобиль для тех, кто хочет электромобиль без компромисса по дизайну.",
    specs: [
      { label: "Зарядка", value: "800V архитектура" },
      { label: "Салон", value: "панорамные экраны" },
      { label: "Проверка", value: "SOH батареи подтверждён" }
    ]
  },
  {
    id: "hyundai-sonata-smartstream",
    brandSlug: "hyundai",
    brand: "Hyundai",
    model: "Sonata",
    trim: "Smartstream",
    year: 2024,
    price: 3690000,
    mileage: 7300,
    transmission: "Автомат",
    fuelType: "Бензин",
    power: "180 л.с.",
    drivetrain: "Передний",
    engine: "2.5 Smartstream",
    color: "Nocturne Gray",
    badge: "Бизнес-комфорт",
    image: carImages.hyundaiSonataFront,
    gallery: [carImages.hyundaiSonataFront, carImages.hyundaiSonataAlt, carImages.hyundaiSonataRear],
    description:
      "Sonata с сильной посадкой за рулём, мягкой подвеской и спокойным дизайном для тех, кто ценит ежедневный комфорт.",
    specs: [
      { label: "Мультимедиа", value: "широкий экран" },
      { label: "Безопасность", value: "SmartSense" },
      { label: "Документы", value: "готовы к сделке" }
    ]
  },
  {
    id: "hyundai-tucson-visioner",
    brandSlug: "hyundai",
    brand: "Hyundai",
    model: "Tucson",
    trim: "Visioner",
    year: 2023,
    price: 4190000,
    mileage: 15200,
    transmission: "Автомат",
    fuelType: "Бензин",
    power: "190 л.с.",
    drivetrain: "Полный",
    engine: "2.5 GDI",
    color: "Amazon Gray",
    badge: "Городской SUV",
    image: carImages.hyundaiTucsonFront,
    gallery: [carImages.hyundaiTucsonFront, carImages.hyundaiTucsonSide, carImages.hyundaiTucsonAlt],
    description:
      "Tucson в практичной конфигурации: полный привод, комфортные ассистенты и статусный тёмный экстерьер.",
    specs: [
      { label: "Привод", value: "HTRAC" },
      { label: "Салон", value: "комбинированный" },
      { label: "Сервис", value: "история подтверждена" }
    ]
  },
  {
    id: "hyundai-ioniq-5-lounge",
    brandSlug: "hyundai",
    brand: "Hyundai",
    model: "IONIQ 5",
    trim: "Lounge AWD",
    year: 2023,
    price: 6290000,
    mileage: 9400,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "305 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "72.6 кВт·ч",
    range: "до 481 км",
    color: "Digital Teal",
    badge: "EV lounge",
    image: carImages.hyundaiIoniqMain,
    gallery: [carImages.hyundaiIoniqMain, carImages.hyundaiIoniqFront, carImages.hyundaiIoniqAlt],
    description:
      "IONIQ 5 с lounge-атмосферой: тихий ход, просторный салон, быстрая зарядка и архитектура для дальних поездок.",
    specs: [
      { label: "Платформа", value: "E-GMP" },
      { label: "Зарядка", value: "до 350 кВт" },
      { label: "Комфорт", value: "релакс-сиденья" }
    ]
  },
  {
    id: "xiaomi-su7-pro",
    brandSlug: "xiaomi",
    brand: "Xiaomi Auto",
    model: "SU7",
    trim: "Pro",
    year: 2024,
    price: 6890000,
    mileage: 3900,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "299 л.с.",
    drivetrain: "Задний",
    engine: "электромотор Xiaomi HyperEngine",
    battery: "94.3 кВт·ч",
    range: "до 700 км",
    color: "Meteor Blue",
    badge: "Digital GT",
    image: carImages.xiaomiSu7Pro,
    gallery: [carImages.xiaomiSu7Pro, carImages.xiaomiSu7Front, carImages.xiaomiSu7Purple],
    description:
      "SU7 Pro выглядит как технологичный grand tourer: длинный силуэт, цифровой кокпит и большой запас хода для ежедневного драйва.",
    specs: [
      { label: "Экосистема", value: "HyperOS" },
      { label: "Аэродинамика", value: "Cd 0.195" },
      { label: "Зарядка", value: "быстрая DC" }
    ]
  },
  {
    id: "xiaomi-su7-max",
    brandSlug: "xiaomi",
    brand: "Xiaomi Auto",
    model: "SU7 Max",
    trim: "Max AWD",
    year: 2024,
    price: 7990000,
    mileage: 2100,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "673 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "101 кВт·ч",
    range: "до 800 км",
    color: "Founders Edition Gray",
    badge: "Флагман EV",
    image: carImages.xiaomiSu7Max,
    gallery: [carImages.xiaomiSu7Max, carImages.xiaomiSu7MaxFront, carImages.xiaomiSu7MaxRear],
    description:
      "SU7 Max - самый эмоциональный автомобиль в подборке: полный привод, мощная динамика и премиальный цифровой интерьер.",
    specs: [
      { label: "0-100 км/ч", value: "2,8 с" },
      { label: "Тормоза", value: "Brembo" },
      { label: "Проверка", value: "диагностика EV" }
    ]
  },
  {
    id: "zeekr-001-you",
    brandSlug: "zeekr",
    brand: "Zeekr",
    model: "001",
    trim: "YOU Edition",
    year: 2024,
    price: 7190000,
    mileage: 5400,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "544 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "100 кВт·ч",
    range: "до 656 км",
    color: "Phantom Black",
    badge: "Shooting brake",
    image: carImages.zeekr001Main,
    gallery: [carImages.zeekr001Main, carImages.zeekr001Alt, carImages.zeekr001Classic],
    description:
      "Zeekr 001 сочетает гран-туризмо, практичный багажник и тишину большого электромобиля бизнес-класса.",
    specs: [
      { label: "Подвеска", value: "пневмо" },
      { label: "Аудио", value: "Yamaha" },
      { label: "Салон", value: "Nappa" }
    ]
  },
  {
    id: "zeekr-x-privilege",
    brandSlug: "zeekr",
    brand: "Zeekr",
    model: "X",
    trim: "Privilege",
    year: 2024,
    price: 4590000,
    mileage: 4800,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "428 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "66 кВт·ч",
    range: "до 512 км",
    color: "Mist Gray",
    badge: "Urban EV",
    image: carImages.zeekrXMain,
    gallery: [carImages.zeekrXMain, carImages.zeekrXFront, carImages.zeekrXAlt],
    description:
      "Zeekr X - компактный электрический кроссовер с дорогим салоном, быстрым откликом и удобным городским размером.",
    specs: [
      { label: "Экран", value: "14.6 дюйма" },
      { label: "Крыша", value: "панорама" },
      { label: "Сценарий", value: "город и область" }
    ]
  },
  {
    id: "zeekr-009-me",
    brandSlug: "zeekr",
    brand: "Zeekr",
    model: "009",
    trim: "ME Edition",
    year: 2024,
    price: 9590000,
    mileage: 3200,
    transmission: "Редуктор",
    fuelType: "Электро",
    power: "544 л.с.",
    drivetrain: "Полный",
    engine: "двухмоторная EV-система",
    battery: "116 кВт·ч",
    range: "до 702 км",
    color: "Crystal White",
    badge: "Executive van",
    image: carImages.zeekr009Main,
    gallery: [carImages.zeekr009Main, carImages.zeekr009Front, carImages.zeekr009Alt],
    description:
      "Zeekr 009 - представительский EV-вэн для семьи и бизнеса: капитанские кресла, тишина и ощущение приватного лаунжа.",
    specs: [
      { label: "Салон", value: "6 мест, lounge" },
      { label: "Двери", value: "электропривод" },
      { label: "Комфорт", value: "массаж и вентиляция" }
    ]
  }
];

export const featuredCars = cars.filter((car) =>
  ["xiaomi-su7-max", "zeekr-001-you", "kia-ev6-long-range"].includes(car.id)
);

export function getCarById(id: string) {
  return cars.find((car) => car.id === id);
}

export function getBrandBySlug(slug: BrandSlug) {
  return brands.find((brand) => brand.slug === slug);
}

export function getCarsByBrand(slug: BrandSlug) {
  return cars.filter((car) => car.brandSlug === slug);
}
