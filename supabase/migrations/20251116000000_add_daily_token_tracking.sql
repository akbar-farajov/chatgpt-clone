-- Add daily token tracking columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN daily_token_count INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN last_usage_date DATE;

-- Create index for better query performance on last_usage_date
CREATE INDEX IF NOT EXISTS idx_profiles_last_usage_date ON public.profiles(last_usage_date);

-- Add comments to document the columns
COMMENT ON COLUMN public.profiles.daily_token_count IS 'Count of tokens used by the user today';
COMMENT ON COLUMN public.profiles.last_usage_date IS 'Date of the last token usage by the user';

-- Function to initialize token tracking for new users
CREATE OR REPLACE FUNCTION public.initialize_user_token_tracking()
RETURNS TRIGGER AS $$
BEGIN
  -- Set daily_token_count to 0 if not already set
  IF NEW.daily_token_count IS NULL THEN
    NEW.daily_token_count := 0;
  END IF;
  
  -- Set last_usage_date to current date
  IF NEW.last_usage_date IS NULL THEN
    NEW.last_usage_date := CURRENT_DATE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to run the function before inserting a new profile
CREATE TRIGGER trigger_initialize_token_tracking
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_user_token_tracking();

-- Add comment to document the trigger
COMMENT ON TRIGGER trigger_initialize_token_tracking ON public.profiles IS 'Automatically initializes daily_token_count and last_usage_date when a new user profile is created';
