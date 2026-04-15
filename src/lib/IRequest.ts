export interface IRequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}
