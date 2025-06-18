export type Stat = {
  stat: string;
  level: number;
  xp: number;
  min_xp: number;
  max_xp: number;
};

export type User = {
  name: string;
  level: number;
  stats: Stat[];
  focus_minutes: number;
};
