const API = "https://connect.mailerlite.com/api";

export async function addLead(email: string, source = "lead-magnet"): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID_LEAD_MAGNET;
  if (!apiKey || !groupId) throw new Error("Mailerlite env vars missing");

  const res = await fetch(`${API}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      fields: { source },
    }),
  });

  if (!res.ok && res.status !== 200 && res.status !== 201) {
    const body = await res.text();
    throw new Error(`Mailerlite addLead failed: ${res.status} ${body}`);
  }
}
