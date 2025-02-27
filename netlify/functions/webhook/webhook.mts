import { Context } from '@netlify/functions'
import { supabase } from "../../../src/lib/supabase"
export default async (request: Request, context: Context) => {
    await supabase.from("webhook").upsert({
        data: { a: "sdfsdf" }
    })
    return new Response("Perfect")
}