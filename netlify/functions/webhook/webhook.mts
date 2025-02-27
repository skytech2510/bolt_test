import { Context } from '@netlify/functions'

export default (request: Request, context: Context) => {
    return new Response("Perfect")
}