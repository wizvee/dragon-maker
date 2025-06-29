interface ProgressBarProps {
  value: number; // 0~100
  colorClass?: string; // 예: "bg-chart-4"
  heightClass?: string; // 예: "h-4"
  roundedClass?: string; // 예: "rounded-full"
  borderClass?: string; // 예: "border border-slate-400"
}

export default function ProgressBar({
  value,
  colorClass = "bg-chart-4",
  heightClass = "h-4",
}: ProgressBarProps) {
  return (
    <div
      className={`w-full overflow-hidden bg-slate-200 ${heightClass} rounded-full`}
    >
      <div
        className={`${colorClass} ${heightClass} rounded-full border border-slate-400 transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
