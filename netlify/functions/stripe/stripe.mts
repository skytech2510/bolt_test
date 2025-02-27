import type { Context } from "@netlify/functions";
import Stripe from "stripe"
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
export default async (req: Request, context: Context) => {
  if (req.method === "POST") {
    const body = await req.text(); // Get the raw body as text  
    const { amount } = JSON.parse(body); // Parse the JSON body  
    try {
      // Create a payment intent  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });

      // Return the client secret  
      return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })
    } catch (error) {
      // Handle errors  
      return new Response(JSON.stringify({ error: amount }), { status: 500 })
    }
  }

  return new Response("Hello, world!")
}