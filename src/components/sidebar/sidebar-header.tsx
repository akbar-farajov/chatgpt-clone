import Link from "next/link";
import Image from "next/image";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";

export const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="flex flex-row items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity group-data-[collapsible=icon]:hidden"
      >
        <Image src="/icons/logo.svg" alt="Logo" width={24} height={24} />
      </Link>
      <SidebarTrigger className="p-4" />
    </SidebarHeader>
  );
};
