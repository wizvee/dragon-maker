import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { DotsThree, SpinnerGap } from "@phosphor-icons/react";

import { STAT_LABELS } from "@/types/user";
import { useStats } from "@/hooks/stats/useStats";
import { useCreateEntity } from "@/hooks/entities/useCreateEntity";
import { ENTITY_LABELS, type EntityType } from "@/types/entity";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export default function CreateDialog() {
  const user = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { data: stats } = useStats(user?.id || "");
  const [selectedStat, setSelectedStat] = useState<string>("health");
  const [entityType, setEntityType] = useState<EntityType | null>("project");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEntityType("project");
      setSelectedStat("health");
    }
  };

  const { mutate: createEntity, isPending } = useCreateEntity();
  const handleCreate = () => {
    if (!user || !entityType || !selectedStat) return;
    createEntity(
      {
        userId: user!.id,
        stat: selectedStat,
        entityType,
      },
      {
        onSuccess: (entity) => {
          handleOpenChange(false);
          navigate(`/${entityType}/${entity.id}`);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DotsThree size={16} />
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader className="hidden">
          <DialogTitle>생성하기</DialogTitle>
        </DialogHeader>
        <div className="font-bold">구분</div>
        <Select
          defaultValue="project"
          onValueChange={(value) => setEntityType(value as EntityType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="타입 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(ENTITY_LABELS).map(([type, label]) => (
                <SelectItem key={type} value={type}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="font-bold">상태</div>
        <RadioGroup
          defaultValue="health"
          className="flex gap-4"
          onValueChange={(value) => setSelectedStat(value)}
        >
          {stats?.map((stat) => (
            <div className="flex gap-1">
              <RadioGroupItem
                id={stat.stat}
                key={stat.stat}
                value={stat.stat}
              />
              <Label htmlFor={stat.stat}>{STAT_LABELS[stat.stat]}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button className="mt-4" onClick={handleCreate} disabled={isPending}>
          {isPending && <SpinnerGap className="animate-spin" />}
          생성하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
