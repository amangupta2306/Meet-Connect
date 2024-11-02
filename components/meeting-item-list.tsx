// "use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MeetingItemListProps {
  label: string;
  description: string;
  className: string;
  handleClick: () => void;
  icon:LucideIcon
}

export const MeetingItemList = ({
  label,
  className,
  description,
  handleClick,
  icon:Icon,
}: MeetingItemListProps) => {
  return (
    <div
      className={cn(
        `bg-{orange}-600 rounded-lg text-white flex flex-col gap-6 p-5 h-60 justify-between`,
        className
      )}
      onClick={handleClick}
    >
      <div className="w-fit rounded-lg bg-transparent/10 p-2">
        <Icon className="h-7 w-7 opacity-100"/>
      </div>
      <div>
        <h1 className="font-bold text-2xl">{label}</h1>
      <p className="font-medium text-md">{description}</p>
      </div>
    </div>
  );
};
