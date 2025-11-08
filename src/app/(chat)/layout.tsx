import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chat";
import { getProfile } from "@/actions/profile";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ChatLayoutClient } from "./chat-layout-client";
import { ChatHeader } from "@/components/chat/chat-header";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await getProfile();
  const chats = (await getChats()) || [];

  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const isCollapsed = sidebarState?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <ChatLayoutClient chats={chats} profile={profile} />
      <SidebarInset className="flex flex-col h-screen max-h-screen overflow-hidden">
        <ChatHeader />
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
