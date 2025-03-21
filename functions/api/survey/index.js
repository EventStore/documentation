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

// Helper function to convert keys into a more readable format.
function humanizeKey(key) {
  const mappings = {
    freeText: "Free text",
    thumbs: "Positive/Negative",
    submittedAt: "Submitted at",
    userAgent: "User Agent",
    browserName: "Browser Name",
    platformType: "Platform Type",
    pageUrl: "Page URL",
  };
  if (mappings[key]) {
    return mappings[key];
  }
  // Convert camelCase to separate words and capitalize the first letter.
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

// Helper function to save the feedback to KV
async function saveFeedback(key, data, env) {
  return env.DOC_FEEDBACK.put(key, JSON.stringify(data));
}

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

  // Style the message
  for (const [prop, value] of Object.entries(data)) {
    if (prop === "submittedAt" || prop === "userAgent") continue;
    if (typeof value === "string" && value.trim() === "") continue;

    if (prop === "thumbs") {
      if (value === "up") {
        lines.push(`*${humanizeKey(prop)}:* Positive✅`);
      } else if (value === "down") {
        lines.push(`*${humanizeKey(prop)}:* Negative❌`);
      } else {
        lines.push(`*${humanizeKey(prop)}:* ${value}`);
      }
      continue;
    }

    lines.push(`*${humanizeKey(prop)}:* ${value}`);
  }

  const slackMessage = lines.join("\n");

  return fetch(env.SLACK_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: slackMessage }),
  });
}
