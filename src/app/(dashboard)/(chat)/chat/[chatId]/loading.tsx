import { Header } from "@/app/(dashboard)/components";
import { ChatBreadcrumb } from "../../components/chat-breadcrumb";

export default function ChatLoading() {
  return (
    <>
      <Header leftContent={<ChatBreadcrumb />} />
    </>
  );
}
