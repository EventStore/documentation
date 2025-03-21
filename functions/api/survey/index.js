export async function onRequestPost({ env, request }) {
  try {
    const rawBody = await request.text();
    const data = JSON.parse(rawBody);
    const key = `DOC_FEEDBACK-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Execute both tasks concurrently
    await Promise.all([
      saveFeedback(key, data, env),
      sendSlackMessage(data, env),
    ]);

    return new Response(JSON.stringify({ success: true, key }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

// Helper function to save the feedback to KV
async function saveFeedback(key, data, env) {
  return env.DOC_FEEDBACK.put(key, JSON.stringify(data));
}

// Helper function to build and send a formatted Slack message
async function sendSlackMessage(data, env) {
  const lines = [];

  // Use the submittedAt field for the header.
  if (data.submittedAt && data.submittedAt.trim() !== "") {
    lines.push(`Documentation feedback received at ${data.submittedAt}`);
  } else {
    lines.push("Documentation feedback received at Unknown time");
  }

  // If thumbs or submittedAt are empty, add a spam warning.
  const thumbsEmpty =
    !data.thumbs ||
    (typeof data.thumbs === "string" && data.thumbs.trim() === "");
  const submittedAtEmpty =
    !data.submittedAt ||
    (typeof data.submittedAt === "string" && data.submittedAt.trim() === "");
  if (thumbsEmpty || submittedAtEmpty) {
    lines.push("⚠️POSSIBLE SPAM SUBMISSION⚠️");
  }

  // Append each non-empty property on a new line (skip submittedAt as it's already used)
  for (const [prop, value] of Object.entries(data)) {
    if (prop === "submittedAt") continue;
    if (typeof value === "string" && value.trim() === "") continue;
    lines.push(`${prop}: ${value}`);
  }

  const slackMessage = lines.join("\n");

  return fetch(env.SLACK_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: slackMessage }),
  });
}
