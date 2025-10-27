import Chat from "@/components/chat";
import { getChats } from "@/actions/chat";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const { data: profile, error } = await getProfile();

  const chats = (await getChats()) || [];

  if (error) {
    redirect("/login");
  }

  return <Chat initialMessages={[]} chats={chats} profile={profile} />;
}
