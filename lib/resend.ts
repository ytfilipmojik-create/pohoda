import type { PaidOrder } from "./checkout-service";

export async function sendDownloadEmail(order: Pick<PaidOrder, "id" | "email">) {
  console.log("STUB: sendDownloadEmail", order);
}
