/**
 * Intent Detection & Lead Capture
 * Detects user intent and builds WhatsApp messages for lead capture
 */

export interface LeadData {
  name: string;
  company?: string;
  services: string[];
  timeline: string;
  budget: string;
  contactMethod: 'whatsapp' | 'email';
  projectDescription?: string;
}

export interface IntentResult {
  hasBuyingIntent: boolean;
  needsLeadCapture: boolean;
  currentStep?: 'name' | 'company' | 'services' | 'timeline' | 'budget' | 'contact' | 'complete';
  leadData?: Partial<LeadData>;
}

const BUYING_INTENT_KEYWORDS = [
  'price', 'pricing', 'cost', 'quote', 'quotation', 'estimate',
  'hire', 'hiring', 'work with', 'collaborate', 'partner',
  'contact', 'reach out', 'call', 'whatsapp', 'email',
  'get started', 'start project', 'begin', 'interested',
  'budget', 'afford', 'pay', 'investment'
];

const SERVICE_KEYWORDS = [
  'ai marketing', 'branding', 'brand identity', 'logo', 'graphic design',
  'website', 'web development', 'app development', 'mobile app',
  'seo', 'social media', 'content', 'crm', 'chatbot', 'automation'
];

/**
 * Detects if user message contains buying intent
 */
export function detectBuyingIntent(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return BUYING_INTENT_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Detects which services user is interested in
 */
export function detectServices(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const detected: string[] = [];

  const serviceMap: Record<string, string> = {
    'ai marketing': 'AI Marketing & Automation',
    'automation': 'AI Marketing & Automation',
    'branding': 'Brand Strategy & Identity',
    'brand identity': 'Brand Strategy & Identity',
    'logo': 'Brand Strategy & Identity',
    'graphic design': 'Graphic Design & Content',
    'content': 'Graphic Design & Content',
    'social media': 'Social Media Management',
    'website': 'Website & App Development',
    'web development': 'Website & App Development',
    'app development': 'Website & App Development',
    'mobile app': 'Website & App Development',
    'crm': 'CRM & Custom Software',
    'software': 'CRM & Custom Software',
    'seo': 'SEO & Performance Marketing',
    'performance marketing': 'SEO & Performance Marketing',
    'chatbot': 'AI Chatbots & Voice Assistants',
    'voice assistant': 'AI Chatbots & Voice Assistants'
  };

  for (const [keyword, service] of Object.entries(serviceMap)) {
    if (lowerMessage.includes(keyword) && !detected.includes(service)) {
      detected.push(service);
    }
  }

  return detected;
}

/**
 * Determines next step in lead capture flow
 */
export function getIntentStep(
  message: string,
  currentLeadData?: Partial<LeadData>
): IntentResult {
  const hasIntent = detectBuyingIntent(message);

  if (!hasIntent) {
    return { hasBuyingIntent: false, needsLeadCapture: false };
  }

  const leadData = currentLeadData || {};
  let currentStep: IntentResult['currentStep'] = 'name';

  if (!leadData.name) {
    currentStep = 'name';
  } else if (!leadData.services || leadData.services.length === 0) {
    currentStep = 'services';
  } else if (!leadData.timeline) {
    currentStep = 'timeline';
  } else if (!leadData.budget) {
    currentStep = 'budget';
  } else if (!leadData.contactMethod) {
    currentStep = 'contact';
  } else {
    currentStep = 'complete';
  }

  // Auto-detect services if mentioned
  if (currentStep === 'services' && !leadData.services) {
    const detectedServices = detectServices(message);
    if (detectedServices.length > 0) {
      leadData.services = detectedServices;
      currentStep = 'timeline';
    }
  }

  return {
    hasBuyingIntent: true,
    needsLeadCapture: currentStep !== 'complete',
    currentStep,
    leadData
  };
}

/**
 * Builds WhatsApp message with quote summary
 */
export function buildWhatsAppMessage(leadData: LeadData): string {
  const parts: string[] = [];

  parts.push(`Hi! I'm ${leadData.name}${leadData.company ? ` from ${leadData.company}` : ''}.`);
  parts.push('');
  parts.push("I'm interested in getting a quote for:");
  parts.push('');

  if (leadData.services.length > 0) {
    parts.push('Services Needed:');
    leadData.services.forEach(service => parts.push(`• ${service}`));
    parts.push('');
  }

  if (leadData.timeline) {
    parts.push(`Timeline: ${leadData.timeline}`);
  }

  if (leadData.budget) {
    parts.push(`Budget Range: ${leadData.budget}`);
  }

  if (leadData.projectDescription) {
    parts.push('');
    parts.push('Project Brief:');
    parts.push(leadData.projectDescription);
  }

  parts.push('');
  parts.push(`Preferred Contact: ${leadData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}`);
  parts.push('');
  parts.push('Looking forward to discussing this project!');

  return parts.join('\n');
}

/**
 * Builds WhatsApp URL
 */
export function buildWhatsAppUrl(leadData: LeadData, phoneNumber: string = '919998739029'): string {
  const message = buildWhatsAppMessage(leadData);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Validates user input
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

/**
 * Checks for prompt injection attempts
 */
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

