Below is an extremely detailed Markdown checklist that includes user stories, each broken down into one-point tasks with checkboxes. Nothing is left out. Each section references relevant files, functional requirements, UI elements, fail cases, fallback scenarios, and testing steps. This is intentionally very long so an autonomous coding agent can follow it precisely without confusion.

⸻

PasteMax Ignore System Overhaul: Master Checklist

Goal
Rework the PasteMax ignore patterns system, implementing:
	1.	A hidden universal (hardcoded) set for large binaries, images, etc.
	2.	A user-visible global defaults file (global_patterns.ignore)
	3.	A local .repo_ignore for folder-specific patterns

This ensures two main user-visible layers (global vs. local) and one hidden layer (hardcoded). The user only sees the global + local patterns in the UI, but behind the scenes, universal/hardcoded patterns are always applied.

Below are the user stories in detail, each with one-story-point tasks to ensure an incremental approach.

⸻

User Stories Overview
	1.	As a developer I want a "universal/hardcoded" ignore list that always excludes big images, archives, etc. I do not want to see these in the UI.
	2.	As a developer I want a "global defaults" file that I can edit from the UI to apply to all my projects, with a fallback if that file does not exist.
	3.	As a developer I want to store local ignore patterns in .repo_ignore so that it only affects the selected folder or repository.
	4.	As a developer I want the final system to merge all three sets (universal + global + local) for the final ignore decision.
	5.	As a developer I want to easily reset the global patterns file to a default set.
	6.	As a developer I want the UI to show only the global and local patterns, not the universal set.
	7.	As a developer I want to override universal patterns if absolutely necessary (using !pattern in .repo_ignore) so advanced users can force-include certain files.
	8.	As a developer I want to thoroughly test that the new approach doesn't break existing code.

Within each story, we break the tasks into single, small, check-off items.

⸻

Detailed Task Breakdown

STORY 1: Hidden Universal/Hardcoded Patterns

1.1. Create a new file for universal/hardcoded patterns
	•	✓ (1) Create a new file, e.g. universalExclusions.js, in the root or next to excluded-files.js.
	•	✓ (1) Write an export with a short array of patterns (e.g., ["**/*.png", "**/*.jpg", "**/*.zip", ...]).

1.2. Merge universal patterns into existing ignore logic
	•	✓ (1) Modify the main process in main.js or electron.js (where shouldIgnoreFile or excludedFiles logic is done):
	•	✓ (1) Import universalExclusions from the new file.
	•	✓ (1) In shouldIgnoreFile (or equivalent), do something like:

const finalPatterns = [...universalExclusions, ...globalUserPatterns, ...localUserPatterns];


	•	✓ (1) Pass finalPatterns into whichever library or function (micromatch/ignore) you are using for the final ignored = shouldIgnore(finalPatterns, filePath) check.

1.3. Confirm universal patterns do not appear in the UI
	•	✓ (1) Check the existing UI code in IgnorePatterns.tsx, verifying it only loads from global_patterns.ignore or .repo_ignore.
	•	✓ (1) Confirm no reference to universal patterns is shown in the scope tab (Global vs Local).

1.4. Test universal patterns
	•	✓ (1) Place some .png, .mp4, or .zip files in a test folder, confirm they get excluded automatically.
	•	✓ (1) Try to override them with !**/*.png in .repo_ignore to confirm the library's advanced logic can re-include them.

⸻

STORY 2: Global Defaults File

2.1. Maintain existing or create new global_patterns.ignore file
	•	(1) Confirm the path for global patterns is decided. Often it's appDataPath/global_patterns.ignore or similar.
	•	(1) If it doesn't exist, fallback to getDefaultIgnorePatterns().

2.2. Load global patterns in the UI
	•	(1) In IgnorePatterns.tsx, or your existing UI, ensure that selecting "Global Defaults" tab triggers a load of that file (via IPC "load-ignore-patterns" + isGlobal:true).
	•	(1) If the file does not exist, show an empty text area or your default.

2.3. Save global patterns in the UI
	•	(1) On pressing "Save" in the UI while on "Global Defaults," call the IPC method "save-ignore-patterns" with isGlobal:true.
	•	(1) The main process writes them to global_patterns.ignore.

2.4. Reset to defaults
	•	(1) Add a "Reset Defaults" button (or reuse your existing approach).
	•	(1) On click, call ipcRenderer.send("reset-ignore-patterns", { isGlobal: true });
	•	(1) In main process, handle that event by deleting global_patterns.ignore if it exists, then rewriting a known default string (like you do now with getDefaultIgnorePatterns()).

2.5. Confirm user sees these changes in UI
	•	(1) After saving or resetting, re-load the patterns to confirm the text area updates.

⸻

STORY 3: Local .repo_ignore for Each Folder

3.1. Loading local patterns
	•	(1) On "Local Folder" tab, call "load-ignore-patterns" with isGlobal:false.
	•	(1) In main process, read folderPath/.repo_ignore. If missing or empty, return an empty string (or your "suggested local patterns").

3.2. Saving local patterns
	•	(1) On pressing "Save" in the UI while on "Local Folder," call "save-ignore-patterns" with isGlobal:false.
	•	(1) In main process, write to .repo_ignore in the selected folder path.

3.3. Confirm local + global merges with universal
	•	(1) In your scanning logic, ensure the final set is [ universalExclusions, globalPatterns, localPatterns ].
	•	(1) Test locally by ignoring a file in .repo_ignore, confirm it's excluded.
	•	(1) Test that !**/*.png in .repo_ignore can override universal (if your library supports negation).

