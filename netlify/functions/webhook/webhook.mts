import { Context } from '@netlify/functions';
import { supabase } from '../../../src/lib/supabase';

export default async (request: Request, context: Context) => {
    try {
        // Parse the request body if needed (assuming it's JSON)  

        // Upsert data into the "webhook" table  
        const { data, error } = await supabase
            .from('webhook')
            .upsert({
                a: "default_value", // Use a value from the request body or a default  
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