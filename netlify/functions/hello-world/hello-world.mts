import { Context } from '@netlify/functions'
import Stripe from "stripe"
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
export default (request: Request, context: Context) => {
  try {
    const url = new URL(request.url)
    const subject = url.searchParams.get('name') || 'World'

    return new Response(`Hello ${subject}`)
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
