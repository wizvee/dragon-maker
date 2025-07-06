import { memo } from "react";
import type { Action, UpdateActionInput } from "@/types/action";

import ActionListItem from "./ActionListItem";

type ActionListProps = {
  actions: Action[];
  onStart: (action: Action) => Promise<void>;
  onUpdate: (
    action: Action,
    fields: UpdateActionInput["updates"],
  ) => Promise<void>;
};

const ActionList = memo(({ actions, onStart, onUpdate }: ActionListProps) => (
  <ul className="space-y-2">
    {actions?.map((action) => (
      <ActionListItem
        key={action.id}
        action={action}
        onStart={onStart}
        onUpdate={onUpdate}
      />
    ))}
  </ul>
));

export default ActionList;
