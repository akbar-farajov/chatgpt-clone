import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavChatsSkeleton() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <Skeleton className="h-4 w-16" />
      </SidebarGroupLabel>
      {[...Array(5)].map((_, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton>
            <Skeleton className="h-4 w-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarGroup>
  );
}
