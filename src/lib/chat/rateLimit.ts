/**
 * Simple in-memory rate limiter
 * For production, use Redis or a proper rate limiting service
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT = {
  maxRequests: 20,
  windowMs: 10 * 60 * 1000, // 10 minutes
};

/**
 * Gets client identifier (IP address or session ID)
 */
function getClientId(request: Request): string {
  // In production, extract real IP from headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

/**
 * Checks if request should be rate limited
 */
export function checkRateLimit(request: Request): { allowed: boolean; remaining?: number; resetAt?: number } {
  const clientId = getClientId(request);
  const now = Date.now();
  
  let entry = rateLimitStore.get(clientId);
  
  // Clean up expired entries
  if (entry && entry.resetTime < now) {
    rateLimitStore.delete(clientId);
    entry = undefined;
  }
  
  if (!entry) {
    // First request or expired window
    entry = {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    };
    rateLimitStore.set(clientId, entry);
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetAt: entry.resetTime,
    };
  }
  
  if (entry.count >= RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetTime,
    };
  }
  
  entry.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - entry.count,
    resetAt: entry.resetTime,
  };
}

/**
 * Cleans up expired entries (call periodically)
 */
export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [clientId, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(clientId);
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}

