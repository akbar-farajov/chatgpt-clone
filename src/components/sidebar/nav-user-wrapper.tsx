"use client";

import { use, Suspense } from "react";
import { NavUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user-skeleton";
import type { Profile, Chat } from "@/lib/types";

interface NavUserWrapperProps {
  profilePromise: Promise<Profile | null>;
  chatsPromise: Promise<Chat[]>;
}

function NavUserContent({ profilePromise, chatsPromise }: NavUserWrapperProps) {
  const profile = use(profilePromise);
  const chats = use(chatsPromise);

  return <NavUser profile={profile} chats={chats} />;
}

export function NavUserWrapper({
  profilePromise,
  chatsPromise,
}: NavUserWrapperProps) {
  return (
    <Suspense fallback={<NavUserSkeleton />}>
      <NavUserContent
        profilePromise={profilePromise}
        chatsPromise={chatsPromise}
      />
    </Suspense>
  );
}
