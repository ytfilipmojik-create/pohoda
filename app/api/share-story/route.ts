import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const Schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  profession: z.string().max(200).optional().or(z.literal("")),
  story: z.string().min(20).max(8000),
  consentPublish: z.boolean(),
});

let _resend: Resend | null = null;
function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  _resend = new Resend(key);
  return _resend;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, profession, story, consentPublish } = parsed.data;

  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Filip <filip@pohodazdomova.cz>",
      to: "filip@pohodazdomova.cz",
      replyTo: email,
      subject: `[příběh] ${name}${profession ? ` · ${profession}` : ""}`,
      text: [
        `Jméno: ${name}`,
        `E-mail: ${email}`,
        profession ? `Profese: ${profession}` : null,
        `Souhlas s publikací: ${consentPublish ? "ANO" : "NE"}`,
        "",
        "---",
        "",
        story,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("share-story send failed:", e);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
