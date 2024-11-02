import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-950 text-white">
      <Loader2 size={50} />
    </div>
  );
};
