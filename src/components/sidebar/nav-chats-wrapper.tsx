"use client";

import { use, Suspense } from "react";
import { NavChats } from "./nav-chats";
import { NavChatsSkeleton } from "./nav-chats-skeleton";
import type { Chat } from "@/lib/types";

interface NavChatsWrapperProps {
  chatsPromise: Promise<Chat[]>;
  currentChatId?: string;
  currentTitle?: string;
}

function NavChatsContent({
  chatsPromise,
  currentChatId,
  currentTitle,
}: NavChatsWrapperProps) {
  const chats = use(chatsPromise);

  return (
    <NavChats
      chats={chats}
      currentChatId={currentChatId}
      currentTitle={currentTitle}
    />
  );
}

export function NavChatsWrapper({
  chatsPromise,
  currentChatId,
  currentTitle,
}: NavChatsWrapperProps) {
  return (
    <Suspense fallback={<NavChatsSkeleton />}>
      <NavChatsContent
        chatsPromise={chatsPromise}
        currentChatId={currentChatId}
        currentTitle={currentTitle}
      />
    </Suspense>
  );
}
