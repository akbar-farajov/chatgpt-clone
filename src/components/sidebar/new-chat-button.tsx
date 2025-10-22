"use client";
import { SquarePenIcon } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import Link from "next/link";

export const NewChatButton = () => {
  return (
    <Link href="/">
      <SidebarMenuButton>
        <SquarePenIcon />
        <span>New Chat</span>{" "}
      </SidebarMenuButton>{" "}
    </Link>
  );
};
