// Preload script
const { contextBridge, ipcRenderer } = require("electron");

// Define valid channels in one place for better maintainability
const VALID_CHANNELS = {
  send: [
    "open-folder", 
    "request-file-list", 
    "load-ignore-patterns", 
    "save-ignore-patterns",
    "reset-ignore-patterns",
    "debug-file-selection", 
    "cancel-directory-loading",
    "reload-file-list"
  ],
  receive: [
    "folder-selected", 
    "file-list-data", 
    "file-processing-status", 
    "ignore-patterns-loaded", 
    "ignore-patterns-saved",
    "startup-mode"
  ],
  invoke: [
    "save-ignore-patterns",
    "load-ignore-patterns",
    "reset-ignore-patterns",
    "clear-local-ignore-patterns",
    "read-file",
    "get-file-content"
  ]
};

// Helper function to ensure data is serializable
function ensureSerializable(data) {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle primitive types directly
  if (typeof data !== "object") {
    return data;
  }

  // For arrays, map each item
  if (Array.isArray(data)) {
    return data.map(ensureSerializable);
  }

  // For objects, create a new object with serializable properties
  const result = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // Skip functions or symbols which are not serializable
      if (typeof data[key] === "function" || typeof data[key] === "symbol") {
        continue;
      }
      // Recursively process nested objects
      result[key] = ensureSerializable(data[key]);
    }
  }
  return result;
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  // Direct API methods
  send: (channel, data) => {
    if (VALID_CHANNELS.send.includes(channel)) {
      // Ensure data is serializable before sending
      const serializedData = ensureSerializable(data);
      ipcRenderer.send(channel, serializedData);
    }
  },
  receive: (channel, func) => {
    if (VALID_CHANNELS.receive.includes(channel)) {
      // Remove any existing listeners to avoid duplicates
      ipcRenderer.removeAllListeners(channel);
      // Add the new listener
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  // For backward compatibility and additional channels
  ipcRenderer: {
    send: (channel, data) => {
      if (VALID_CHANNELS.send.includes(channel)) {
        const serializedData = ensureSerializable(data);
        ipcRenderer.send(channel, serializedData);
      }
    },
    invoke: (channel, data) => {
      if (VALID_CHANNELS.invoke.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
      return Promise.reject(new Error(`Invalid channel: ${channel}`));
    },
    on: (channel, func) => {
      if (VALID_CHANNELS.receive.includes(channel)) {
        // Wrap function to avoid exposing event object
        const subscription = (event, ...args) => {
          const serializedArgs = args.map(ensureSerializable);
          func(...serializedArgs);
        };
        ipcRenderer.on(channel, subscription);
        return subscription;
      }
    },
    removeListener: (channel, func) => {
      if (VALID_CHANNELS.receive.includes(channel)) {
        ipcRenderer.removeListener(channel, func);
      }
    },
  },
});
