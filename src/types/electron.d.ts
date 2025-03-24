declare global {
  interface Window {
    /**
     * Electron API exposed through contextBridge in preload.js
     */
    electron: {
      /**
       * IPC Renderer interface for communication with the main process
       */
      ipcRenderer: {
        /**
         * Send a message to the main process
         * @param channel - The channel to send the message on
         * @param data - Optional data to send with the message
         */
        send: (channel: string, data?: any) => void;
        
        /**
         * Register a listener for messages from the main process
         * @param channel - The channel to listen on
         * @param func - The callback function to handle the message
         */
        on: (channel: string, func: (...args: any[]) => void) => void;
        
        /**
         * Remove a listener for messages from the main process
         * @param channel - The channel to remove the listener from
         * @param func - The callback function to remove
         */
        removeListener: (channel: string, func: (...args: any[]) => void) => void;
        
        /**
         * Invoke a method in the main process and get a response
         * @param channel - The channel to invoke the method on
         * @param data - Optional data to send with the invocation
         * @returns A promise that resolves with the result from the main process
         */
        invoke: <T = any>(channel: string, data?: any) => Promise<T>;
        
        /**
         * Set the maximum number of listeners for a channel
         * @param n - The maximum number of listeners
         */
        setMaxListeners?: (n: number) => void;
      };
    };
  }
}

export {}; 