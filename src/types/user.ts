export type Stat = {
  stat: string;
  level: number;
  xp: number;
  min_xp: number;
  max_xp: number;
};

export const STAT_LABELS: Record<string, string> = {
  health: "건강",
  knowledge: "지식",
  sociability: "사회",
};

export type User = {
  name: string;
  level: number;
  focus_minutes: number;
};
