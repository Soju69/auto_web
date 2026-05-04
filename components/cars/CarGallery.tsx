"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function CarGallery({
  title,
  badge,
  images
}: {
  title: string;
  badge: string;
  images: string[];
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/45 backdrop-blur-2xl md:p-5">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(200,169,106,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]"
          aria-hidden="true"
        />
        <div className="relative grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
          <button
            type="button"
            onClick={() => setActiveImage(images[0])}
            className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-black/30 text-left"
          >
            <img src={images[0]} alt={`${title}, главное фото`} className="h-full min-h-[380px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-luxury-champagne backdrop-blur-xl">
                {badge}
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.065em] md:text-7xl">
                {title}
              </h1>
            </div>
          </button>
          <div className="grid gap-3">
            {images.slice(1, 3).map((image, index) => (
              <button key={image} type="button" onClick={() => setActiveImage(image)} className="overflow-hidden rounded-[1.5rem]">
                <img src={image} alt={`${title}, фото ${index + 2}`} className="h-[188px] w-full object-cover transition duration-300 hover:scale-[1.03] lg:h-full" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/82 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Закрыть фото"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white/70 transition hover:border-luxury-champagne/45 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img src={activeImage} alt={`${title}, увеличенное фото`} className="max-h-[86vh] max-w-[92vw] rounded-[1.5rem] object-contain shadow-2xl shadow-black" />
        </div>
      ) : null}
    </>
  );
}
