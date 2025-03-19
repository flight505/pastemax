import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CopyButton.module.css";

interface CopyButtonProps {
  text: string;
  className?: string;
  children?: JSX.Element | string;
}

const CopyButton = ({ text, className = "", children }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.copyButton} ${copied ? styles.copied : ""} ${className}`}
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {children}
    </button>
  );
};

export default CopyButton;
