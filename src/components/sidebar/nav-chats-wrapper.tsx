"use client";

import { use, Suspense } from "react";
import useSWR from "swr";
import { NavChats } from "./nav-chats";
import { NavChatsSkeleton } from "./nav-chats-skeleton";
import type { Chat } from "@/lib/types";

interface NavChatsWrapperProps {
  chatsPromise: Promise<Chat[]>;
  currentChatId?: string;
  currentTitle?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function NavChatsContent({
  chatsPromise,
  currentChatId,
  currentTitle,
}: NavChatsWrapperProps) {
  const initialChats = use(chatsPromise);

  const { data: chats = initialChats } = useSWR<Chat[]>("/api/chats", fetcher, {
    fallbackData: initialChats,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
