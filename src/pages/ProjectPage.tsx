import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarBlank, RocketLaunch } from "@phosphor-icons/react";

import { useEntity } from "@/hooks/useEntity";
import { useUpdateEntity } from "@/hooks/useUpdateEntity";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: entity, isLoading, error } = useEntity(id);

  const { mutateAsync: updateEntity } = useUpdateEntity();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleTitleBlur = async () => {
    setIsEditing(false);
    if (entity && title !== entity.title && id) {
      await updateEntity({
        id,
        fields: { title },
      });
    }
  };

  const handleDueDateChange = async (date: Date | undefined) => {
    setDueDate(date ?? null);
    if (entity && id) {
      await updateEntity({
        id,
        fields: { due_date: date ? date.toISOString() : null },
      });
    }
  };

  useEffect(() => {
    if (entity) setTitle(entity.title);
  }, [entity]);

  if (!id) return "not found";
  if (isLoading) return <div>Loading...</div>;
  if (!entity) return <div>Entity not found.</div>;
  if (error) return <div>Failed to load entity.</div>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="mb-2 text-4xl">
        <RocketLaunch weight="duotone" />
      </div>
      {isEditing ? (
        <input
          className="m-0 mb-4 bg-transparent text-4xl font-bold focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <h2
          className="m-0 mb-4 cursor-pointer text-4xl font-bold"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
      )}
      <div className="mb-6 flex items-center gap-8 text-sm">
        <div className="flex flex-col gap-1">
          <div className="text-foreground/80 flex items-center gap-1 font-semibold">
            <CalendarBlank weight="duotone" />
            <span>마감일</span>
          </div>
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"w-[180px] justify-start text-left font-normal"}
                >
                  {dueDate ? (
                    format(dueDate, "yyyy년 M월 d일")
                  ) : (
                    <span className="text-gray-400">날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate ?? undefined}
                  onSelect={handleDueDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <div>
              {dueDate ? (
                format(dueDate, "yyyy년 M월 d일")
              ) : (
                <span className="text-gray-400">날짜 없음</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
