import React, { useEffect, useState } from "react";
import { FileCardProps } from "../types/FileTypes";
import { Plus, X, FileText, Copy } from "lucide-react";
import { Card, CardContent, Button } from "./ui";
import styles from "./FileCard.module.css";

interface FileCardComponentProps {
  file: {
    name: string;
    path: string;
    tokenCount: number;
    content: string;
  };
  isSelected: boolean;
  toggleSelection: (path: string) => void;
  maxTokenCount?: number; // Maximum token count among all displayed files
}

const FileCard = ({
  file,
  isSelected,
  toggleSelection,
  maxTokenCount = 5000, // Default if not provided
}: FileCardComponentProps) => {
  const { name, path: filePath, tokenCount, content } = file;
  const [barWidth, setBarWidth] = useState(0);
  const [copied, setCopied] = useState(false);

  // Format token count for display
  const formattedTokens = tokenCount.toLocaleString();

  // Calculate the percentage width for the token bar based on the highest token count
  useEffect(() => {
    // Start with 0 width
    setBarWidth(0);
    
    // Animate to the correct width with a slight delay for visual appeal
    const timer = setTimeout(() => {
      // If token count is very small compared to max, ensure it has at least some visible width
      let percentage;
      if (maxTokenCount <= 0) {
        percentage = 0;
      } else {
        // Use relative scaling with a minimum percentage to ensure visibility
        const minPercentage = 5; // Ensure even small files have a visible bar
        percentage = Math.max(
          minPercentage,
          Math.min((tokenCount / maxTokenCount) * 100, 100)
        );
      }
      setBarWidth(percentage);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [tokenCount, maxTokenCount]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card 
      selected={isSelected} 
      className={styles.fileCard}
    >
      <CardContent className={styles.fileCardContent}>
        <div className={styles.fileCardHeader}>
          <div className={styles.fileCardIcon}>
            <FileText size={16} />
          </div>
          <div className={styles.fileCardName}>{name}</div>
        </div>
        <div className={styles.fileCardInfo}>
          <div className={styles.fileCardTokens}>~{formattedTokens} tokens</div>
          <div className={styles.tokenBarContainer}>
            <div 
              className={styles.tokenBar} 
              style={{ width: `${barWidth}%` }}
              title={`${tokenCount} tokens (${Math.round(barWidth)}% of largest file)`}
            ></div>
          </div>
        </div>

        <div className={styles.fileCardActions}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => toggleSelection(filePath)}
            title={isSelected ? "Remove from selection" : "Add to selection"}
            startIcon={isSelected ? <X size={16} /> : <Plus size={16} />}
            className={styles.fileCardAction}
          />
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy to clipboard"}
            startIcon={copied ? <Copy size={16} className={styles.copySuccess} /> : <Copy size={16} />}
            className={styles.fileCardAction}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
