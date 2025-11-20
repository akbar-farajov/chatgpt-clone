import { Header, HeaderLeft } from "@/app/(dashboard)/components";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <>
      <Header leftContent={<HeaderLeft title="Chat" />} />
    </>
  );
}
