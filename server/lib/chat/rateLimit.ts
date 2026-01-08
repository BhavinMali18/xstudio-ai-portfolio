/**
 * Rate Limiting (Server-side)
 */

import type { Request } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT = {
  maxRequests: 20,
  windowMs: 10 * 60 * 1000, // 10 minutes
};

function getClientId(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return ip || (typeof realIp === 'string' ? realIp : '') || req.ip || 'unknown';
}

export function checkRateLimit(req: express.Request): { allowed: boolean; remaining?: number; resetAt?: number } {
  const clientId = getClientId(req);
  const now = Date.now();
  
  let entry = rateLimitStore.get(clientId);
  
  if (entry && entry.resetTime < now) {
    rateLimitStore.delete(clientId);
    entry = undefined;
  }
  
  if (!entry) {
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

export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [clientId, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(clientId);
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}

