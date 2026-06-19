import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  hair: z.enum(["dry", "oily", "normal"]),
  occasion: z.enum(["daily", "party", "wedding"]),
  budget: z.enum(["low", "medium", "premium"]),
  notes: z.string().max(280).optional().default(""),
});

export type AdvisorResponse = {
  summary: string;
  recommendations: {
    title: string;
    description: string;
    estimatedPrice: string;
    icon: string;
  }[];
};

export const generateAdvice = createServerFn({ method: "POST" })
  .validator((data) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<AdvisorResponse> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("AI service is not configured. Please try again later.");
    }

    const system = `You are a friendly Mumbai-based beauty concierge for "SalonHub". 
Respond ONLY with valid minified JSON matching this TypeScript type:
{"summary": string, "recommendations": Array<{"title": string, "description": string, "estimatedPrice": string, "icon": string}>}
- Provide exactly 3 recommendations tailored to the user's hair type, occasion, budget and notes.
- "estimatedPrice" must be an INR range like "₹1,500 – ₹2,800".
- "icon" must be a single relevant emoji.
- "summary" is one warm sentence (<= 140 chars) addressed to the user.
- No markdown, no prose outside JSON.`;

    const user = `Hair type: ${data.hair}
Occasion: ${data.occasion}
Budget tier: ${data.budget}
Extra notes: ${data.notes || "(none)"}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (res.status === 429)
      throw new Error("Too many requests. Please wait a moment and try again.");
    if (res.status === 402)
      throw new Error("AI credits exhausted. Please add credits in Settings → Workspace → Usage.");
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`AI service error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = json.choices?.[0]?.message?.content?.trim() ?? "";
    const cleaned = raw
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/i, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned) as AdvisorResponse;
      if (!parsed?.recommendations?.length) throw new Error("empty");
      return parsed;
    } catch {
      throw new Error("The AI returned an unexpected response. Please try again.");
    }
  });
