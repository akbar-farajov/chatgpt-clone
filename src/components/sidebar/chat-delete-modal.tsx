import { FC, useTransition } from "react";
import { deleteChat } from "@/actions/chat";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface ChatDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatId: string;
  currentChatId?: string;
}

export const ChatDeleteModal: FC<ChatDeleteModalProps> = ({
  open,
  onOpenChange,
  chatId,
  currentChatId,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleDeleteChat = async () => {
    startTransition(async () => {
      try {
        await deleteChat(chatId);
        if (chatId === currentChatId) {
          router.push("/");
        }
        mutate("/api/chats");
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this chat?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteChat}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
