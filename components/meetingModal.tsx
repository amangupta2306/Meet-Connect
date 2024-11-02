import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface MeetingModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  buttonText?: string;
  handleClick: () => void;
  icon?:LucideIcon
}

export const MeetingModal = ({
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  handleClick,
  
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex items-center w-full justify-center bg-slate-700 border-none text-white">
        <div className="w-full space-y-3">
          <h1 className="text-2xl font-semibold text-center">{title}

          </h1>
          {/* {Icon && ( */}
            {/* <Icon className="bg-sky-600" size={20} /> */}
          {/* )} */}
          {children}
          <Button className="bg-blue-600 hover:bg-blue-800 w-full text-xl p-4 focus-visible:ring-transparent focus-visible:ring-offset-0"
          onClick={handleClick}
          >{buttonText|| "Schedule Meeting"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
