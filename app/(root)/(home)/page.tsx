import { MeetingType } from "@/components/meetings-type";

const HomePage = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  return (
    <div className="h-screen p-10 rounded-md pt-28">
      <div className="text-white bg-slate-800 p-8 rounded-lg flex flex-col justify-between gap-5 h-60">
        <p className="p-3 bg-slate-600 w-fit rounded-lg font-semibold text-lg">
          Upcoming Meeting at: 12:30 PM
        </p>
        <div className="">
          <h1 className="font-bold text-5xl">{time}</h1>
          <p className="font-medium ">{date}</p>
        </div>
      </div>
      <div className=" pt-6">
      <MeetingType />
      </div>
    </div>
  );
};

export default HomePage;
