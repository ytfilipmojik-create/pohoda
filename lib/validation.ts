import { z } from "zod";

const ProductSlugSchema = z.enum([
  "ai-ugc-reklamy",
  "ai-grafika",
  "ai-weby",
  "bundle",
  "bonus-prvni-klient",
]);

export const CheckoutInputSchema = z.object({
  products: z.array(ProductSlugSchema).min(1),
  email: z.string().email(),
  name: z.string().optional(),
  consentImmediateFulfillment: z.literal(true),
  consentTerms: z.literal(true),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;

export const CheckoutUpdateSchema = z.object({
  paymentIntentId: z.string().startsWith("pi_"),
  products: z.array(ProductSlugSchema).min(1),
});

export type CheckoutUpdate = z.infer<typeof CheckoutUpdateSchema>;

export const LeadInputSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;
