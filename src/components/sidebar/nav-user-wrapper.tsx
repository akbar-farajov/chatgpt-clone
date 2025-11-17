"use client";

import { use, Suspense } from "react";
import { NavUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user-skeleton";
import type { Profile } from "@/lib/types";
import { useChats } from "@/hooks/use-chats";

interface NavUserWrapperProps {
  profilePromise: Promise<Profile | null>;
}

function NavUserContent({ profilePromise }: NavUserWrapperProps) {
  const profile = use(profilePromise);
  const { chats } = useChats();

  return <NavUser profile={profile} chats={chats} />;
}

export function NavUserWrapper({ profilePromise }: NavUserWrapperProps) {
  return (
    <Suspense fallback={<NavUserSkeleton />}>
      <NavUserContent profilePromise={profilePromise} />
    </Suspense>
  );
}
