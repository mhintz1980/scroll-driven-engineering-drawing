"use client";

import { useEffect, useRef } from "react";

type TubesCursorProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  initialColors?: string[];   
  lightColors?: string[];     
  lightIntensity?: number;    
  titleSize?: string;         
  subtitleSize?: string;
  captionSize?: string;
  enableRandomizeOnClick?: boolean;
  className?: string;         
};

export const TubesCursor = ({
  title = "Tubes",
  subtitle = "Interactive",
  caption = "WebGPU / WebGL Boxed Demo",
  initialColors = ["#f967fb", "#53bc28", "#6958d5"],
  lightColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
  lightIntensity = 200,
  titleSize = "text-[60px] md:text-[80px]",
  subtitleSize = "text-[40px] md:text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    (async () => {
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = (mod as any).default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick && containerRef.current) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        // bind to container instead of global body so only clicks in the area randomize
        containerRef.current.addEventListener("click", handler);
        removeClick = () =>
          containerRef.current?.removeEventListener("click", handler);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center h-[500px] w-full overflow-hidden rounded-3xl cursor-pointer \${className}`}>
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />

      {/* Hero text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 select-none pointer-events-none">
        <h1
          className={`m-0 p-0 text-white font-bold uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] \${titleSize}`}
        >
          {title}
        </h1>
        <h2
          className={`m-0 p-0 text-white font-medium uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] \${subtitleSize}`}
        >
          {subtitle}
        </h2>
        <p
          className={`m-0 p-0 text-white leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] \${captionSize}`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}
