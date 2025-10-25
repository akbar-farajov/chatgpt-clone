"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "@/lib/supabase/types";

export type Profile = Tables<"profiles">;

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message, data: null };
  }
}

export async function updateProfile(updates: {
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message, data: null };
  }
}

export async function createProfile(profile: {
  email: string;
  full_name?: string;
  avatar_url?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message, data: null };
  }
}
