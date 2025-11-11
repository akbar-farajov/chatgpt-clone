import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StarIcon } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold hidden md:block">Chat</h1>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://github.com/akbar-farajov/chatgpt-clone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StarIcon className="size-4 text-yellow-400 fill-yellow-400" />
            Star on GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
};
