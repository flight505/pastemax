import React, { useState, useEffect } from 'react';
import { Loader2, Check, AlertTriangle, X } from 'lucide-react';
import styles from './StatusAlert.module.css';

// Core structure with TypeScript props
interface StatusAlertProps {
    status: "idle" | "processing" | "complete" | "error";
    message: string;
    autoDismissTime?: number; // in milliseconds, default for success/complete
    onClose?: () => void;     // callback when dismissed
  }
  
  const StatusAlert: React.FC<StatusAlertProps> = ({
    status,
    message,
    autoDismissTime = 5000, // longer default than current 3000ms
    onClose
  }) => {
    // States
    const [isVisible, setIsVisible] = useState(status !== "idle");
    const [isExiting, setIsExiting] = useState(false);
    
    // Icon mapping based on status
    const statusIcons = {
      processing: <Loader2 className="animate-spin" size={16} />,
      complete: <Check size={16} />,
      error: <AlertTriangle size={16} />
    };
    
    // Style mapping based on status
    const statusClasses = {
      processing: styles.processing,
      complete: styles.complete,
      error: styles.error,
      idle: '' // Add idle status to avoid TypeScript index errors
    };
    
    // Title mapping based on status
    const statusTitles = {
      processing: "Processing...",
      complete: "Success",
      error: "Error",
      idle: "" // Add idle status to avoid TypeScript index errors
    };
    
    // Auto-dismiss logic for successful operations
    useEffect(() => {
      if (status === "idle") {
        handleExit();
        return;
      }
      
      setIsVisible(true);
      setIsExiting(false);
      
      // Only auto-dismiss for complete status
      if (status === "complete" && autoDismissTime) {
        const timer = setTimeout(() => {
          handleExit();
        }, autoDismissTime);
        
        return () => clearTimeout(timer);
      }
    }, [status, message, autoDismissTime]);
    
    // Handle exit animation
    const handleExit = () => {
      setIsExiting(true);
      // Wait for animation to complete
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300); // Match transition duration
    };
    
    if (!isVisible && status === "idle") return null;
    
    return (
      <div
        className={`${styles.alertContainer} ${isExiting ? styles.exit : styles.enter} ${statusClasses[status] || ''}`}
        role="alert"
      >
        <div className={styles.alertContent}>
          {status !== "idle" && statusIcons[status]}
          <div className={styles.messageContent}>
            <h5 className={styles.alertTitle}>{statusTitles[status]}</h5>
            <div className={styles.alertDescription}>{message}</div>
          </div>
          {status === "error" && (
            <button 
              className={styles.closeButton} 
              onClick={handleExit}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

export default StatusAlert;