⸻

STORY 4: Combine All Three for Final Decision

(This is partially covered above, but let's isolate final testing tasks.)

4.1. Final aggregator function for patterns
	•	(1) Possibly create a helper like getAllIgnorePatterns(folderPath) that returns a single array with universal + global + local.
	•	(1) Use that single array in your scanning code so it is unified.

4.2. Confirm no duplication
	•	(1) If universalExclusions appear in both global and universal sets, it's not a huge problem, but confirm you handle duplicates gracefully.
	•	(1) Optionally filter duplicates with a Set or something.

⸻

STORY 5: Resetting Global Patterns to a Hardcoded String

(In more detail since it's common to have confusion.)

5.1. Create "reset-ignore-patterns" IPC event
	•	(1) In main.js or electron.js, add:

ipcMain.on("reset-ignore-patterns", (event, { isGlobal }) => {
  if (isGlobal) {
    // delete global_patterns.ignore, recreate with default
  } else {
    // Could optionally handle local reset, or do nothing
  }
});


	•	(1) On the UI side (IgnorePatterns.tsx?), add a "Reset to Defaults" button that calls ipcRenderer.send("reset-ignore-patterns", { isGlobal: <depends> }).

5.2. Test scenario
	•	(1) If user modifies the global defaults extensively, click reset -> confirm it reverts.
	•	(1) Confirm it re-renders in the UI.

⸻

STORY 6: Hide Universal Patterns from the UI

(We partially covered this, but let's break down explicit tasks.)

6.1. Confirm no reference in IgnorePatterns.tsx
	•	(1) In IgnorePatterns.tsx, confirm code only loads from load-ignore-patterns for local or global.
	•	(1) Check no place in that component tries to show the universal/hardcoded patterns.

6.2. Hard-coded disclaimers?
	•	(1) If you want to mention "We also skip large binaries by default" in your UI as a note, do it in plain text. But don't actually list them.

⸻

STORY 7: Overriding Universal with !pattern

(This is an advanced scenario. Possibly depends on your library's behavior.)

7.1. Confirm your ignore library supports ! negation
	•	(1) If using ignore or micromatch, confirm that if universalExclusions includes **/*.png, and local has !myImportant.png, does it re-include that single file?

7.2. Document it for advanced users
	•	(1) Possibly add a doc snippet or tool-tip in IgnorePatterns.tsx explaining that advanced users can do ! negation if needed.

⸻

STORY 8: Thorough Testing & QA

8.1. Automatic tests (if existing)
	•	(1) Update any Jest or Mocha tests that check ignoring logic.
	•	(1) Possibly add new tests specifically for the universal patterns.

8.2. Manual test matrix
	1.	No global, no local: only universal is used -> big images are ignored.
	2.	Global only: confirm .repo_ignore is absent.
	3.	Local only: confirm global is absent or empty, universal is still in effect.
	4.	Both global + local: merges.
	5.	Reset global.
	6.	Time out or error if .repo_ignore can't be read -> show empty or fallback.

⸻

Appendix: File-by-File Summary

(Optional reference for the coding agent)
	1.	universalExclusions.js
	•	Exports a short array of universal patterns (like big binaries, images).
	2.	excluded-files.js (If you prefer to keep everything in the same file instead of a new one.)
	•	Could contain the universal list + a separate array for user-facing defaults.
	3.	electron.js or main.js
	•	The main process event handlers for load-ignore-patterns, save-ignore-patterns, reset-ignore-patterns.
	•	The scanning logic that merges [universal, global, local].
	4.	IgnorePatterns.tsx
	•	The UI for editing "Global Defaults" or "Local Folder."
	•	Possibly has tab/toggle to switch between them.
	•	Summons the ipcRenderer.send(...) calls.
	5.	App.tsx
	•	Where you might store or pass around ignorePatterns state, if needed.
	6.	excludedFiles / excludedByDefault usage
	•	Already used in the code for ignoring certain patterns. Make sure you unify or rename to avoid confusion with universal vs. global.

⸻

Completion & Handoff
	•	(1) Present this entire checklist in your repository's docs or GitHub issues so it's tracked.
	•	(1) Mark each sub-task as done once it's implemented/tested.
	•	(1) Provide the final build to confirm everything works in a production environment.

⸻

End of Master Checklist.

Following each story's tasks in order, you should produce a working 3-layer ignore system, with minimal user confusion, minimal code breakage, and easy future maintenance. Good luck!