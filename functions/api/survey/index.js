export async function onRequestPost({ env, request }) {
    console.log("Received POST request to /api/survey");
  
    try {
      // Read the raw request body for debugging
      const rawBody = await request.text();
      console.log("Raw request body:", rawBody);
  
      // Parse JSON from the raw body
      const data = JSON.parse(rawBody);
      console.log("Parsed JSON data:", data);
  
      // Generate a unique key
      const key = `DOC_FEEDBACK-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      console.log("Generated KV key:", key);
  
      // Attempt to store the data in KV
      await env.DOC_FEEDBACK.put(key, JSON.stringify(data));
      console.log("Data successfully stored in KV under key:", key);
  
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
  