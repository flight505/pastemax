/**
 * Merges class names conditionally
 * @param classes - Array of class names or objects with class names as keys and booleans as values
 * @returns Merged class names string
 */
export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  return classes
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'string') return item;
      if (typeof item === 'object' && item !== null) {
        return Object.entries(item)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
} 