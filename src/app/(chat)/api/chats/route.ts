import { getChats } from "@/actions/chat";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chats = await getChats();
    return NextResponse.json(chats || []);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json([], { status: 500 });
  }
}
