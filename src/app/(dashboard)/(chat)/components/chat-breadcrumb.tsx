"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { FC, useState } from "react";
import { Chat } from "@/lib/types";
import { useChat } from "@ai-sdk-tools/store";

interface ChatBreadcrumbProps {
  chatTitle?: string;
}

export const ChatBreadcrumb: FC<ChatBreadcrumbProps> = ({ chatTitle }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {chatTitle ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Chat</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chatTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Chat</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
