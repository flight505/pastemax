/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-scripts" />

// Add missing TypeScript definitions
declare namespace React {
  interface MouseEvent<T = Element> extends globalThis.MouseEvent {}
  interface ChangeEvent<T = Element> extends Event {}
}

// Fix the type parameters that are unused
interface ImportMeta {
   
  readonly hot: {
    readonly data: any;
    accept(): void;
    accept(cb: (dependencies: any) => void): void;
    accept(path: string, cb: (dependencies: any) => void): void;
  };
}
