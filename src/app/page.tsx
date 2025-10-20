"use client";
import { Button } from "@/components/ui/button";
import { createChat } from "@/actions/chat";
import { redirect } from "next/navigation";

export default function Home() {
  const handleCreateChat = async () => {
    const { data } = await createChat();
    redirect(`/chat/${data?.id}`);
  };
  return <Button onClick={handleCreateChat}>Click me</Button>;
}
