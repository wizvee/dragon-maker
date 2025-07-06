import { memo } from "react";
import type { Action } from "@/types/action";
import { Checkbox } from "@/components/ui/checkbox";

type ActionListItemProps = {
  action: Action;
  onStart: (action: Action) => Promise<void>;
};

const ActionListItem = memo(({ action, onStart }: ActionListItemProps) => (
  <li
    className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-100/50"
    onClick={() => onStart(action)}
  >
    <Checkbox />
    <div className="flex-1 text-sm">{action.text}</div>
    <div className="text-xs">{action.duration_minutes}분</div>
  </li>
));

export default ActionListItem;
