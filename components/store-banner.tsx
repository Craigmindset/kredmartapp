"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const sliderImages = [
  {
    src: "/StoreBanner/8502320_192.jpg",
    alt: "Natural Cosmetics Banner",
    text: "Berries Natural Cosmetics - Refreshing and Moisturizing",
  },
  {
    src: "/StoreBanner/2149670637.jpg",
    alt: "Store Banner 2",
    text: "Discover our latest skincare collection",
  },
  {
    src: "/StoreBanner/2151074307.jpg",
    alt: "Store Banner 3",
    text: "Shop premium beauty products today",
  },
];

export default function StoreBanner() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );

  return (
    <div className="flex w-full max-w-7xl mx-auto my-0 py-0 gap-4 px-0 justify-center bg-[#efefef]">
      {/* Main Banner Column */}
      <div className="w-full md:w-[100%] bg-[#050f1f] rounded-lg relative overflow-hidden flex flex-col justify-center items-center min-h-[340px]">
        <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
          <Image
            src={sliderImages[current].src}
            alt={sliderImages[current].alt}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center drop-shadow-lg">
              {sliderImages[current].text}
            </h2>
            <button
              className="bg-[#466cf4] hover:bg-[#2746a3] text-white text-sm font-semibold px-5 py-2 rounded-full shadow transition-all duration-200"
              style={{ minWidth: 120 }}
            >
              Shop Now
            </button>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            &#8592;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
