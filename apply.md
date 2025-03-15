# Directory Loading Performance Improvements

This PR addresses performance issues with directory loading that could cause the application to freeze when loading large directories:

## Key Improvements:

1. **Timeout Control**:
   - Added a 30-second timeout for directory loading operations
   - If loading exceeds this time, it's automatically cancelled with a user-friendly error message

2. **User Control**:
   - Added ESC key support to cancel long-running directory loads
   - Added explicit cancel button in the UI via the cancel-directory-loading IPC channel

3. **Safe Mode**:
   - Added startup in safe mode with --safe-mode command line parameter
   - Safe mode notifies the renderer process to alter behavior with very large directories

4. **Loading State Management**:
   - Properly track loading state to prevent multiple concurrent loading operations
   - Clear loading state and timeouts when operations complete or error

5. **IPC Improvements**:
   - Fixed event listener cleanup in preload.js to prevent memory leaks
   - Added proper validation for IPC channels

These changes significantly improve the application's stability when dealing with large directory structures and provide a better user experience by preventing UI freezes. 