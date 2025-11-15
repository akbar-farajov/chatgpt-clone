import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { FC, ReactElement, ReactNode } from "react";

interface HeaderProps {
  title?: string;
  rightContent?: ReactNode | ReactElement;
}

export const Header: FC<HeaderProps> = ({ title = "Chat", rightContent }) => {
  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold hidden md:block">{title}</h1>
        </div>
        {rightContent ? (
          rightContent
        ) : (
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
        )}
      </div>
    </div>
  );
};
