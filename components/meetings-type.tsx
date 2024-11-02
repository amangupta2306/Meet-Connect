"use client";

import { Calendar, Plus, UserRoundPlus, Video } from "lucide-react";
import { MeetingItemList } from "./meeting-item-list";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MeetingModal } from "./meetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Loader } from "./loader";
import { Input } from "./ui/input";

export const MeetingType = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const user = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please Select a date and time" });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting Created!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  {
    console.log(callDetails, "aman");
  }
  {
    console.log(values, "alok");
  }
  return (
    <section className="grid md:grid-cols-4 gap-4">
      <MeetingItemList
        label="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-600"
        handleClick={() => setMeetingState("isInstantMeeting")}
        icon={Plus}
      />
      <MeetingItemList
        label="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-600"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        icon={Calendar}
      />
      <MeetingItemList
        label="Join Meeting"
        description="Via invitation link"
        className="bg-blue-600"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        icon={UserRoundPlus}
      />
      <MeetingItemList
        label="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-600"
        handleClick={() => router.push("/recordings")}
        icon={Video}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2">
            <label className="">Add a description</label>
            <Textarea
              className="bg-slate-900 focus-visible:ring-0 w-full focus-visible:ring-offset-0 border-none"
              onChange={(e) =>
                setValues({
                  ...values,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Select Date & Time</label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) =>
                setValues({
                  ...values,
                  dateTime: date!,
                })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
              className="w-full bg-slate-900 rounded-md p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          buttonText="Copy invitation"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        handleClick={createMeeting}
        // icon={BadgeCheck}
        buttonText="Start Meeting"
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        handleClick={() => {
          router.push(values.link);
        }}
        // icon={BadgeCheck}
        buttonText="Join Meeting"
      >
        <Input
        className="border-none bg-slate-900 h-10"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};
