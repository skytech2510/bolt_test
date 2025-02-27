import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables  
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define the handler function  
const handler: Handler = async (request, context) => {
  if (request.method === "POST") {
    try {
      const { amount } = JSON.parse(request.body); // Parse the request body  

      // Create a payment intent  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      // Return the client secret  
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      // Handle errors  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    // Handle unsupported methods  
    return {
      statusCode: 405, // Method Not Allowed  
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
};

// Export the handler  
export { handler };  