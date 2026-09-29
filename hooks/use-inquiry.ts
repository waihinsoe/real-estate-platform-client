"use client";

import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "@/api/inquiry";

export function useInquiry() {
  return useMutation({ mutationFn: createInquiry, retry: false });
}
