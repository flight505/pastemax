/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-scripts" />

// Add missing TypeScript definitions
declare namespace React {
  interface MouseEvent<T extends Element> extends globalThis.MouseEvent {
    currentTarget: T;
  }
  interface ChangeEvent<T extends Element> extends Event {
    target: T;
  }
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

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}
