"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  BadgeCheck,
  ChevronsUpDown,
  Sparkles,
  CreditCard,
  Bell,
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  ChartLine,
  MessageSquare,
} from "lucide-react";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FC } from "react";
import type { Profile, Chat } from "@/lib/types";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavUserProps {
  profile: Profile | null;
  chats: Chat[];
}

// Generate a consistent color based on email
const getColorFromEmail = (email: string): string => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  // Simple hash function to get consistent color for same email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const NavUser: FC<NavUserProps> = ({ profile, chats }) => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const totalChats = chats.length;
  const emailInitial = profile?.email?.charAt(0).toUpperCase() || "U";
  const avatarColor = profile?.email
    ? getColorFromEmail(profile.email)
    : "bg-gray-500";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={profile?.avatar_url || ""}
                  alt={profile?.full_name || ""}
                />
                <AvatarFallback
                  className={`rounded-lg ${avatarColor} text-white font-semibold`}
                >
                  {emailInitial}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {profile?.full_name || "User"}
                </span>
                <span className="truncate text-xs">{profile?.email || ""}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {profile?.full_name || "User"}
                  </span>
                  <span className="truncate text-xs">
                    {profile?.email || ""}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <MessageSquare />
                <span className="flex-1">Total Chats</span>
                <span className="text-muted-foreground">{totalChats}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <Link href="/usage">
                <DropdownMenuItem>
                  <ChartLine />
                  Usage{" "}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Palette />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = theme === option.value;
                    return (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="flex-1">{option.label}</span>
                        {isActive && <Check className="h-4 w-4" />}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
