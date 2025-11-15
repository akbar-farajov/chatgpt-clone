import React from "react";
import { Header } from "@/app/(dashboard)/components";

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title="Chat" />
      {children}
    </>
  );
}

export default ChatLayout;
