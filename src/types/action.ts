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
  start_at?: string | null;
  end_at?: string | null;
};
