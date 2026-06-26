export interface AuditResponse {
  url: string;
  score: Score;
  metrics: Metrics;
  insights: Insights;
  recommendations: Recommendation[];
  promptLogs?: PromptLogs;
}

export interface Score {
  overall: number;
  seo: number;
  content: number;
  accessibility: number;
  cta: number;
  images: number;
}

export interface Metrics {
  wordCount: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  ctaCount: number;
  internalLinks: number;
  externalLinks: number;
  imageCount: number;
  missingAltPercentage: number;
  metaTitle: string;
  metaDescription: string;
  language: string;
}

export interface Insights {
  seo: string;
  messaging: string;
  cta: string;
  contentDepth: string;
  ux: string;
}

export interface Recommendation {
  priority: Priority;
  title: string;
  reason: string;
}

export interface PromptLogs {
  systemPrompt: string;
  userPrompt: string;
  structuredInput: string;
  rawOutput: string;
}

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface AuditRequest {
  url: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}