import type { Context } from "@netlify/functions";
import Stripe from "stripe"
const stripe = new Stripe("sk_secret_51QdMxUR9Rtpk9GJNGsI0SBUIW5kPsMExKKlwCdTusAJ5Xr1hzfS9XPCMgmPSXTw4KXk4EF8cRLrQ8qHbWRkiF6ih00PvmkcAmN");
export default async (req: Request, context: Context) => {
  console.log(req.body);
  if (req.method === "POST") {
    const amount = 1000; // Parse the request body  

    try {
      // Create a payment intent  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      // Return the client secret  
      return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })
    } catch (error) {
      // Handle errors  
      return new Response(JSON.stringify({ error: "sk_secret_51QdMxUR9Rtpk9GJNGsI0SBUIW5kPsMExKKlwCdTusAJ5Xr1hzfS9XPCMgmPSXTw4KXk4EF8cRLrQ8qHbWRkiF6ih00PvmkcAmN" }), { status: 500 })
    }
  }

  return new Response("Hello, world!")
}