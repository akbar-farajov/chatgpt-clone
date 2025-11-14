import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chat";
import { getProfile } from "@/actions/profile";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ChatLayoutClient } from "./chat-layout-client";

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

  // Create promises but don't await them - pass to client components
  const profilePromise = getProfile().then((res) => res.data);
  const chatsPromise = getChats().then((chats) => chats || []);

  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const isCollapsed = sidebarState?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <ChatLayoutClient
        chatsPromise={chatsPromise}
        profilePromise={profilePromise}
      />
      <SidebarInset className="flex flex-col h-[100dvh] max-h-[100dvh]">
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
