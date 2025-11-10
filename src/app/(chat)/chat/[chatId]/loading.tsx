import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Loading = () => {
  return (
    <div className="max-h-screen h-screen flex flex-col w-full">
      <div className="flex flex-col h-full">
        <SidebarTrigger className="m-2 md:hidden" />

        <div className="flex-1 w-full overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <div className="flex justify-end w-full">
              <div className="max-w-[80%] space-y-2">
                <Skeleton className="h-4 w-20 ml-auto" />
                <div className="bg-primary/10 rounded-2xl rounded-tr-sm p-4 space-y-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            <div className="flex justify-start w-full">
              <div className="max-w-full space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>

            <div className="flex justify-end w-full">
              <div className="max-w-[80%] space-y-2">
                <Skeleton className="h-4 w-20 ml-auto" />
                <div className="bg-primary/10 rounded-2xl rounded-tr-sm p-4 space-y-2">
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
            </div>

            <div className="flex justify-start w-full">
              <div className="max-w-full space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full max-w-3xl mx-auto p-2 mb-16 md:mb-20 shadow-xs bg-background rounded-lg">
          <div className="flex justify-between items-end h-28 bg-muted  rounded-sm p-4 space-y-2">
            <Skeleton className="size-8 bg-primary/10" />
            <Skeleton className="size-10 rounded-full bg-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
