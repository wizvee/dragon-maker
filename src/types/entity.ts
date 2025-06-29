export const ENTITY_TYPES = {
  PROJECT: "project",
  AREA: "area",
  RESOURCE: "resource",
} as const;

export type EntityType = (typeof ENTITY_TYPES)[keyof typeof ENTITY_TYPES];

export const ENTITY_LABELS: Record<EntityType, string> = {
  project: "계획",
  area: "영역",
  resource: "자료",
};

export type Entity = {
  id: string;
  title: string;
  stat: string;
  type: EntityType;
  content?: string;
  start_date: string;
  archived?: boolean;
  due_date?: string | null;
  completion_date?: string | null;
};
