"use client";

import React, { useState, useEffect } from "react";

export default function HomeThreeAd() {
  const firstRow = [
    {
      src: "/StoreBanner/kredmart-1 (3).png",
      alt: "Ad banner 1",
      width: 300,
      height: 250,
    },
    {
      src: "/StoreBanner/kredmart-1 (2).png",
      alt: "Ad banner 2",
      width: 300,
      height: 250,
    },
    {
      src: "/StoreBanner/kredmart-1 (1).png",
      alt: "Ad banner 3",
      width: 450,
      height: 250,
    },
  ];
  const secondRow = [
    {
      src: "/StoreBanner/kredmart-img (2).png",
      alt: "Ad banner 4",
      width: 450,
      height: 280,
    },
    {
      src: "/StoreBanner/kredmart-img (1).png",
      alt: "Ad banner 5",
      width: 300,
      height: 280,
    },
    {
      src: "/StoreBanner/kredmart-img (3).png",
      alt: "Ad banner 6",
      width: 300,
      height: 280,
    },
  ];
  const [firstIdx, setFirstIdx] = useState(0);
  const [secondIdx, setSecondIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set isMobile on mount and on resize
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      {/* Desktop: show both rows of ads */}
      <div className="md:flex flex-col gap-6 justify-center hidden mt-4">
        <div className="flex flex-row gap-6 justify-center">
          {firstRow.map((ad) => (
            <div
              key={ad.alt}
              className="group rounded-2xl shadow-lg overflow-hidden flex items-center justify-center"
              style={{ width: ad.width, height: ad.height }}
            >
              <img
                src={ad.src}
                alt={ad.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                  willChange: "transform",
                }}
                className="group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-6 justify-center mt-2">
          {secondRow.map((ad) => (
            <div
              key={ad.alt}
              className="group rounded-2xl shadow-lg overflow-hidden flex items-center justify-center"
              style={{ width: ad.width, height: ad.height }}
            >
              <img
                src={ad.src}
                alt={ad.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                  willChange: "transform",
                }}
                className="group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile: show one ad per row with nav */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() =>
                setFirstIdx((firstIdx + firstRow.length - 1) % firstRow.length)
              }
              className="p-2"
              aria-label="Previous ad"
            >
              &#8592;
            </button>
            <div
              className="group rounded-2xl shadow-lg overflow-hidden flex items-center justify-center mx-2"
              style={{ width: "100vw", maxWidth: 400, height: 220 }}
            >
              <img
                src={firstRow[firstIdx].src}
                alt={firstRow[firstIdx].alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                  willChange: "transform",
                }}
                className="group-hover:scale-110"
              />
            </div>
            <button
              onClick={() => setFirstIdx((firstIdx + 1) % firstRow.length)}
              className="p-2"
              aria-label="Next ad"
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() =>
                setSecondIdx(
                  (secondIdx + secondRow.length - 1) % secondRow.length
                )
              }
              className="p-2"
              aria-label="Previous ad"
            >
              &#8592;
            </button>
            <div
              className="group rounded-2xl shadow-lg overflow-hidden flex items-center justify-center mx-2"
              style={{ width: "100vw", maxWidth: 400, height: 220 }}
            >
              <img
                src={secondRow[secondIdx].src}
                alt={secondRow[secondIdx].alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                  willChange: "transform",
                }}
                className="group-hover:scale-110"
              />
            </div>
            <button
              onClick={() => setSecondIdx((secondIdx + 1) % secondRow.length)}
              className="p-2"
              aria-label="Next ad"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
