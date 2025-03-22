import React, { useEffect, useState } from "react";
import { Plus, X, FileText } from "lucide-react";
import CopyButton from "./CopyButton";
import { FileCardProps } from "../types/FileTypes";

const FileCard = ({
  file,
  isSelected,
  toggleSelection,
  maxTokenCount = 5000, // Default if not provided
}: FileCardProps & { maxTokenCount?: number }) => {
  const { name, path: filePath, tokenCount } = file;
  const [barWidth, setBarWidth] = useState(0);

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

  return (
    <div className={`file-card ${isSelected ? "selected" : ""}`}>
      <div className="file-card-header">
        <div className="file-card-icon">
          <FileText size={16} />
        </div>
        <div className="file-card-name monospace">{name}</div>
      </div>
      <div className="file-card-info">
        <div className="file-card-tokens">~{formattedTokens} tokens</div>
        <div className="token-bar-container">
          <div 
            className="token-bar" 
            style={{ width: `${barWidth}%` }}
            title={`${tokenCount} tokens (${Math.round(barWidth)}% of largest file)`}
          ></div>
        </div>
      </div>

      <div className="file-card-actions">
        <button
          className="file-card-action"
          onClick={() => toggleSelection(filePath)}
          title={isSelected ? "Remove from selection" : "Add to selection"}
        >
          {isSelected ? <X size={16} /> : <Plus size={16} />}
        </button>
        <CopyButton text={file.content} className="file-card-action">
          {""}
        </CopyButton>
      </div>
    </div>
  );
};

export default FileCard;
