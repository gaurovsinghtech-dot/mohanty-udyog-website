// In-Memory Rate Limiter for API protection
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up expired entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      if (now > record.resetTime) {
        ipMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Checks if an IP address has exceeded the submission rate limit.
 * Default: 5 requests per 15 minutes per IP address.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const clientRecord = ipMap.get(ip);

  if (!clientRecord || now > clientRecord.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    ipMap.set(ip, newRecord);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (clientRecord.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: clientRecord.resetTime,
    };
  }

  clientRecord.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - clientRecord.count,
    resetTime: clientRecord.resetTime,
  };
}
