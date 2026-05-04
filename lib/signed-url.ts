import { supabaseAdmin } from "./supabase";

const EXPIRY_SECONDS = 60 * 60 * 24 * 7;

export async function getDownloadUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from("pdfs")
    .createSignedUrl(storagePath, EXPIRY_SECONDS);
  if (error || !data) throw new Error(`Failed to sign URL: ${error?.message}`);
  return data.signedUrl;
}
