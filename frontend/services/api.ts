import axios from "axios";
import type { AuditRequest, AuditResponse } from "@/types/audit";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const auditApi = {
  analyze: async (request: AuditRequest): Promise<AuditResponse> => {
    const response = await api.post<AuditResponse>("/audit", request);
    return response.data;
  },
};