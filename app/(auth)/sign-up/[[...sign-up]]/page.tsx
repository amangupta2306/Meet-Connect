import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-slate-900">
      <SignUp />
    </main>
  );
}
