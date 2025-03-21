export async function onRequestPost({ env, request }) {
  try {
    const data = await request.json();
    const envPrefix =
      process.env.CF_PAGES_BRANCH === "main" ? "prod" : "preview";
    const key = `${envPrefix}-doc-feedback-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    await env["doc-feedback"].put(key, JSON.stringify(data));
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
