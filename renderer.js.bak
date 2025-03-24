// Use the exposed electron API instead of direct require
// const { ipcRenderer } = require("electron");

// Track selected files
let selectedFiles = [];
let allFiles = []; // Store all file data
let displayedFiles = []; // Files after filtering and sorting
let currentSort = "name-asc"; // Default sort
let currentFilter = ""; // Current filter text

const openFolderButton = document.getElementById("open-folder-button");
const selectAllButton = document.getElementById("select-all-button");
const deselectAllButton = document.getElementById("deselect-all-button");
const sortDropdown = document.getElementById("sort-dropdown");
const filterInput = document.getElementById("filter-input");
const copyButton = document.getElementById("copy-button");
const copyStatus = document.getElementById("copy-status");

openFolderButton.addEventListener("click", () => {
  // Use the exposed IPC method from preload.js
  window.electron.send("open-folder");
});

// Set up the IPC listeners using the exposed API
window.electron.receive("folder-selected", (selectedPath) => {
  // Store or display the selected path
  const selectedFolderDisplay = document.getElementById(
    "selected-folder-display",
  );
  selectedFolderDisplay.textContent = `Selected Folder: ${selectedPath}`;

  // Reset selected files when a new folder is selected
  selectedFiles = [];
  allFiles = [];
  displayedFiles = [];

  // Reset filter input
  filterInput.value = "";
  currentFilter = "";

  // Request file list data
  window.electron.send("request-file-list", selectedPath);
});

// Also update the file-list-data listener
window.electron.receive("file-list-data", (files) => {
  // Handle received files data
  allFiles = files;
  applyFiltersAndSort();
});

// Sort the files based on the selected sort option
function sortFiles(files, sortValue) {
  const [sortKey, sortDir] = sortValue.split("-"); // e.g. 'name', 'asc'

  return [...files].sort((a, b) => {
    let comparison = 0;

    if (sortKey === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortKey === "tokens") {
      comparison = a.tokenCount - b.tokenCount;
    } else if (sortKey === "size") {
      comparison = a.size - b.size;
    }

    return sortDir === "asc" ? comparison : -comparison;
  });
}

// Sort dropdown change handler
sortDropdown.addEventListener("change", () => {
  currentSort = sortDropdown.value;
  applyFiltersAndSort();
});

// Filter function to filter files by name or path
function filterFiles(files, filterText) {
  if (!filterText) {
    return files;
  }

  const lowerFilter = filterText.toLowerCase();
  return files.filter((file) => {
    return (
      file.name.toLowerCase().includes(lowerFilter) ||
      file.path.toLowerCase().includes(lowerFilter)
    );
  });
}

// Filter input event handler
filterInput.addEventListener("input", () => {
  currentFilter = filterInput.value;
  applyFiltersAndSort();
});

// Apply both filtering and sorting
function applyFiltersAndSort() {
  // First filter
  displayedFiles = filterFiles(allFiles, currentFilter);
  // Then sort
  displayedFiles = sortFiles(displayedFiles, currentSort);
  // Render the list
  renderFileList(displayedFiles);
}

// Calculate total tokens from selected files
function calculateTotalTokens() {
  let total = 0;

  selectedFiles.forEach((selectedPath) => {
    const fileData = allFiles.find((f) => f.path === selectedPath);
    if (fileData) {
      total += fileData.tokenCount;
    }
  });

  return total;
}

// Update the total tokens display
function updateTotalTokens() {
  const totalTokens = calculateTotalTokens();
  document.getElementById(
    "total-tokens",
  ).textContent = `Total Tokens: ${totalTokens.toLocaleString()}`;
}

// Handle checkbox changes
function handleCheckboxChange(event) {
  const filePath = event.target.value;
  if (event.target.checked) {
    if (!selectedFiles.includes(filePath)) {
      selectedFiles.push(filePath);
    }
  } else {
    selectedFiles = selectedFiles.filter((path) => path !== filePath);
  }
  updateTotalTokens();
  console.log("Selected files:", selectedFiles.length);
}

