import type { Context } from "@netlify/functions";
import Stripe from "stripe"
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
export default async (req: Request, context: Context) => {
  console.log(req.body);
  if (req.method === "POST") {

    try {
      // Create a payment intent  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
      });

      // Return the client secret  
      return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })
    } catch (error) {
      // Handle errors  
      return new Response(JSON.stringify({ error: process.env.VITE_STRIPE_SECRET_KEY }), { status: 500 })
    }
  }

  return new Response("Hello, world!")
}