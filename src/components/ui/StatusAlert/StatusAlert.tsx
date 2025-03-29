import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
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
    // Visual state management
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    
    // Map status to classes
    const statusClasses = {
      idle: styles.idle,
      processing: styles.processing,
      complete: styles.success,
      error: styles.error
    };
    
    // Define handleExit before it's used in useEffect
    const handleExit = useCallback(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 200); // Match transition duration
    }, [onClose]);
    
    // Handle status changes
    useEffect(() => {
      if (status === "complete" && autoDismissTime) {
        const timer = setTimeout(() => {
          handleExit();
        }, autoDismissTime);
        
        return () => clearTimeout(timer);
      }
    }, [status, message, autoDismissTime, handleExit]);
    
    if (!isVisible && status === "idle") return null;
    
    return (
      <div
        className={`${styles.alertContainer} ${isExiting ? styles.exit : styles.enter} ${statusClasses[status]}`}
        role="alert"
      >
        <div className={styles.alertContent}>
          <div className={styles.messageContent}>
            <span className={styles.terminalPrefix}>&gt;_</span>
            <div className={styles.alertDescription}>{message}</div>
          </div>
          {status === "error" && (
            <button 
              className={styles.closeButton} 
              onClick={handleExit}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    );
  };

export default StatusAlert;