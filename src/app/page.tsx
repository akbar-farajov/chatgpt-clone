"use client";
import { Button } from "@/components/ui/button";
import { createChat } from "@/actions/chat";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
export default function Home() {
  const router = useRouter();
  const handleCreateChat = async () => {
    startTransition(async () => {
      const { data } = await createChat();
      router.push(`/chat/${data?.id}`);
      router.refresh();
    });
  };

  return <Button onClick={handleCreateChat}>Click me</Button>;
}
