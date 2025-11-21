import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { getUser } from "@/actions/auth";
import { DashboardLayoutClient } from "./components";
import { Provider } from "@ai-sdk-tools/store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  const profilePromise = getProfile().then((res) => res.data);

  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const isCollapsed = sidebarState?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <DashboardLayoutClient profilePromise={profilePromise} />
      <SidebarInset className="flex flex-col h-[100dvh] max-h-[100dvh]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
