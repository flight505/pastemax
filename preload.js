// Preload script
const { contextBridge, ipcRenderer } = require("electron");

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
  send: (channel, data) => {
    // whitelist channels
    const validChannels = ["open-folder", "request-file-list"];
    if (validChannels.includes(channel)) {
      // Ensure data is serializable before sending
      const serializedData = ensureSerializable(data);
      ipcRenderer.send(channel, serializedData);
    }
  },
  receive: (channel, func) => {
    const validChannels = [
      "folder-selected",
      "file-list-data",
      "file-processing-status",
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => {
        // Convert args to serializable form
        const serializedArgs = args.map(ensureSerializable);
        func(...serializedArgs);
      });
    }
  },
  // For backward compatibility (but still ensure serialization)
  ipcRenderer: {
    send: (channel, data) => {
      const serializedData = ensureSerializable(data);
      ipcRenderer.send(channel, serializedData);
    },
    on: (channel, func) => {
      const wrapper = (event, ...args) => {
        try {
          // Don't pass the event object to the callback, only pass the serialized args
          const serializedArgs = args.map(ensureSerializable);
          func(...serializedArgs); // Only pass the serialized args, not the event
        } catch (err) {
          console.error(`Error in IPC handler for channel ${channel}:`, err);
        }
      };
      ipcRenderer.on(channel, wrapper);
      // Store the wrapper function for removal later
      return wrapper;
    },
    removeListener: (channel, func) => {
      try {
        ipcRenderer.removeListener(channel, func);
      } catch (err) {
        console.error(`Error removing listener for channel ${channel}:`, err);
      }
    },
  },
});

// Expose IPC API to renderer process
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => {
      // Only allow these channels to be sent
      const validSendChannels = [
        "open-folder", 
        "request-file-list", 
        "load-ignore-patterns", 
        "save-ignore-patterns"
      ];
      if (validSendChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, func) => {
      // Only allow these channels to be received
      const validReceiveChannels = [
        "folder-selected", 
        "file-list-data", 
        "file-processing-status", 
        "ignore-patterns-loaded", 
        "ignore-patterns-saved"
      ];
      if (validReceiveChannels.includes(channel)) {
        // Wrap function to avoid exposing event object
        const subscription = (event, ...args) => func(...args);
        ipcRenderer.on(channel, subscription);
        return subscription;
      }
    },
    removeListener: (channel, func) => {
      const validReceiveChannels = [
        "folder-selected", 
        "file-list-data", 
        "file-processing-status", 
        "ignore-patterns-loaded", 
        "ignore-patterns-saved"
      ];
      if (validReceiveChannels.includes(channel)) {
        ipcRenderer.removeListener(channel, func);
      }
    },
  },
});
