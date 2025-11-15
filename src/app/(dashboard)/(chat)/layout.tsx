import React from "react";
import { ChatHeader } from "./components/chat-header";

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChatHeader />
      {children}
    </>
  );
}

export default ChatLayout;
