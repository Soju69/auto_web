import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aurum Motors | Премиальный автомобильный шоурум",
    template: "%s | Aurum Motors"
  },
  description:
    "Премиальный автомобильный шоурум с каталогом, trade-in, сервисом и персональным сопровождением сделки.",
  keywords: ["премиальные автомобили", "автосалон", "trade-in", "сервис", "тест-драйв"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className="font-sans">{children}</body>
    </html>
  );
}
