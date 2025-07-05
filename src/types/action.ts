export type Action = {
  id: string;
  text: string;
  status: "pending" | "done" | "canceled";
  due_date?: string | null;
  due_time?: string | null;
  start_at?: string | null;
  end_at?: string | null;
};
