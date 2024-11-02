import { CallList } from "@/components/call-list";

const RecordingsPage = () => {
  return (
    <div className="text-white px-16 pt-28 pb-16">
      <h1 className="text-3xl font-bold pb-8">Recordings</h1>
      <CallList type="recordings" />
    </div>
  );
};

export default RecordingsPage;
