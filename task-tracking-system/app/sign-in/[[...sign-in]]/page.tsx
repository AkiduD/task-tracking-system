import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f7f8] text-[#171717]">
      <SignIn />
    </main>
  );
}