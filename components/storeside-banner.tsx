"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const sideBannerImages = [
  {
    src: "/StoreBanner/fairmoney-ad.jpg",
    alt: "FairMoney Ad Banner",
  },
  {
    src: "/StoreBanner/creditcredit-ad.jpg",
    alt: "CreditDirect Side Banner",
  },
  {
    src: "/StoreBanner/creditcredit-ad.jpg",
    alt: "CreditDirect Ad Banner",
  },
];

export default function StoreSideBanner() {
  const [sideCurrent, setSideCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSideCurrent((prev) => (prev + 1) % sideBannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSideSlide = () =>
    setSideCurrent((prev) => (prev + 1) % sideBannerImages.length);
  const prevSideSlide = () =>
    setSideCurrent(
      (prev) => (prev - 1 + sideBannerImages.length) % sideBannerImages.length
    );

  return (
    <div className="w-full md:w-[100%] bg-[#466cf4] rounded-lg flex flex-col justify-center items-center text-white p-0 relative overflow-hidden min-h-[340px]">
      <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
        <Image
          src={sideBannerImages[sideCurrent].src}
          alt={sideBannerImages[sideCurrent].alt}
          fill
          className="object-cover w-full h-full rounded-lg"
          sizes="(max-width: 868px) 100vw, 20vw"
        />
        <div className="absolute inset-x-0 bottom-6 flex items-end justify-center">
          <button
            className="bg-[#2b0822] hover:bg-[#2746a3] text-white text-sm font-semibold px-5 py-2 shadow transition-all duration-200"
            style={{ minWidth: 100 }}
          >
            Get loan
          </button>
        </div>
      </div>
    </div>
  );
}
