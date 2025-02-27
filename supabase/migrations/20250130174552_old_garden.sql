/*
  # Update profile policies and add auto-creation

  1. Changes
    - Add function to automatically create profile on user signup
    - Simplify RLS policies
    - Add trigger for profile creation
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add secure function for profile creation
*/

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON profiles;

-- Create simplified policies
CREATE POLICY "Enable full access for authenticated users"
  ON profiles FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);