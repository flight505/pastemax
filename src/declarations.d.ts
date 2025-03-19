// Type declarations for external modules
declare module "react";
declare module "react-dom/client";
declare module "react/jsx-runtime";
declare module "electron";
declare module "tiktoken";
declare module "ignore";
declare module "gpt-3-encoder";

// Allow importing CSS files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Allow importing various file types
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

// Add CSS module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// React / TypeScript setup fixes
import 'react';

declare module 'react' {
  export type FC<P = Record<string, never>> = React.FunctionComponent<P>;
  
  export interface FunctionComponent<P = Record<string, never>> {
    (props: P, context?: any): React.ReactElement<any, any> | null;
    displayName?: string;
  }
  
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type ReactElement = React.ReactElement;
}
