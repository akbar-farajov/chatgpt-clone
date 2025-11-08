import Chat from "@/components/chat";
import { getProfile } from "@/actions/profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data: profile, error } = await getProfile();

  if (error) {
    redirect("/login");
  }

  return <Chat initialMessages={[]} profile={profile} />;
}
