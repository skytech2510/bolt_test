import { Context } from '@netlify/functions'
import Stripe from "stripe"
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
export default (request: Request, context: Context) => {
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
}
