import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 text-left text-sm leading-tight gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
