"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Profile } from "@/lib/types";
import { FC } from "react";

interface DashboardLayoutClientProps {
  profilePromise: Promise<Profile | null>;
}

export const DashboardLayoutClient: FC<DashboardLayoutClientProps> = ({
  profilePromise,
}) => {
  return (
    <AppSidebar currentTitle={undefined} profilePromise={profilePromise} />
  );
};
