"use client";

import { useGetCalls } from "@/hooks/usegetcalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { MeetingCard } from "./meeting-card";
import { useRouter } from "next/navigation";
import { Loader } from "./loader";
import { toast } from "@/hooks/use-toast";

export const CallList = ({
  type,
}: {
  type: "ended" | "upcoming" | "recordings";
}) => {
  const router = useRouter();
  const { endedCalls, isLoading, callRecordings, upcomingCalls } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      };
      if (type === "recordings") fetchRecordings();
    } catch {
      toast({ title: "Try again later" });
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallMessage();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            title={
              (meeting as Call).state?.custom?.description || "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            upcoming={type === "ended"}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};
