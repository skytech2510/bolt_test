import { Context } from '@netlify/functions'
import Stripe from "stripe"
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
export default async (request: Request, context: Context) => {
    // if (request.method === "POST") {
    //     const { amount } = JSON.parse(request.body); // Parse the request body  

    //     try {
    //         // Create a payment intent  
    //         const paymentIntent = await stripe.paymentIntents.create({
    //             amount,
    //             currency: 'usd',
    //         });

    //         // Return the client secret  
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    //         };
    //     } catch (error) {
    //         // Handle errors  
    //         return {
    //             statusCode: 500,
    //             body: JSON.stringify({ error: error.message }),
    //         };
    //     }
    // }

    // Handle unsupported methods  
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
    };
}