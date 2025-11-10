"use client";
import { SquarePenIcon } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
export const NewChatButton = () => {
  const router = useRouter();

  return (
    <SidebarMenuButton asChild>
      <Link href="/" onClick={() => router.refresh()}>
        <SquarePenIcon />
        <span>New Chat</span>
      </Link>
    </SidebarMenuButton>
  );
};
