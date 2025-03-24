Below is an annotated overview of how the fixes from those two PRs (#16 and #20) fit into (or can be integrated into) the merged code you’ve posted. I’ll point out where the “maximum update depth” fix shows up in the React/Sidebar logic, where you may still be missing the final piece that marks the tree as “done building” (thus hiding the spinner), and why the “webContents is undefined” fix is not present (and likely belongs in the Electron main process file, which is not shown in this merged code).

⸻

1. Fixing the “Maximum Update Depth Exceeded” in the Sidebar

Where the Fix Usually Comes From (PR #20)

PR #20 (on the GitHub repo you referenced) made a number of changes aimed at stopping React from re-rendering infinitely in the Sidebar. The key approaches generally used are:
	1.	Breaking setState loops with:
	•	References that track whether we are already building or updating the tree (so we don’t rebuild it again in response to our own updates).
	•	Conditionals that detect whether anything actually changed before setting state.
	•	Occasional use of setTimeout(...) or “debounce” logic to wait a tick and avoid synchronous cycles.
	2.	Referential Equality Checks before calling setFileTree(...), setExpandedNodes(...), or other states in a loop. For example, building an updated tree in memory but comparing it to the old one. If they’re effectively the same data, skip calling setFileTree(newTree).
	3.	Early return if we detect we’re in the middle of a re-build or re-expansion.

How We See It in Your Posted Code

In the large Sidebar.tsx you shared, we do see key references to:
	•	isBuildingTreeRef, isUpdatingExpandedNodesRef
	•	useEffect calls that do something like:

if (fileTree.length === 0 || isUpdatingExpandedNodesRef.current) {
  return;
}


	•	A “debounce” style setTimeout around tree building:

const debounceId = setTimeout(() => {
  ...
  isBuildingTreeRef.current = true;
  ...
  setFileTree(builtTree);
  ...
  isBuildingTreeRef.current = false;
}, DEBOUNCE_DELAY);



Those are precisely the techniques introduced in (or inspired by) PR #20 to break the update cycles. So most of that PR’s fix looks like it has been integrated.

⸻

A Possible Missing Piece: Setting isTreeBuildingComplete = true

You have this state:

const [isTreeBuildingComplete, setIsTreeBuildingComplete] = useState(false);

But nowhere in your code do you actually do setIsTreeBuildingComplete(true). Then in the render, you do:

{isTreeBuildingComplete ? (
  /* Show flattened file tree */
) : (
  <div className={styles.treeLoading}>
    ...
    <p>Loading files...</p>
  </div>
)}

This means the Sidebar will always show treeLoading (the spinner) if isTreeBuildingComplete never switches to true.

Often, the final line inside your “debounced” effect, after you have successfully set the fileTree, would be something like:

setFileTree(builtTree);
setIsTreeBuildingComplete(true);

Or you might do that once after the first build is completed.

Recommendation
	•	Whenever you detect that building the tree has finished (around line 345 in your code, where you do isBuildingTreeRef.current = false), also do:

setIsTreeBuildingComplete(true);


	•	If you want that “Loading…” spinner to come back whenever user reselects a folder, or re-sorts, or re-loads, you might set it back to false at the start of building.

⸻

2. Fixing the “Cannot read properties of undefined (reading ‘webContents’)”

Where the Fix Usually Comes From (PR #16)

PR #16 addresses issues in the main Electron process—e.g., in main.ts or main.js—where the code tries to do something like:

mainWindow.webContents.send( ... )
// or
mainWindow.webContents.on('something', ...)

but mainWindow is destroyed or undefined.

Common fixes include:
	•	Checking:

if (!mainWindow || mainWindow.isDestroyed()) {
  return;
}

before calling mainWindow.webContents.

	•	Ensuring you do not call any webContents methods after the window has closed or at certain shutdown stages.

Why It’s Not Seen in Your Merged Code

In your merged file, the only “main” file shown is src/main.tsx, which is a React entry point (the code that calls ReactDOM.createRoot(...)). That is not the Electron “main process” script that actually creates BrowserWindows, handles IPC on the Node side, etc.

Hence no references to webContents or “isDestroyed()” appear in the posted code. The relevant code for that fix is presumably in something like:
	•	electron/main.ts or
	•	main.js in the root of your project

…which is not part of the “packed representation” in your snippet.

Recommendation
	•	Make sure the actual Electron main process script is updated to check if (mainWindow && !mainWindow.isDestroyed()) around any place you do mainWindow.webContents.send(...).
	•	That’s likely precisely what PR #16 did. If your Electron main file is not shown here, you’ll want to look at the changes from the PR and confirm you have them.

⸻

3. Verifying the Two Fixes Have Been Incorporated
	1.	React Side “Infinite Loop”
From scanning your Sidebar.tsx, you do have references, checks, and toggles that match what PR #20 introduced:
	•	“debouncing” the tree update in a setTimeout
	•	isBuildingTreeRef and isUpdatingExpandedNodesRef guards
	•	Conditionals that skip setting state if nothing changed
That means you’ve effectively got the main bits of the PR #20 fix. The main potential gap is finishing the “building is done” flow by setting isTreeBuildingComplete.
	2.	Electron Side “webContents is undefined”
Because we don’t see the real main process file in your snippet, you are likely missing the lines from PR #16 that do:

if (mainWindow && !mainWindow.isDestroyed()) {
  mainWindow.webContents.send(/* ... */);
}

or similar.
Without that, you can still run into “Cannot read property ‘webContents’ of undefined” or “Cannot read property ‘send’ of null” or “Cannot read property ‘send’ of destroyed object.”
Make sure you also add those checks in your Electron main process script.

⸻

4. Summary of Steps to Fully Integrate These PR Fixes
	1.	In Your React Code (Sidebar.tsx):
	•	You largely have the PR #20 changes (the rework of building the file tree with refs and expanded nodes).
	•	Add a setIsTreeBuildingComplete(true) line once the tree is done building (to remove the spinner).
	•	Optionally set setIsTreeBuildingComplete(false) whenever the user picks a new folder or triggers a re-build.
	2.	In Your Electron Main Script (main.ts or main.js):
	•	Look at PR #16’s commits (the lines that do if (BrowserWindow && !BrowserWindow.isDestroyed()) { ... } or similar checks).
	•	Merge those checks around any place you do mainWindow.webContents.send(...), so you avoid the undefined or “window destroyed” error.
	3.	Confirm you’re not missing any smaller details, like adding a short setTimeout or removing any extra setState calls. But from the code snippet, it looks like your main logic is there.

⸻

Takeaways
	•	You do have the critical elements from PR #20 for breaking the infinite re-render loops in Sidebar.
	•	You likely do not have the final “spinner-lifecycle” line that sets isTreeBuildingComplete = true, which is why your code still references that variable but never stops “Loading…” in the UI.
	•	You do not have the main-electron fix (from PR #16) in the code snippet above, because that belongs in a different file (the actual Electron main process). Be sure to cross-check your real main.ts/main.js for those window-destroy checks.

With those final additions, you’ll have the complete set of solutions described in the two PRs.