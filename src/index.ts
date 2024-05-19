/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    };

    const response = await fetch('https://devapi.qweather.com/v7/weather/3d?location=120.15,30.31&key=' + env.qweatherkey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`dlskdhsjgasa: ${JSON.stringify(response)}`)

    // Retrieve the data from the response
    const data = await response.json();

    // Use the data to modify or manipulate your content as needed
    const res = Response.json(data, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
    // const res = new Response(Response.json(data) as any, {
    //   headers: {
    //       ...corsHeaders,
    //       'Content-Type': 'application/json' 
    //   }
    // });
    return res;
  },
};
