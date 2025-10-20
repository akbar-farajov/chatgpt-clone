"use client";
import { createChat } from "@/actions/chat";
import { Loader2Icon, SquarePenIcon } from "lucide-react";
import React, { useTransition } from "react";
import { SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";

export const NewChatButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleNewChat = async () => {
    startTransition(async () => {
      const { data } = await createChat();
      router.push(`/chat/${data?.id}`);
    });
  };
  return (
    <SidebarMenuButton onClick={handleNewChat}>
      {isPending ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <SquarePenIcon />
      )}
      <span>New Chat</span>
    </SidebarMenuButton>
  );
};
