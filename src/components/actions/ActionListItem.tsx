import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Action, UpdateActionInput } from "@/types/action";

type ActionListItemProps = {
  action: Action;
  onStart: (action: Action) => Promise<void>;
  onUpdate: (
    action: Action,
    fields: UpdateActionInput["updates"],
  ) => Promise<void>;
};

const ActionListItem = memo(
  ({ action, onStart, onUpdate }: ActionListItemProps) => (
    <li className="flex items-center gap-2 rounded-md p-2 hover:bg-slate-100/50">
      <Checkbox
        checked={action.status === "done"}
        disabled={action.status === "done"}
        onClick={() => onUpdate(action, { status: "done" })}
      />
      <div className="flex-1 text-sm" onClick={() => onStart(action)}>
        {action.text}
      </div>
      {action.duration_minutes && (
        <div className="text-xs">{action.duration_minutes}분</div>
      )}
    </li>
  ),
);

export default ActionListItem;
