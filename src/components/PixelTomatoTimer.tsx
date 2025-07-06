import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { X } from "@phosphor-icons/react";
import type { Action } from "@/types/action";

import { Button } from "./ui/button";

// 30픽셀 토마토 (3픽셀 꼭지, 27픽셀 몸통)
const PIXEL_MAP = [
  { x: 2, y: 0, type: "stem" },
  { x: 3, y: 0, type: "stem" },
  { x: 4, y: 0, type: "stem" },
  { x: 1, y: 1, type: "body" },
  { x: 2, y: 1, type: "body" },
  { x: 3, y: 1, type: "body" },
  { x: 4, y: 1, type: "body" },
  { x: 5, y: 1, type: "body" },
  { x: 0, y: 2, type: "body" },
  { x: 1, y: 2, type: "body" },
  { x: 2, y: 2, type: "body" },
  { x: 3, y: 2, type: "body" },
  { x: 4, y: 2, type: "body" },
  { x: 5, y: 2, type: "body" },
  { x: 6, y: 2, type: "body" },
  { x: 0, y: 3, type: "body" },
  { x: 1, y: 3, type: "body" },
  { x: 2, y: 3, type: "body" },
  { x: 3, y: 3, type: "body" },
  { x: 4, y: 3, type: "body" },
  { x: 5, y: 3, type: "body" },
  { x: 6, y: 3, type: "body" },
  { x: 1, y: 4, type: "body" },
  { x: 2, y: 4, type: "body" },
  { x: 3, y: 4, type: "body" },
  { x: 4, y: 4, type: "body" },
  { x: 5, y: 4, type: "body" },
  { x: 2, y: 5, type: "body" },
  { x: 3, y: 5, type: "body" },
  { x: 4, y: 5, type: "body" },
];

function PixelTomato({ coloredCount }: { coloredCount: number }) {
  return (
    <div
      className="mb-6 grid grid-cols-7 grid-rows-6 gap-3"
      style={{ width: 120, height: 112 }}
    >
      {PIXEL_MAP.map((pixel, i) => {
        let color = "bg-slate-200";
        if (pixel.type === "stem") color = "bg-chart-2";
        else if (i - 3 < coloredCount) color = "bg-chart-1";
        return (
          <div
            key={i}
            className={`rounded-[3px] border border-slate-400/50 transition-colors duration-300 ${color}`}
            style={{
              gridColumn: pixel.x + 1,
              gridRow: pixel.y + 1,
              width: 16,
              height: 16,
            }}
          />
        );
      })}
    </div>
  );
}

type TimerProps = {
  action: Action;
  onEnd: () => Promise<void>;
};

export default function PixelTomatoTimer({ action, onEnd }: TimerProps) {
  const navigate = useNavigate();
  const startAt = new Date(action.start_at + "Z").getTime();

  const [seconds, setSeconds] = useState(() =>
    Math.floor((Date.now() - startAt) / 1000),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startAt]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const coloredCount = Math.min(27, Math.floor(seconds / 60)); // 최대 27까지

  return (
    <div className="bg-background fixed inset-0 z-[1000] flex h-screen w-screen flex-col items-center justify-center">
      <div className="fixed top-0 right-0 p-4">
        <X size={24} onClick={() => navigate("/")} className="cursor-pointer" />
      </div>
      <div className="mb-10 text-2xl font-semibold">{action.text}</div>
      <PixelTomato coloredCount={coloredCount} />
      <div className="flex items-center gap-3 text-5xl leading-[1.1] font-semibold">
        <div className="leading-[1.1]">{mm}</div>
        <div className="">:</div>
        <div className="leading-[1.1]">{ss}</div>
      </div>
      <Button
        className="mt-15 cursor-pointer"
        size="lg"
        onClick={() => onEnd()}
      >
        STOP
      </Button>
    </div>
  );
}
