export async function api<T = any>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    json?: unknown;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    body: options.json ? JSON.stringify(options.json) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json() as Promise<T>;
}
