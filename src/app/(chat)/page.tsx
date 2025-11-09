import Chat from "@/components/chat";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={null}>
      <Chat initialMessages={[]} />
    </Suspense>
  );
}
