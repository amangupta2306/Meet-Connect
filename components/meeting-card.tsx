import { Calendar, Copy, Users } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  upcoming?: boolean;
  handleClick: () => void;
  link:string
  buttonText:string
}

export const MeetingCard = ({
  title,
  date,
  upcoming,
  handleClick,
  link,
  buttonText
}: MeetingCardProps) => {

  return (
    <section className="bg-slate-900 px-6 py-8 rounded-xl space-y-5">
      <div>
        <Calendar size={25} />
      </div>
      <div className="text-2xl font-bold truncate">{title}</div>
      <div className="text-xl font-thin">{date}</div>
      <div className="flex items-center justify-between">
        <Users />
        {!upcoming && (
          <div className="flex items-center gap-3">
            <Button className="bg-blue-600" onClick={handleClick}>{buttonText}</Button>
            <Button className="bg-blue-950"
            onClick={()=>{
                navigator.clipboard.writeText(link)
                toast({title:"Link Copied"})
            }}
            >
              <Copy />
              Copy Link
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
