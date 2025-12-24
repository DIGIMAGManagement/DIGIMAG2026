// Monetization logic (inactive)
export function isPremiumFeatureEnabled() {
  return false; // Feature flag: always false for now
}

export function checkPremiumAccess(user: any) {
  // Placeholder for premium access check
  return false;
}

// Stripe integration placeholder
export function createStripeSession() {
  throw new Error("Monetization is currently disabled.");
}
