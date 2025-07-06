export type Action = {
  id: string;
  stat: string;
  text: string;
  user_id: string;
  entity_id: string;
  status: "pending" | "done" | "canceled";
  duration_minutes: string | null;
  due_date?: string | null;
  due_time?: string | null;
  start_at: string | null;
  end_at: string | null;
};

export type UpdateActionInput = {
  stat: string;
  userId: string;
  entityId: string;
  actionId: string;
  updates: Partial<{
    status: "pending" | "done" | "canceled";
    text: string;
    due_date: string; // 'YYYY-MM-DD'
    due_time: string; // 'HH:MM:SS'
    start_at: string; // ISO 형식
    end_at: string | null;
  }>;
};
