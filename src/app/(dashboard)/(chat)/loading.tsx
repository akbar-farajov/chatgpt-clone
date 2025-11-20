import { Header, HeaderLeft } from "../components";
import { Skeleton } from "@/components/ui/skeleton";

function HomeLoading() {
  return (
    <>
      <Header leftContent={<HeaderLeft title="Chat" />} />
    </>
  );
}

export default HomeLoading;
