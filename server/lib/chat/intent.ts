/**
 * Intent Detection (Server-side copy)
 */

export function validateInput(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (message.length > 2000) {
    return { valid: false, error: 'Message is too long (max 2000 characters)' };
  }
  
  return { valid: true };
}

export function detectPromptInjection(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const injectionPatterns = [
    'ignore previous',
    'forget all',
    'you are now',
    'act as',
    'pretend to be',
    'system prompt',
    'override',
    'new instructions',
    'disregard',
    'you must',
    'your new role',
    'your new identity'
  ];
  
  return injectionPatterns.some(pattern => lowerMessage.includes(pattern));
}

