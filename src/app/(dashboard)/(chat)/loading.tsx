import { Header } from "../components";
import { ChatBreadcrumb } from "./components/chat-breadcrumb";

function HomeLoading() {
  return (
    <>
      <Header leftContent={<ChatBreadcrumb />} />
    </>
  );
}

export default HomeLoading;