// Select All button functionality
selectAllButton.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    '#file-list input[type="checkbox"]',
  );

  // Get the paths of all currently displayed files
  const displayedPaths = displayedFiles.map((file) => file.path);

  // Remove any previously selected files that are no longer displayed
  selectedFiles = selectedFiles.filter((path) => displayedPaths.includes(path));

  // Add all currently displayed files
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    const filePath = checkbox.value;
    if (!selectedFiles.includes(filePath)) {
      selectedFiles.push(filePath);
    }
  });

  updateTotalTokens();
  console.log("Selected all displayed files:", selectedFiles.length);
});

// Deselect All button functionality
deselectAllButton.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    '#file-list input[type="checkbox"]',
  );

  // Get the paths of all currently displayed files
  const displayedPaths = displayedFiles.map((file) => file.path);

  // Remove currently displayed files from selection
  selectedFiles = selectedFiles.filter(
    (path) => !displayedPaths.includes(path),
  );

  // Uncheck all displayed checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  updateTotalTokens();
  console.log("Deselected all displayed files");
});

// Format file size to be human-readable
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + units[i];
}

// Concatenate selected files
function concatenateSelectedFiles() {
  // Get sorted files (both displayed and not displayed)
  const sortedFiles = sortFiles(allFiles, currentSort);

  // Filter to only include selected files
  const sortedSelectedFiles = sortedFiles.filter((file) =>
    selectedFiles.includes(file.path),
  );

  if (sortedSelectedFiles.length === 0) {
    return "No files selected.";
  }

  let concatenatedString = "";

  sortedSelectedFiles.forEach((file) => {
    concatenatedString += `\n\n// ---- File: ${file.name} ----\n\n`;
    concatenatedString += file.content;
  });

  return concatenatedString;
}

// Copy to clipboard functionality
copyButton.addEventListener("click", async () => {
  const content = concatenateSelectedFiles();

  try {
    await navigator.clipboard.writeText(content);

    // Show the "Copied!" status
    copyStatus.classList.add("visible");

    // Hide the status after 2 seconds
    setTimeout(() => {
      copyStatus.classList.remove("visible");
    }, 2000);

    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Could not copy content: ", err);
    alert("Failed to copy to clipboard");
  }
});

// Render the file list with the current data and sorting
function renderFileList(files) {
  const fileList = document.getElementById("file-list");
  // Clear existing list
  fileList.innerHTML = "";

  files.forEach((file) => {
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = file.path;

    // Don't allow selecting binary or skipped files
    if (file.isBinary || file.isSkipped) {
      checkbox.disabled = true;
    } else {
      checkbox.addEventListener("change", handleCheckboxChange);
      // If this file is in selectedFiles, check the box
      if (selectedFiles.includes(file.path)) {
        checkbox.checked = true;
      }
    }

    // Create label for the filename
    const label = document.createElement("span");
    label.textContent = file.name;

    // Apply styling for binary and skipped files
    if (file.isBinary) {
      li.classList.add("binary-file");
      label.innerHTML = `${file.name} <span class="file-badge binary-badge">${file.fileType}</span>`;
    } else if (file.isSkipped) {
      li.classList.add("skipped-file");
      label.innerHTML = `${file.name} <span class="file-badge error-badge">${file.error}</span>`;
    }

    // Create token count display
    const tokenCountSpan = document.createElement("span");
    if (file.isBinary || file.isSkipped) {
      tokenCountSpan.textContent = " (Tokens: N/A)";
    } else {
      tokenCountSpan.textContent = ` (Tokens: ${file.tokenCount.toLocaleString()})`;
    }
    tokenCountSpan.style.color = "#666";
    tokenCountSpan.style.marginLeft = "10px";

    // Create file size display
    const fileSizeSpan = document.createElement("span");
    fileSizeSpan.textContent = ` (Size: ${formatFileSize(file.size)})`;
    fileSizeSpan.style.color = "#666";
    fileSizeSpan.style.marginLeft = "5px";

    // Add the checkbox and labels to the list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(tokenCountSpan);
    li.appendChild(fileSizeSpan);

    fileList.appendChild(li);
  });
}
