"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Tables, TablesInsert } from "@/lib/supabase/types";
import type { LanguageModelUsage } from "ai";
import { getUser } from "./auth";

export type Usage = Tables<"usage">;
export type UsageInsert = TablesInsert<"usage">;

export async function createUsage(params: {
  chatId?: string;
  usage: LanguageModelUsage;
  modelId?: string;
}) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("usage")
      .insert({
        user_id: user.id,
        chat_id: params.chatId,
        input_tokens: params.usage.inputTokens ?? 0,
        output_tokens: params.usage.outputTokens ?? 0,
        reasoning_tokens: params.usage.reasoningTokens ?? 0,
        cached_input_tokens: params.usage.cachedInputTokens ?? 0,
        model_id: params.modelId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error creating usage:", error);
    return { error: (error as Error).message, data: null };
  }
}

export async function getUserUsage(options?: {
  limit?: number;
  offset?: number;
  chatId?: string;
}) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    let query = supabase
      .from("usage")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (options?.chatId) {
      query = query.eq("chat_id", options.chatId);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit ?? 10) - 1
      );
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching usage:", error);
    return { error: (error as Error).message, data: null };
  }
}

export async function getUserUsageStats() {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("usage")
      .select("input_tokens, output_tokens, reasoning_tokens, total_tokens")
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    const stats = data.reduce(
      (acc, record) => ({
        totalInputTokens: acc.totalInputTokens + record.input_tokens,
        totalOutputTokens: acc.totalOutputTokens + record.output_tokens,
        totalReasoningTokens:
          acc.totalReasoningTokens + record.reasoning_tokens,
        totalTokens: acc.totalTokens + record.total_tokens,
      }),
      {
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalReasoningTokens: 0,
        totalTokens: 0,
      }
    );

    return { data: stats, error: null };
  } catch (error) {
    console.error("Error fetching usage stats:", error);
    return { error: (error as Error).message, data: null };
  }
}

export async function getChatUsage(chatId: string) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("usage")
      .select("*")
      .eq("user_id", user.id)
      .eq("chat_id", chatId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching chat usage:", error);
    return { error: (error as Error).message, data: null };
  }
}

export async function getChatUsageStats(chatId: string) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data, error } = await supabase
      .from("usage")
      .select(
        "input_tokens, output_tokens, reasoning_tokens, cached_input_tokens, total_tokens"
      )
      .eq("user_id", user.id)
      .eq("chat_id", chatId);

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return {
        data: {
          inputTokens: 0,
          outputTokens: 0,
          reasoningTokens: 0,
          cachedInputTokens: 0,
          totalTokens: 0,
        },
        error: null,
      };
    }

    const stats = data.reduce(
      (acc, record) => ({
        inputTokens: acc.inputTokens + record.input_tokens,
        outputTokens: acc.outputTokens + record.output_tokens,
        reasoningTokens: acc.reasoningTokens + record.reasoning_tokens,
        cachedInputTokens:
          acc.cachedInputTokens + (record.cached_input_tokens ?? 0),
        totalTokens: acc.totalTokens + record.total_tokens,
      }),
      {
        inputTokens: 0,
        outputTokens: 0,
        reasoningTokens: 0,
        cachedInputTokens: 0,
        totalTokens: 0,
      }
    );

    return { data: stats, error: null };
  } catch (error) {
    console.error("Error fetching chat usage stats:", error);
    return { error: (error as Error).message, data: null };
  }
}

export async function deleteUsage(usageId: string) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { error } = await supabase
      .from("usage")
      .delete()
      .eq("id", usageId)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    return { data: true, error: null };
  } catch (error) {
    console.error("Error deleting usage:", error);
    return { error: (error as Error).message, data: null };
  }
}

const DAILY_TOKEN_LIMIT = 1000;

export async function checkDailyUsageLimit() {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("daily_token_count, last_usage_date")
      .eq("id", user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!profile) {
      throw new Error("Profile not found");
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const lastUsageDate = profile.last_usage_date;

    const dailyTokenCount =
      lastUsageDate !== currentDate ? 0 : profile.daily_token_count;

    const isLimitExceeded = dailyTokenCount >= DAILY_TOKEN_LIMIT;

    return {
      data: {
        dailyTokenCount,
        dailyTokenLimit: DAILY_TOKEN_LIMIT,
        isLimitExceeded,
        remainingTokens: Math.max(0, DAILY_TOKEN_LIMIT - dailyTokenCount),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error checking daily usage limit:", error);
    return { error: (error as Error).message, data: null };
  }
}


export async function updateDailyTokenCount(tokenCount: number) {
  const supabase = await createClient();
  const { data: user } = await getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("daily_token_count, last_usage_date")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (!profile) {
      throw new Error("Profile not found");
    }

    const lastUsageDate = profile.last_usage_date;

    const newDailyTokenCount =
      lastUsageDate !== currentDate
        ? tokenCount
        : profile.daily_token_count + tokenCount;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        daily_token_count: newDailyTokenCount,
        last_usage_date: currentDate,
      })
      .eq("id", user.id)
      .select("daily_token_count, last_usage_date")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: {
        dailyTokenCount: data.daily_token_count,
        lastUsageDate: data.last_usage_date,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error updating daily token count:", error);
    return { error: (error as Error).message, data: null };
  }
}
