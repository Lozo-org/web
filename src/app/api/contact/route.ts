import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  contact?: string;
  serverType?: string;
  budget?: string;
  message?: string;
  locale?: string;
  // Honeypot: real users never fill this hidden field.
  company?: string;
};

const FALLBACK_TO = "ludofootball@icloud.com";
// Resend's shared onboarding sender works without verifying a domain.
const FALLBACK_FROM = "17Lud Studio <onboarding@resend.dev>";

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Silently accept honeypot hits so bots don't learn anything.
  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const contact = (data.contact ?? "").trim();
  const message = (data.message ?? "").trim();
  const serverType = (data.serverType ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const locale = data.locale === "en" ? "en" : "fr";

  if (!name || !contact || !message) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The form still works as a UI; it just falls back to email / Discord
    // until RESEND_API_KEY is set in the Vercel project.
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? FALLBACK_TO;
  const from = process.env.CONTACT_FROM_EMAIL ?? FALLBACK_FROM;

  const body = [
    `Nom / pseudo : ${name}`,
    `Contact : ${contact}`,
    serverType ? `Type de serveur : ${serverType}` : null,
    budget ? `Budget : ${budget}` : null,
    `Langue du site : ${locale}`,
    "",
    "Message :",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `Nouvelle demande de bot — ${name}`,
      text: body,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }
}
