import React, { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { logout } from "@/actions/auth";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
    });
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      {isPending ? <Loader2Icon /> : <LogOutIcon />}
      Log out
    </DropdownMenuItem>
  );
};
