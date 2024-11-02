"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useGetCallById } from "@/usegetcallbyid";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-5 py-4">
      <h1 className="text-gray-400 font-semibold w-36 text-xl">{title}:</h1>
      <h1 className="truncate text-xl font-bold">{description}</h1>
    </div>
  );
};

const PreviousPage = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const router = useRouter();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;

  const { call } = useGetCallById(meetingId!);

  const client = useStreamVideoClient();
  const startMeeting = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}`);
    toast({
      title: "Meeting Created",
    });
  };

  return (
    <div className="text-white px-16 pt-28">
      <h1 className="text-3xl font-bold pb-8">Personal Room</h1>
      <div className="">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="space-x-4 pt-8">
        <Button className="bg-blue-600 text-md" onClick={startMeeting}>
          Start meeting
        </Button>
        <Button
          className="bg-blue-950 text-md"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </div>
  );
};

export default PreviousPage;
