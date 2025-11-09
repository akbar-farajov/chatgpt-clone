import Chat from "@/app/(chat)/components";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={null}>
      <Chat initialMessages={[]} />
    </Suspense>
  );
}
