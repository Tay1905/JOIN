// Variables for task details
let ID = -1;
let status = "";
let checkbox = [];
let subtasksClosed = -1;

/**
 * Opens the Add Task popup for creating a new task.
 *
 * @param {string} status - The task status.
 */
async function openAddTaskPopup(status) {
    taskContactList = [];
    await loadUsers();
    ID = -1;
    let popup = document.getElementById('popup');
    let body = document.getElementById('body');
    popup.classList.remove('d-none');
    popup.classList.add('d-block');
    body.classList.add('overflow-hidden');
    statusTask = status;
    renderPopUp(popup);
}

/**
 * Opens the Add Task popup for editing an existing task.
 *
 * @param {number} idOld - The ID of the task to edit.
 * @param {string} title - The task title.
 * @param {string} description - The task description.
 * @param {string} dueDate - The due date of the task.
 * @param {string} prio - The task priority.
 * @param {Array<string>} firstNames - Array of first names of assigned contacts.
 * @param {Array<string>} lastNames - Array of last names of assigned contacts.
 * @param {Array<string>} colors - Array of colors of assigned contacts.
 * @param {string} status - The task status.
 * @param {string} category - The task category.
 * @param {Array<boolean>} checkboxOld - Array of task checkboxes.
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 * @param {number} subtasksClosedOld - The number of closed subtasks.
 */
async function openAddTaskPopupEdit(idOld, title, description, dueDate, prio, firstNames, lastNames, colors, status, category, checkboxOld, subtasksOld, subtasksClosedOld) {
    await loadUsers();
    preparePopup();
    setTaskDetails(title, description);
    setupContactDropdown(firstNames, lastNames, colors);
    setDateAndPriority(dueDate, prio);
    setupCategoryDropdown(category);
    setupSubtasks(subtasksOld);
    setTaskStatusAndCheckbox(idOld, status, checkboxOld);
    setSubtaskClosed(subtasksClosedOld);
}

/**
 * Prepares the Add Task popup by showing it, disabling body scroll, and rendering the popup.
 */
function preparePopup() {
    let popup = document.getElementById('popup');
    let body = document.getElementById('body');
    showPopup(popup);
    disableBodyScroll(body);
    renderPopUp(popup);
}

/**
 * Sets up the contact dropdown menu with provided first names, last names, and colors.
 *
 * @param {Array<string>} firstNames - Array of first names of assigned contacts.
 * @param {Array<string>} lastNames - Array of last names of assigned contacts.
 * @param {Array<string>} colors - Array of colors of assigned contacts.
 */
function setupContactDropdown(firstNames, lastNames, colors) {
    openDropdownMenuEdit('contact', firstNames, lastNames, colors);
}

/**
 * Sets the due date and priority for a task. If no priority is provided, it defaults to "no".
 *
 * @param {string} dueDate - The due date of the task.
 * @param {string} prio - The task priority.
 */
function setDateAndPriority(dueDate, prio) {
    setDate(dueDate);
    if (prio == undefined) {
        prio = "no";
    }
    getTaskPrio(prio);
}

/**
 * Sets up the category dropdown menu with a provided category.
 *
 * @param {string} category - The task category.
 */
function setupCategoryDropdown(category) {
    openDropdownMenuEditCategory('category', category);
}

/**
 * Sets up subtasks with provided subtask descriptions.
 *
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 */
function setupSubtasks(subtasksOld) {
    setSubtasks(subtasksOld);
}

/**
 * Sets a task's status and checkboxes with provided task ID, status, and checkboxes.
 *
 * @param {number} idOld - The ID of the task.
 * @param {string} status - The task status.
 * @param {Array<boolean>} checkboxOld - Array of task checkboxes.
 */
function setTaskStatusAndCheckbox(idOld, status, checkboxOld) {
    ID = idOld;
    checkbox = checkboxOld;
    setStatus(status);
}

/**
 * Sets whether a subtask is closed with a provided subtask closed status.
 *
 * @param {number} subtasksClosedOld - The number of closed subtasks.
 */
function setSubtaskClosed(subtasksClosedOld) {
    subtasksClosed = subtasksClosedOld;
}

/**
 * Shows the Add Task popup.
 *
 * @param {HTMLElement} popup - The popup element.
 */
function showPopup(popup) {
    popup.classList.remove('d-none');
    popup.classList.add('d-block');
}

/**
 * Disables body scrolling to prevent scrolling when the popup is open.
 *
 * @param {HTMLElement} body - The body element.
 */
function disableBodyScroll(body) {
    body.classList.add('overflow-hidden');
}

/**
 * Sets the task title and description in the input fields.
 *
 * @param {string} title - The task title.
 * @param {string} description - The task description.
 */
function setTaskDetails(title, description) {
    document.getElementById('add_task_title').value = title;
    document.getElementById('add_task_description').value = description;
}

/**
 * Sets the due date in the input field.
 *
 * @param {string} dueDate - The due date of the task
 */
function setDate(dueDate) {
    document.getElementById('add_task_input_date').value = dueDate;
}

/**
 * Sets the subtasks for the task.
 *
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 */
function setSubtasks(subtasksOld) {
    subtasks = subtasksOld;
    checkSubtasks(subtasks);
}

/**
 * Sets the task status.
 *
 * @param {string} status - The task status.
 */
function setStatus(status) {
    statusTask = status;
}

/**
 * Renders the Add Task popup.
 *
 * @param {HTMLElement} popup - The popup element.
 */
function renderPopUp(popup) {
    // HTML content for the popup
    popup.innerHTML = /*html*/`
        <!-- Popup content here -->
    `;
}

/**
 * Closes the Add Task popup and resets the task ID.
 */
function closePopup() {
    ID = -1;
    let body = document.getElementById('body');
    let popup = document.getElementById('popup-background');
    popup.classList.add('d-none');
    body.classList.remove('overflow-hidden');
}

/**
 * Prevents the popup from closing when clicking on it.
 *
 * @param {Event} event - The click event.
 */
function doNotClose(event) {
    event.stopPropagation();
}
