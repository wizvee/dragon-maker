import { memo } from "react";
import type { Action } from "@/types/action";
import ActionListItem from "./ActionListItem";

type ActionListProps = {
  actions: Action[];
  onStart: (actionId: string) => Promise<void>;
};

const ActionList = memo(({ actions, onStart }: ActionListProps) => (
  <ul className="space-y-2">
    {actions?.map((action) => (
      <ActionListItem key={action.id} action={action} onStart={onStart} />
    ))}
  </ul>
));

export default ActionList;
