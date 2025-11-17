import useSWR from "swr";
import type { Chat } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getChatHistoryKey = () => "/api/chats";

export function useChats() {
  const { data, error, isLoading, mutate } = useSWR<Chat[]>(
    getChatHistoryKey(),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    chats: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
