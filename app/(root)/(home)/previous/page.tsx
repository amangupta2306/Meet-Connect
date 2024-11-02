import { CallList } from "@/components/call-list";

const PreviousPage = () => {
  return (
    <div className="text-white px-16 pt-28 pb-16">
      <h1 className="text-3xl font-bold pb-8">Previous Meetings</h1>
      <CallList type="ended" />
    </div>
  );
};

export default PreviousPage;
