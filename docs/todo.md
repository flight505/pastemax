<TEMPLATE>
<INSTRUCTIONS>

1. **Scan the Entire Codebase**  
   - Parse all files in the repository, including `App.tsx`, `Sidebar.tsx`, `ThemeContext.tsx`, and any other components, utilities, or configuration files.
   - Create an internal map or data structure representing each file’s functions, imports, exports, and relevant code blocks to ensure no areas are overlooked.

2. **Analyze Console Errors and Warnings**  
   - Locate the logic that triggers the `"Maximum update depth exceeded"` error in `Sidebar.tsx`.
   - Identify the cause of repeated or changing dependencies in `useEffect` hooks or state setters in that file.
   - Note all findings for planned refactoring steps.

3. **Identify Areas for Refactoring**  
   - Parse all component files and search for opportunities to restructure functions and classes (e.g., overly complex components, repeated logic).
   - Look for large or monolithic components that can be broken into smaller, more maintainable units.
   - Record each target component or function in a list for subsequent refactoring.

4. **Locate Duplicate or Unused Files**  
   - Compare files by name and content to find duplicates or near-duplicates.
   - Mark files with no references or files that are importable but never imported as candidates for removal.
   - Add these findings to a dedicated list for cleanup.

5. **Detect and Document Outdated Dependencies**  
   - Check the `package.json` for outdated dependencies.
   - Collect version information and compare with the latest published versions.
   - Prepare a list of these outdated dependencies, but do not install or update them yet.

6. **Rank Possible Optimizations by Importance and Difficulty**  
   - Based on the scanning results, create an internal list of optimizations or improvements (e.g., state management simplifications, logic extractions, UI cleanup).
   - Assign each optimization a priority level (e.g., high, medium, low) and difficulty level (e.g., easy, moderate, hard).
   - Store this rank-ordered list for reference.

7. **Prepare ShadcnUI Component Implementation**  
   - Create or designate a folder for reusable ShadcnUI-based components (e.g., `src/components/ui`).
   - Set up boilerplate files for common components like buttons, tables, and input fields.
   - Integrate ShadcnUI styles or theming if applicable, ensuring each new component follows the established design approach.

8. **Extract and Replace Existing Components with ShadcnUI**  
   - Identify repetitive UI elements (buttons, forms, table layouts) across the codebase.
   - Move any shared logic or styling into the new ShadcnUI-based component files.
   - Update all references in the application to point to the new reusable components.

9. **Refactor the Sidebar to Fix the Maximum Update Depth Error**  
   - Examine the `useEffect` dependencies and any state updates that occur within `Sidebar.tsx`.
   - Adjust the dependency arrays or relocate the state updates to prevent infinite re-render loops.
   - Remove or modify redundant `setState` calls occurring within `useEffect`.

10. **Remove or Archive Duplicate and Unused Files**  
    - For all identified duplicates or unused files, remove them from the project or relocate them to an archive folder if needed for reference.
    - Update any import statements that relied on these duplicates if applicable.

11. **Commit Changes**  
    - Stage all modified, removed, or newly created files for commit.
    - Commit the refactor with a message referencing the changes (e.g., “Refactor: Resolve Sidebar update depth, add ShadcnUI components, remove duplicates”).

12. **Run a Build to Confirm Compilation**  
    - Execute the build command (e.g., `npm run build` or `npm run package`), ensuring all refactored code compiles successfully.


13. **Option to work on a github branch**
    - It would be nice to be able to see the changes on a branch and not only the local folder if we were working in on a specific GitHub branch and we make some changes by copying something back. It is not reflected in the local folder and thus it is not reflected in pastebacks either.

</INSTRUCTIONS>
</TEMPLATE>



