import { Context } from '@netlify/functions'
import Stripe from "stripe"
const stripe = new Stripe("sk_secret_51QdMxUR9Rtpk9GJNGsI0SBUIW5kPsMExKKlwCdTusAJ5Xr1hzfS9XPCMgmPSXTw4KXk4EF8cRLrQ8qHbWRkiF6ih00PvmkcAmN");
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
