import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { FC, ReactElement, ReactNode } from "react";

interface HeaderProps {
  leftContent?: ReactNode | ReactElement;
  rightContent?: ReactNode | ReactElement;
}

export const Header: FC<HeaderProps> = ({ leftContent, rightContent }) => {
  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          {leftContent}
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

export const HeaderGitHubStar: FC = () => {
  return (
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
  );
};
