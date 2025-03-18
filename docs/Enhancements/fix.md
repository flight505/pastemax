1. **Load and Parse the Entire Codebase**
   - Read all available files from the CODEBASE, ensuring the agent has the full context of the repository’s structure.
   - Internally note the file paths, file contents, and their hierarchical relationships.
   - Identify any references to `Sidebar.tsx` to understand how this component is rendered and updated.

3. **Isolate Console Errors and Warnings**
   - Locate the file `Sidebar.tsx` and navigate to line **135** (as shown in the console log).
   - Identify where `setState` (or similar state-setting logic) is being called inside `useEffect`.
   - Confirm whether the `useEffect` dependency array is missing or causing repeated updates.
   - Adjust the dependency array or reorganize the state update logic to prevent infinite render loops. For instance:
     - If the effect is meant to run only once on mount, provide an empty `[]` dependency array.
     - If it depends on specific state variables, ensure those variables do not continuously change within the effect.
   - Validate that no circular triggers exist (e.g., a state update that depends on another state that triggers the same effect).

4. **Identify Candidates for Refactoring**
   1. **Functions and Classes to Restructure**  
      - Programmatically scan for long functions or classes with repeated logic.  
      - Mark each candidate for potential decomposition (e.g., splitting into smaller functions) or conversion from class components to functional components, if applicable.
   2. **Duplicate or Unused Files**  
      - Generate a manifest of all files and locate duplicates or files that are not imported anywhere.
      - For each unused file, confirm it has no references (imports, dynamic requires, etc.).
      - Compile the findings into an internal list, ready for deletion or archiving.
   3. **Optimize Without Major Rewrites**  
      - Look for minor performance bottlenecks, such as unnecessary re-renders or non-memoized expensive calculations in components.
      - Prioritize them by estimated impact versus complexity of changes.

5. **Rank Areas for Optimization**
   - Using the previously discovered optimization opportunities, create a list in descending order of importance (highest impact on performance or code clarity first).
   - For each item, note an approximate difficulty level (low, medium, high) based on how complex the changes would be.

6. **Integrate ShadcnUI Components**
   - Create (or locate) a dedicated file (e.g., `src/components/ui/index.tsx` or similar) to house shared ShadcnUI components (tables, buttons, forms, etc.).
   - Compare existing UI components with ShadcnUI equivalents:
     - Decide which existing components should be replaced with ShadcnUI to enhance consistency and reduce custom code.
   - Move or replicate any repeating UI elements (like custom buttons) into this central ShadcnUI-based file.
   - Update all relevant imports throughout the codebase to reference these new shared components instead of local duplicates.

7. **Search for Outdated Code**
   - Programmatically check for deprecated React methods or libraries in `package.json`.
   - Inspect each component for legacy lifecycle methods (if any exist), or older patterns replaced by hooks or functional components.
   - Identify any places using older syntax or references to discontinued external APIs.

8. **Refine the Codebase Structure**
   - Remove or archive any files identified as duplicates or entirely unused.
   - Apply the selected refactoring improvements to any classes, functions, or hooks deemed high priority.
   - Update references or imports to reflect any removed or moved files.

9. **Execute Project Build**
   - Run the appropriate build command, for example:
     ```bash
     npm run build
     ```
   - Ensure that the build completes without errors. If any errors arise during this automated build process, resolve them by adjusting code references or dependencies accordingly.