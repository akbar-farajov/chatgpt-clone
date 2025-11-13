-- Remove usage column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS usage;

-- Create usage table
CREATE TABLE IF NOT EXISTS public.usage (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    chat_id TEXT REFERENCES public.chats(id) ON DELETE CASCADE,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    reasoning_tokens INTEGER DEFAULT 0,
    cached_input_tokens INTEGER DEFAULT 0,
    total_tokens INTEGER GENERATED ALWAYS AS (
        input_tokens + output_tokens + COALESCE(reasoning_tokens, 0)
    ) STORED,
    model_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON public.usage(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_chat_id ON public.usage(chat_id);
CREATE INDEX IF NOT EXISTS idx_usage_created_at ON public.usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_user_created ON public.usage(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for usage table
-- Users can view their own usage
CREATE POLICY "Users can view their own usage"
    ON public.usage
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own usage records
CREATE POLICY "Users can create their own usage"
    ON public.usage
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own usage records
CREATE POLICY "Users can update their own usage"
    ON public.usage
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own usage records
CREATE POLICY "Users can delete their own usage"
    ON public.usage
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_usage_updated_at
    BEFORE UPDATE ON public.usage
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment to document the table
COMMENT ON TABLE public.usage IS 'Stores LanguageModelUsage data per user and chat session';
COMMENT ON COLUMN public.usage.input_tokens IS 'Number of input tokens used';
COMMENT ON COLUMN public.usage.output_tokens IS 'Number of output tokens generated';
COMMENT ON COLUMN public.usage.reasoning_tokens IS 'Number of reasoning tokens used (for models with reasoning capabilities)';
COMMENT ON COLUMN public.usage.cached_input_tokens IS 'Number of cached input tokens used';
COMMENT ON COLUMN public.usage.total_tokens IS 'Total tokens (computed column)';
COMMENT ON COLUMN public.usage.model_id IS 'ID of the model used for this usage record';

