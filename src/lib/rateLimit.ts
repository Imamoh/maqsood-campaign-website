/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Note for maintainers: on Vercel's serverless runtime each instance has its
 * own memory, so this throttles abusive bursts against a warm instance rather
 * than providing a global guarantee. That is a deliberate trade-off to avoid
 * adding a database. If the campaign later sees sustained abuse, swap the
 * body of `checkRateLimit` for Upstash Redis — the call signature can stay.
 */

type Bucket = { hits: number[] };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 6;
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (bucket.hits.length >= MAX_PER_WINDOW) {
    const oldest = bucket.hits[0];
    buckets.set(key, bucket);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 500) {
    for (const [k, v] of buckets) {
      if (v.hits.every((t) => now - t >= WINDOW_MS)) buckets.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
