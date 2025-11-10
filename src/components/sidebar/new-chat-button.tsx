"use client";
import { SquarePenIcon } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import Link from "next/link";

export const NewChatButton = () => {
  return (
    <SidebarMenuButton asChild>
      <Link href="/">
        <SquarePenIcon />
        <span>New Chat</span>
      </Link>
    </SidebarMenuButton>
  );
};
