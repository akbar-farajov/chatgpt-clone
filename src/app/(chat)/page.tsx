import Chat from "@/components/chat";
import { getChats } from "@/actions/chat";
import { getProfile } from "@/actions/profile";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Home() {
  const { data: profile, error } = await getProfile();

  if (error) {
    return null;
  }

  const chats = (await getChats()) || [];

  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const isCollapsed = sidebarState?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar
        chats={chats}
        currentChatId={undefined}
        currentTitle={undefined}
        profile={profile}
      />
      <SidebarInset>
        <Chat initialMessages={[]} profile={profile} />
      </SidebarInset>
    </SidebarProvider>
  );
}
