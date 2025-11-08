import React, { FC } from 'react';
import { getChats } from "@/actions/chat";
import { getProfile } from "@/actions/profile";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const layout: FC<{ children: React.ReactNode, params: Promise<{ chatId: string }> }> = async ({ children, params }) => {
  const { chatId } = await params;
  
  const { data: profile } = await getProfile();
  const chats = (await getChats()) || [];

  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const isCollapsed = sidebarState?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar
        chats={chats}
        currentChatId={chatId}
        currentTitle={undefined}
        profile={profile}
      />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;