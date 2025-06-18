import type { User } from "@/types/user";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// TODO: refactoring 필요
const progressMeta: Record<
  string,
  {
    label: string;
    order: number;
    getPercent: (user: User, stat?: User["stats"][number]) => number;
  }
> = {
  mp: {
    label: "집중",
    order: 0,
    getPercent: (user) =>
      user.focus_minutes && user.focus_minutes > 0 ? 100 : 0, // 예시: 100%로 고정, 필요시 계산식 변경
  },
  health: {
    label: "건강",
    order: 1,
    getPercent: (_, stat) =>
      stat && stat.max_xp ? ((stat.xp - stat.min_xp) / stat.max_xp) * 100 : 0,
  },
  knowledge: {
    label: "지식",
    order: 2,
    getPercent: (_, stat) =>
      stat && stat.max_xp ? ((stat.xp - stat.min_xp) / stat.max_xp) * 100 : 0,
  },
  sociability: {
    label: "사회성",
    order: 3,
    getPercent: (_, stat) =>
      stat && stat.max_xp ? ((stat.xp - stat.min_xp) / stat.max_xp) * 100 : 0,
  },
  // 필요한 stat 추가
};

// bars 생성 함수
function getProgressBars(user: User) {
  const statBars = user.stats
    .map((stat) => {
      const meta = progressMeta[stat.stat];
      if (!meta) return null; // 정의되지 않은 stat은 무시
      return {
        key: stat.stat,
        label: meta.label,
        order: meta.order,
        percent: meta.getPercent(user, stat),
      };
    })
    .filter((bar) => bar !== null); // null 값 제거

  // mp bar 추가
  const mpMeta = progressMeta["mp"];
  const mpBar = {
    key: "mp",
    label: mpMeta.label,
    order: mpMeta.order,
    percent: mpMeta.getPercent(user),
  };

  // 합치고 정렬
  return [mpBar, ...statBars].sort((a, b) => a.order - b.order);
}

export default function UserProfile({ data }: { data: User }) {
  const bars = getProgressBars(data);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 md:flex-row md:items-start">
      {/* 이미지 영역 */}
      <Card className="bg-muted h-40 w-full flex-shrink-0 md:h-32 md:w-40">
        <CardContent className="flex h-full items-center justify-center">
          <span className="text-muted-foreground">이미지</span>
        </CardContent>
      </Card>
      {/* 정보 영역 */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="mb-2 text-lg font-bold">
          LV.{String(data.level).padStart(2, "0")} {data.name}
        </div>
        {bars.map((bar) => (
          <div key={bar.key} className="mb-2 flex items-center gap-2 last:mb-0">
            <div className="w-16 text-sm font-medium">{bar.label}</div>
            <Progress value={bar.percent} className="h-5 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
