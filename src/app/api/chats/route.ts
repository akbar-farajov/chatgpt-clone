import { NextResponse } from "next/server";
import { getChats } from "@/actions/chat";

export async function GET() {
  try {
    const chats = await getChats();
    return NextResponse.json(chats || []);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
