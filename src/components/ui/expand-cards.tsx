"use client";

import React, { useState } from "react";

const images = [
  "https://pbs.twimg.com/media/G6dpB9JaAAA2wDS?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpEiebIAEHrOS?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpGJZbsAEg1tp?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpHzVbkAERJI3?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpKpcbgAAj7ce?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpNYzawAAniIt?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpPilbcAAH3jU?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpRFBbsAEvquO?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpUL-aUAAUqGZ?format=png&name=small",
];

export const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full flex justify-center py-24 bg-[#111] rounded-3xl overflow-hidden mt-12 mb-12">
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 ease-in-out w-full max-w-6xl">
        <div className="flex w-full items-center justify-center gap-1 flex-wrap md:flex-nowrap">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out"
              style={{
                width: getImageWidth(idx + 1),
                height: "24rem",
              }}
              onMouseEnter={() => setExpandedImage(idx + 1)}
            >
              <img
                className="w-full h-full object-cover"
                src={src}
                alt={`Image \${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
