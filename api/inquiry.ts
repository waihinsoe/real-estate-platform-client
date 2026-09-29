import { apiClient } from "@/api/axios-instance";
import type { CreateInquiryInput } from "@/types/inquiry";

export async function createInquiry(input: CreateInquiryInput): Promise<void> {
  await apiClient.post("/inquiries", input);
}
