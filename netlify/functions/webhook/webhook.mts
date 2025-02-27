import { Context } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with enhanced session handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default async (request: Request, context: Context) => {
    try {
        // Parse the request body if needed (assuming it's JSON)  

        // Upsert data into the "webhook" table  
        const { data, error } = await supabase
            .from('webhook')
            .upsert({
                data: { a: new Date() }, // Use a value from the request body or a default  
            });

        // Check for errors during the upsert operation  
        if (error) {
            console.error('Error upserting data:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        return new Response("Perfect", { status: 200 });
    } catch (err) {
        console.error('Error processing request:', err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};  