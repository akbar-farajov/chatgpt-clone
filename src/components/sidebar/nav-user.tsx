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
} from "lucide-react";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FC } from "react";
import type { Profile } from "@/lib/types";
import { useTheme } from "next-themes";

interface NavUserProps {
  profile: Profile | null;
}

export const NavUser: FC<NavUserProps> = ({ profile }) => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

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
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {profile?.full_name || ""}
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
                    {profile?.full_name || ""}
                  </span>
                  <span className="truncate text-xs">
                    {profile?.email || ""}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
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
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
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
