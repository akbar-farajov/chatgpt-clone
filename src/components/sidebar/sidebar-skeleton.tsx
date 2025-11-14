import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarHeader } from "./sidebar-header";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Skeleton className="h-4 w-24" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

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
      </SidebarContent>
      <SidebarFooter>
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
