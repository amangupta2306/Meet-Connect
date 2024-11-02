import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter } from "next/navigation";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export const MeetingRoom = () => {
  const router = useRouter()
  
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"left"} />;
    }
  };

  return (
    <section className="relative h-screen w-full bg-slate-900 text-white flex items-center justify-center px-3">
      <div className=" p-10 w-full">
      <CallLayout />
      </div>
      <div
        className={cn(
          "h-[calc(100vh-86px)] bg-slate-950 w-[400px] p-5 rounded-xl" ,
          showParticipants ? "block" : "hidden"
        )}
      >
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
      </div>
      <div className="fixed bottom-0 flex items-center justify-center w-full gap-5">
        <CallControls onLeave={()=>router.push("/")}/>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-950 text-white border-slate-600">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-900" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-full p-2 bg-slate-800 opacity-75">
          <Users size={18} className="" />
          </div>
        </button>
      </div>
    </section>
  );
};
