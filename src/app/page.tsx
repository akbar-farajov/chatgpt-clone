import Chat from "@/components/chat";
import { getChats } from "@/actions/chat";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const chats = (await getChats()) || [];

  return (
    <Chat
      initialMessages={[]}
      chats={chats}
      user={{
        id: user.id,
        name: user.user_metadata.name,
        email: user.email || "",
        avatar: user.user_metadata.avatar_url,
      }}
    />
  );
}
