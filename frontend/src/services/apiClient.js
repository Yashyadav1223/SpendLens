const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function postJson(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      body?.error?.message ||
      body?.message ||
      "Spendlens could not complete this request. Please try again.";

    throw new Error(message);
  }

  return body.data ?? body;
}

export function createAudit(payload) {
  return postJson("/api/audit", payload);
}

export function createReport(payload) {
  return postJson("/api/report", payload);
}

export function captureLead(payload) {
  return postJson("/api/leads", payload);
}
