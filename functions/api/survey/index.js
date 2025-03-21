export async function onRequestPost({ env, request }) {
    try {
      const rawBody = await request.text();
      const data = JSON.parse(rawBody);
      const key = `DOC_FEEDBACK-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      await env.DOC_FEEDBACK.put(key, JSON.stringify(data));
      return new Response(
        JSON.stringify({ success: true, key }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.error("Error in /api/survey:", err);
      return new Response(
        JSON.stringify({ success: false, error: err.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  