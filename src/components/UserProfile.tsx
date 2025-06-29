import type { User } from "@/types/user";
import { Lightning } from "@phosphor-icons/react";

export default function UserProfile({ data }: { data: User }) {
  console.log("UserProfile data:", data);

  return (
    <div>
      {/* MP Bar */}
      <div className="mb-4 rounded-xl border border-slate-300 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1 font-semibold">
            <Lightning size={20} weight="fill" className="text-chart-4" />
            MP
          </div>
          <div className="font-bold">80 / 100</div>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="bg-chart-4 h-full rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
      </div>

      {/* <div className="mb-4 rounded-xl border border-[#22304a] bg-white p-5">
        <h2 className="mb-3 text-lg font-bold text-[#22304a]">TODAY’S TASKS</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Read for 15 minutes</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Meditate</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-5 w-5 rounded-full border-2 border-[#22304a]"></span>
            <span>Go to the gym</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#22304a]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C7 2 2 7 2 12c0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  fill="#22304a"
                />
              </svg>
            </span>
            <span>Eat a healthy breakfast</span>
          </li>
        </ul>
      </div> */}

      {/* Stats */}
      <div className="mb-6 rounded-xl border border-slate-300 bg-slate-100/50 p-4">
        <h3 className="mb-3 font-bold">STATS</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span></span>
            <span className="w-24">Strength</span>
            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-slate-200">
                <div
                  className="bg-chart-1 h-full rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span></span>
            <span className="w-24">Dexterity</span>
            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-slate-200">
                <div
                  className="bg-chart-2 h-full rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span></span>
            <span className="w-24">Intelligence</span>
            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-slate-200">
                <div
                  className="bg-chart-3 h-full rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
