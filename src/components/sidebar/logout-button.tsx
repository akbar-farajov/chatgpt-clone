import React, { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { logout } from "@/actions/auth";
import { toast } from "sonner";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    });
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      {isPending ? <Loader2Icon /> : <LogOutIcon />}
      Log out
    </DropdownMenuItem>
  );
};
