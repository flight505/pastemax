/**
 * Creates a map of variant classes for a component.
 * Based on the concept of class-variance-authority but simplified.
 */
export function createVariants<T extends string>(
  baseClass: string,
  variantMap: Record<T, string>
): {
  base: string;
  variants: Record<T, string>;
  getVariantClass: (variant: T) => string;
} {
  return {
    base: baseClass,
    variants: variantMap,
    getVariantClass: (variant: T) => variantMap[variant] || ''
  };
} 