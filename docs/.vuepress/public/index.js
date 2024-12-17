export async function onRequest(context) {
  console.log(`[LOGGING]: Request came from ${context.request.url}`);

  return new Response("Hello, world!");
}