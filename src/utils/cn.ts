/**
 * Combines multiple class names into a single string.
 * Used for conditionally applying class names to elements.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
} 