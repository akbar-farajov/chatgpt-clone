import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export const Loader = ({ className, size = 16, ...props }: LoaderProps) => (
  <div
    className={cn(
      "inline-flex animate-spin items-center justify-center",
      className
    )}
    {...props}
  >
    <LoaderCircle className="size-6" />
  </div>
);
