let subtasks = [];
let taskContactList = [];
let prioForTask = "";
let statusTask = "";
let categoryForTask = "";
let firstnames = [];
let lastnames = [];
let colorsForTask = [];
let names = [];

/**
 * Loads functions for implementing the header and loads tasks an users.
 */
async function init() {
    await includeHTML();
    await loadUsers();
    await loadAllTasks();
    await initHeader();
}


/**
 * loads users from server and names(=contacts)
 */
async function loadUsers() {
    users = JSON.parse(await getItem('users'));
    namesForTask = JSON.parse(await getItem('names'));
}


/**
 * clears all values in the task form 
 * @param {string} event -The triggering event used to trigger the form clearing.
 */
function clearTask(event) {
    event.stopPropagation();
    clearAllInputs();   // empties all input-fields
    getTaskPrio('no'); // sets the clicked prio colors to unclicked colors
    clearRedBorder();
    removePrioAlert();
    clearContactList();
}

/**
 * Clears all input fields.
 */
function clearAllInputs() {
    document.getElementById('add_task_title').value = '';
    document.getElementById('add_task_input_subtask').value = '';
    document.getElementById('add_task_description').value = '';
    document.getElementById('add_task_category_select').value = '';
    document.getElementById('add_task_input_date').value = '';
    document.getElementById('show-subtasks').innerHTML = '';
}

/**
 * Removes all red borders from all rendered input fields.
 */
function clearRedBorder() {
    let title = document.getElementById('add_task_title');
    let description = document.getElementById('add_task_description');
    let date = document.getElementById('add_task_input_date');
    removeRedBorder(title, 'title');
    removeRedBorder(description, 'description');
    removeRedBorder(date, 'date');
}

/**
 * Checks the task's priority and adjusts the background based on the assigned priority.
 * @param {string} prio - The priority assigned to the task (e.g., 'high', 'medium', 'low').
 */
function getTaskPrio(prio) {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    if (prio === 'urgent' || prio === 'Urgent') {
        prioColorRed(urgent, medium, low);
        prioForTask = 'Urgent';
    }
    if (prio === 'medium' || prio === 'Medium') {
        prioColorOrange(urgent, medium, low);
        prioForTask = 'Medium';
    }
    if (prio === 'low' || prio === 'Low') {
        prioColorGreen(urgent, medium, low);
        prioForTask = 'Low';
    }
    if (prio === 'no') {
        noPrioColor(urgent, medium, low);
    }
}

/**
 * Empties the contact list that has been chosen for assignment.
 */
function clearContactList() {
    let contactList = document.getElementById('selected-contacts');
    contactList.innerHTML = '';
}

/**
 * Changes the color of the priority symbol to red based on the selected priority.
 * @param {string} urgent - The selected priority value ('urgent', 'medium', 'low').
 */
function prioColorRed(urgent, medium, low) {
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the color of the priority symbol to orange.
 *
 * @param {HTMLElement} urgent - The urgent element.
 * @param {HTMLElement} medium - The medium element.
 * @param {HTMLElement} low - The low element.
 */
function prioColorOrange(urgent, medium, low) {
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the color of the priority symbol to green.
 *
 * @param {HTMLElement} urgent - The urgent element.
 * @param {HTMLElement} medium - The medium element.
 * @param {HTMLElement} low - The low element.
 */
function prioColorGreen(urgent, medium, low) {
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}

/**
 * Removes all colors of priorities.
 *
 * @param {HTMLElement} urgent - The urgent element.
 * @param {HTMLElement} medium - The medium element.
 * @param {HTMLElement} low - The low element.
 */
function noPrioColor(urgent, medium, low) {
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Adds new Subtasks under subtask-field.
 */
function checkNewSubtask() {
    const newSubtask = document.getElementById('add_task_input_subtask').value;
    let input = document.getElementById('add_task_input_subtask');
    if (newSubtask == '') {
        renderAlertBorder(input);
    } else if (subtasks.length >= 3) {
        alertMax3Subtasks();
    } else {
        addNewSubtask(newSubtask, input);
    }
}

/**
 * Checks if the length of subtasks is max. 3, otherwise gives an alert.
 *
 * @param {Array} subtask - An array of subtasks.
 */
function checkSubtasks(subtask) {
    subtasks = subtask;
    if (subtask.length >= 3) {
        alertMax3Subtasks()
    } else {
        for (let i = 0; i < subtasks.length; i++) {
            let element = subtasks[i];
            renderSubtaskEdit(element, i);
        }
    }
}

/**
 * If the input has no value, rendering a red border and warning text in the subtask area.
 *
 * @param {HTMLElement} input - The input element.
 */
function renderAlertBorder(input) {
    input.classList.add('red-border');
    let warningTxt = document.getElementById('red-warning-txt');
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">Please fill in a title!</span>
    `;
}

/**
 * Opens an alert, in the case of already 3 subtasks existing.
 */
function alertMax3Subtasks() {
    let warningTxt = document.getElementById('red-warning-txt');
    warningTxt.innerHTML = /*html*/`
        <span class "warning-text-subtask">Maximum 3 Subtasks !!</span>
    `;
}

/**
 * Adds the new subtask and removes the red warning alert.
 *
 * @param {string} newSubtask - The new subtask text.
 * @param {HTMLElement} input - The input element.
 */
function addNewSubtask(newSubtask, input) {
    let warningTxt = document.getElementById('red-warning-txt');
    warningTxt.innerHTML = '';
    subtasks.push(newSubtask);
    renderSubtask(newSubtask);
    input.classList.remove('red-border');
    input.value = '';
}

/**
 * Defines the value of i.
 *
 * @param {number} i - The value of i.
 */
function renderSubtask(newSubtask) {
    let currentSubtasks = document.getElementById('show-subtasks');
    let i = subtasks.length - 1;
    currentSubtasks.innerHTML += renderSubtasksHTML(newSubtask, i);
}

/**
 * Renders the subtask edit.
 *
 * @param {string} element - The element to edit.
 * @param {number} i - The value of i.
 */
function renderSubtaskEdit(element, i) {
    let currentSubtasks = document.getElementById('show-subtasks');
    currentSubtasks.innerHTML += renderSubtasksHTML(element, i);
}

/**
 * Renders the subtasks.
 *
 * @param {string} newSubtask - The new subtask text.
 * @param {number} i - The value of i.
 * @returns {string} - HTML representation of the subtask.
 */
function renderSubtasksHTML(newSubtask, i) {
    return /*html*/`
    <div id="new-subtask${i}">
        <div class="new-subtask" onmouseover="editSubtaskIcons(${i})" onmouseout="removeEditSubtaskIcons(${i})">
            <div class="subtask-dot-newsub-container">
                <img src="../img/dot.svg" alt="Dot">
                <span id="subtask-text${i}">${newSubtask}</span>
            </div>
            <div class="subtask-edit-delete-container">
                <img class="subtask-edit d-none" id="subtask-edit${i}" onclick="editSubtask(${i}, '${newSubtask}')" src="../img/pencil.svg" alt="edit">
                <img class="subtask-edit d-none" id="subtask-delete${i}" onclick="deleteSubtask(${i})" src="../img/trash.svg" alt="delete">
            </div>
        </div>
    </div>
    `;
}

/**
 * Opens a new input to edit the clicked subtask.
 *
 * @param {number} i - The value of i.
 * @param {string} newSubtask - The new subtask text.
 */
function editSubtask(i, newSubtask) {
    let currentSubtask = document.getElementById(`new-subtask${i}`);
    currentSubtask.innerHTML = editSubtaskHTML(i, newSubtask);

    let input = currentSubtask.querySelector(`#edit-subtask-input${i}`);
    input.setSelectionRange(newSubtask.length, newSubtask.length);   // sets the autofocus after the input.value
}

/**
 * Renders the edited Subtasks.
 *
 * @param {number} i - The value of i.
 * @param {string} newSubtask - The new subtask text.
 * @returns {string} - HTML representation of the edited subtask.
 */
function editSubtaskHTML(i, newSubtask) {
    return /*html*/`
    <div class="edit-subtask-line">
        <input type="text" class="edit-subtask-input" id="edit-subtask-input${i}" value="${newSubtask}" autofocus>
        <div class="edit-subtask-imgages">
            <img src="/img/trash.svg" alt="delete" onclick="deleteSubtask(${i})">
            <img src="/img/check-lg.svg" alt="confirm" onclick="confirmSubtask(${i})">
        </div>
    </div>
    `;
}

/**
 * Deletes the chosen subtask.
 *
 * @param {number} i - The value of i.
 */
function deleteSubtask(i) {
    let subtask = document.getElementById(`new-subtask${i}`);
    subtasks.length--;
    subtask.remove();
    if (subtasks) {
        subtasks.splice(i, 1);
        if (checkbox[i] == true) {
            subtasksClosed = subtasksClosed - 1;
        }
        checkbox.splice(i, 1);
    }
}

/**
 * Saves the edited subtask.
 *
 * @param {number} i - The value of i.
 */
function confirmSubtask(i) {
    let editedSubtask = document.getElementById(`edit-subtask-input${i}`).value;
    let currentSubtask = document.getElementById(`new-subtask${i}`);
    currentSubtask.innerHTML = renderSubtasksHTML(editedSubtask, i);
}

/**
 * Shows the editable subtask icons.
 *
 * @param {number} i - The value of i.
 */
function editSubtaskIcons(i) {
    let edit = document.getElementById(`subtask-edit${i}`);
    let subtaskdelete = document.getElementById(`subtask-delete${i}`);
    edit.style.display = "block";
    subtaskdelete.style.display = "block";
}

/**
 * Removes the editable subtask icons.
 *
 * @param {number} i - The value of i.
 */
function removeEditSubtaskIcons(i) {
    let edit = document.getElementById(`subtask-edit${i}`);
    let subtaskdelete = document.getElementById(`subtask-delete${i}`);
    edit.style.display = "none";
    subtaskdelete.style.display = "none";
}

/**
 * Sets the current day as minimum for the calendar.
 */
function setDateToday() {
    let dateInput = document.getElementById('add_task_input_date');
    let today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
}

/**
 * Toggles the dropdown menu of assign to or category.
 *
 * @param {string} index - The index to toggle.
 */
function openDropdownMenuIndex(index) {
    openDropdownMenu(index);
    if (index.includes('contact')) {
        taskContactList = [];
        colorsForTask = [];
        handleContactSelection();
    }
}

/**
 * Opens the category dropdown menu in case of editing the task.
 *
 * @param {string} index - The index to open the dropdown menu.
 * @param {string} category - The category to set.
 */
async function openDropdownMenuEditCategory(index, category) {
    openDropdownMenu(index);
    if (index.includes('category')) {
        handleCategoryChange(category);
    }
}

/**
 * Opens the dropdown menu to show the chosen contacts in a task.
 *
 * @param {string} index - The index to open the dropdown menu.
 * @param {Array} firstNames - An array of first names.
 * @param {Array} lastNames - An array of last names.
 * @param {Array} colors - An array of colors.
 */
async function openDropdownMenuEdit(index, firstNames, lastNames, colors) {
    await loadAllTasks();
    openDropdownMenu(index);
    handleContactSelection();
    addDoneSignToSquareContactEdit(firstNames, lastNames, colors);
}

/**
 * General function to toggle the dropdown menu for contacts or category.
 *
 * @param {string} index - The index to toggle the dropdown menu.
 */
function openDropdownMenu(index) {
    let dropdownMenu = document.getElementById(`add_task_${index}_select`);
    dropdownMenu.classList.toggle('d-block');
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('border-radius');
    toggleArrowDropdownMenu(index);
}

/**
 * Animation of the open/close arrow for the dropdown menu.
 *
 * @param {string} index - The index to toggle the arrow.
 */
function toggleArrowDropdownMenu(index) {
    let arrow = document.getElementById(`arrow-${index}`);
    arrow.classList.toggle('toggle-arrow-open');
}

/**
 * Fills in the chosen category.
 *
 * @param {string} liElement - The list element to set the category.
 */
function handleCategoryChange(liElement) {
    let chosenCategory = document.getElementById('task-category');
    categoryForTask = liElement;
    chosenCategory.innerHTML = liElement;
    openDropdownMenu('category');
}

/**
 * Organizes the selected contacts.
 */
function handleContactSelection() {
    let renderingDiv = document.getElementById('rendering-addTask-contacts');
    renderingDiv.innerHTML = "";
    for (let i = 0; i < namesForTask.length; i++) {
        processName(renderingDiv, namesForTask[i], i);
    }
}

/**
 * Processes the name from the task and handles it based on whether it contains a space or not.
 *
 * @param {HTMLElement} renderingDiv - The rendering div.
 * @param {object} nameForTask - The name for the task.
 * @param {number} index - The value of i.
 */
function processName(renderingDiv, nameForTask, index) {
    let name = nameForTask['name'];
    let color = nameForTask['color'];
    let indexOfSpace = name.indexOf(" ");

    if (indexOfSpace !== -1) {
        handleNameWithSpace(renderingDiv, name, indexOfSpace, index, color);
    } else {
        handleNameWithoutSpace(renderingDiv, name, index, color);
    }
}


/**
 * Handles names that contain a space. It splits the name into first and last names and then renders and displays initials.
 *
 * @param {HTMLElement} renderingDiv - The rendering div.
 * @param {string} name - The full name.
 * @param {number} indexOfSpace - The index of the space in the name.
 * @param {number} index - The value of i.
 * @param {string} color - The color for the initials circle.
 */
function handleNameWithSpace(renderingDiv, name, indexOfSpace, index, color) {
    let firstname = name.slice(0, indexOfSpace);
    let lastname = name.slice(indexOfSpace + 1);

    renderAndDisplayInitials(renderingDiv, firstname, lastname, index, color);
}

/**
 * Handles names that do not contain a space. It considers the whole name as the first name and then renders and displays initials.
 *
 * @param {HTMLElement} renderingDiv - The rendering div.
 * @param {string} name - The full name.
 * @param {number} index - The value of i.
 * @param {string} color - The color for the initials circle.
 */
function handleNameWithoutSpace(renderingDiv, name, index, color) {
    let firstname = name;
    let lastname = "";

    renderAndDisplayInitials(renderingDiv, firstname, lastname, index, color);
}

/**
 * Renders contacts in add task and displays initials. It also adds first and last names to their respective arrays.
 *
 * @param {HTMLElement} renderingDiv - The rendering div.
 * @param {string} firstname - The first name.
 * @param {string} lastname - The last name.
 * @param {number} index - The value of i.
 * @param {string} color - The color for the initials circle.
 */
function renderAndDisplayInitials(renderingDiv, firstname, lastname, index, color) {
    renderingDiv.innerHTML += renderContactsInAddTask(firstname, lastname, index, color);

    displayInitials(firstname, lastname, index, color);

    firstnames.push(firstname);
    lastnames.push(lastname);
}

/**
 * Renders the contact list in add task when the menu is open.
 *
 * @param {string} firstname - The first name.
 * @param {string} lastname - The last name.
 * @param {number} i - The value of i.
 * @param {string} color - The color for the initials circle.
 * @returns {string} - HTML representation of the contact list item.
 */
function renderContactsInAddTask(firstname, lastname, i, color) {
    return /*html*/`
    <li id="listItem${i}" onclick="addDoneSignToSquareContact(this, ${i}, '${color}')">
        <div class="assign-to-li-element" id="assign-to-li-element">
            <div id="initials-circle${i}" class="initials-circle"></div>
            <div class="names"><span id="firstname${i}">${firstname}</span><span id="lastname${i}">${lastname}</span></div>
        </div>
        <img src="/img/checkbox.png" class="checkbox-contact-add-task" id="checkbox-contact">
    </li>    
    `;
}

/**
 * Gives a done sign in the checkbox of selected contacts in the contact list.
 *
 * @param {HTMLElement} listItem - The list item element.
 * @param {number} i - The value of i.
 * @param {string} color - The color for the contact.
 */
function addDoneSignToSquareContact(listItem, i, color) {
    let checkBox = listItem.querySelector('.checkbox-contact-add-task');
    if (checkBox.src.includes('checkbox')) {
        designSelectedContact(listItem, checkBox);
        taskContactList.push(i);
        colorsForTask.push(color);
    } else {
        removeSelectedContactDesign(listItem, checkBox);
        removeSelectedContactAssign(i);
    }
}

/**
 * Adds a done sign to square contact edit.
 *
 * @param {Array} firstNames - An array of first names.
 * @param {Array} lastNames - An array of last names.
 * @param {Array} color - An array of colors.
 */
function addDoneSignToSquareContactEdit(firstNames, lastNames, color) {
    for (let i = 0; i < firstnames.length; i++) {
        processNameInList(firstNames, lastNames, color, i);
    }
}

/**
 * Processes each name in the list.
 *
 * @param {Array} firstNames - An array of first names.
 * @param {Array} lastNames - An array of last names.
 * @param {Array} color - An array of colors.
 * @param {number} index - The value of i.
 * @param {string} elementText - The text content of an element.
 * @param {string} elementTextlast - The text content of an element.
 */
function processNameInList(firstNames, lastNames, color, index) {
    let elementText = getElementText(`firstname${index}`);
    let elementTextlast = getElementText(`lastname${index}`);

    checkAndDesignContact(firstNames, lastNames, color, index, elementText, elementTextlast);
}

/**
 * Gets the text content of an element by its ID.
 *
 * @param {string} elementID - The ID of the element.
 * @returns {string} - The text content of the element.
 */
function getElementText(elementID) {
    return document.getElementById(elementID).textContent;
}

/**
 * Checks if a name is in the list and designs the contact accordingly.
 *
 * @param {Array} firstNames - An array of first names.
 * @param {Array} lastNames - An array of last names.
 * @param {Array} color - An array of colors.
 * @param {number} index - The value of i.
 * @param {string} elementText - The text content of an element.
 * @param {string} elementTextlast - The text content of an element.
 */
function checkAndDesignContact(firstNames, lastNames, color, index, elementText, elementTextlast) {
    for (let i = 0; i < firstNames.length; i++) {
        if (firstNames[i] === elementText && lastNames[i] === elementTextlast) {
            designContact(index);
            taskContactList.push(index);
            colorsForTask.push(color[i]);
        }
    }
}

/**
 * Designs a selected contact.
 *
 * @param {number} index - The value of i.
 */
function designContact(index) {
    let listItem = document.getElementById(`listItem${index}`);
    let checkBox = listItem.querySelector('.checkbox-contact-add-task');

    designSelectedContact(listItem, checkBox);
}

/**
 * Designs a contact which is selected.
 *
 * @param {HTMLElement} listItem - The list item element.
 * @param {HTMLElement} checkBox - The checkbox element.
 */
function designSelectedContact(listItem, checkBox) {
    checkBox.src = '/img/Group 19.png';
    listItem.classList.add('darkblue');
    listItem.classList.add('no-hover');
    checkBox.classList.add('white-img');
}

/**
 * Removes the design of a dis-selected contact.
 *
 * @param {HTMLElement} listItem - The list item element.
 * @param {HTMLElement} checkBox - The checkbox element.
 */
function removeSelectedContactDesign(listItem, checkBox) {
    checkBox.src = '/img/checkbox.png';
    listItem.classList.remove('darkblue');
    listItem.classList.remove('no-hover');
    checkBox.classList.remove('white-img');
}

/**
 * Deletes a selected contact from the array taskContactList.
 *
 * @param {number} i - The value of i.
 */
function removeSelectedContactAssign(i) {
    let index = taskContactList.indexOf(i);
    if (index > -1) {
        taskContactList.splice(index, 1);
        colorsForTask.splice(index, 1);
    }
}

/**
 * Adds selected contacts in the rendering div under the menu.
 */
function addChosenContactsToTask() {
    let renderingDiv = document.getElementById('selected-contacts');
    renderingDiv.innerHTML = '';
    for (let i = 0; i < taskContactList.length; i++) {
        let index = taskContactList[i];
        let chosenUser = namesForTask[index];
        renderingDiv.innerHTML += renderChosenContactsToTaskHTML(chosenUser);
    }
    openDropdownMenu('contact');
}

/**
 * Shows the selected contacts when the dropdown menu 'contacts' is closed.
 *
 * @param {object} chosenUser - The selected user.
 * @returns {string} - HTML code for the initials circle.
 */
function renderChosenContactsToTaskHTML(chosenUser) {
    // Gets the last name of the chosen user.
    let lastName = getLastName(chosenUser);

    if (lastName == undefined) {
        // If the last name is not defined, render initials with the first letter of the name.
        return renderInitialsCircle(chosenUser, chosenUser['name'][0].toUpperCase());
    } else {
        // Render initials with the first letter of the name and the first letter of the last name.
        return renderInitialsCircle(chosenUser, chosenUser['name'][0].toUpperCase() + lastName[0].toUpperCase());
    }
}

/**
 * Gets the last name from a user object.
 *
 * @param {object} user - The user object.
 * @returns {string} - The last name of the user.
 */
function getLastName(user) {
    return user['name'].split(' ')[1];
}

/**
 * Renders an initials circle with a given color and initials.
 *
 * @param {object} user - The user object.
 * @param {string} initials - The user's initials.
 * @returns {string} - HTML code for the initials circle.
 */
function renderInitialsCircle(user, initials) {
    return /*html*/`
        <div class="initials-circle" style="background-color: ${user['color']}">
            ${initials}
        </div>
    `;
}

/**
 * Displays the initials.
 *
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @param {number} i - Index.
 * @param {string} color - The background color.
 */
function displayInitials(firstname, lastname, i, color) {
    let circle = document.getElementById(`initials-circle${i}`);
    circle.style.backgroundColor = color;
    circle.innerHTML = getInitials(firstname, lastname);
}

/**
 * Gets initials from the first- and lastname.
 *
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @returns {string} - The user's initials.
 */
function getInitials(firstname, lastname) {
    if (lastname == "") {
        // If no last name, use the first letter of the first name as initials.
        let initials = firstname[0];
        return initials.toUpperCase();
    }
    else {
        // Combine the first letter of the first name and last name as initials.
        let initials = firstname[0] + lastname[0];
        return initials.toUpperCase();
    }
}

/**
 * Prevents the popup field from closing when clicking on it.
 *
 * @param {Event} event - The click event.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Checks all required fields.
 */
function checkAllRequiredFields() {
    let id = "";

    if (ID !== -1) {
        // If ID is not -1, assign it to id.
        id = ID;
    }

    checkInputValues(id);
    checkNoPrioColorChosen();
}

/**
 * Gives an alert when no priority is chosen and the Create Task button is clicked.
 */
function checkNoPrioColorChosen() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');

    if (!urgent.classList.contains('prio-btn-urgent-clicked') &&
        !medium.classList.contains('prio-btn-medium-clicked') &&
        !low.classList.contains('prio-btn-low-clicked')) {
        renderPrioAlert();
    } else {
        removePrioAlert();
    }
}

/**
 * Renders the alert when no priority is chosen.
 */
function renderPrioAlert() {
    let warningTxt = document.getElementById(`red-warning-txt-prio`);
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">Please select a priority!</span>
    `;
}

/**
 * Removes the priority alert.
 */
function removePrioAlert() {
    let warningTxt = document.getElementById(`red-warning-txt-prio`);
    warningTxt.innerHTML = '';
}

/**
 * Checks if the input fields title, description, and date have values.
 *
 * @param {string} id - The task ID.
 */
function checkInputValues(id) {
    let title = document.getElementById('add_task_title');
    let description = document.getElementById('add_task_description');
    let date = document.getElementById('add_task_input_date');

    ifInputValueEmpty(title, description, date);
    ifInputValueFilled(title, description, date, id);
}

/**
 * For the case that an input is empty, renders the warning text and renders a red border around the empty input.
 *
 * @param {HTMLInputElement} title - The task title input.
 * @param {HTMLInputElement} description - The task description input.
 * @param {HTMLInputElement} date - The task date input.
 */
function ifInputValueEmpty(title, description, date) {
    if (title.value == '') {
        renderRedBorder(title, 'title');
    }
    if (description.value == '') {
        renderRedBorder(description, 'description');
    }
    if (date.value == '') {
        renderRedBorder(date, 'date');
    }
}

/**
 * For the case that an input is filled, removes the red border from the filled input.
 *
 * @param {HTMLInputElement} title - The task title input.
 * @param {HTMLInputElement} description - The task description input.
 * @param {HTMLInputElement} date - The task date input.
 * @param {string} id - The task ID.
 */
function ifInputValueFilled(title, description, date, id) {
    if (title.value !== '') {
        removeRedBorder(title, 'title');
    }
    if (description.value !== '') {
        removeRedBorder(description, 'description');
    }
    if (date.value !== '') {
        removeRedBorder(date, 'date');
    }
    if (title.value !== '' && description.value !== '' && date.value !== '') {
        addNewTasktoBoard(id);
    }
}

/**
 * Renders the red border around empty inputs.
 *
 * @param {HTMLInputElement} input - The input field.
 * @param {string} string - Identifier for the input field.
 */
function renderRedBorder(input, string) {
    input.classList.add('red-border');
    let warningTxt = document.getElementById(`red-warning-txt-${string}`);
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">This field is required!</span>
    `;
}

/**
 * Removes a red border, if the input has a value.
 *
 * @param {HTMLInputElement} input - The input field.
 * @param {string} string - Identifier for the input field.
 */
function removeRedBorder(input, string) {
    input.classList.remove('red-border');
    let warningTxt = document.getElementById(`red-warning-txt-${string}`);
    warningTxt.innerHTML = '';
}

/**
 * Adds a new task to the board.
 *
 * @param {string} id - The task ID.
 */
function addNewTasktoBoard(id) {
    let taskDetails = getTaskDetails();
    removeExistingTask(id);
    setDefaultValues(taskDetails);
    checkTaskContactList();
    createAndAddNewTask(taskDetails);
    resetValues();
}

/**
 * Gets the details of a task from the input fields.
 *
 * @returns {object} - An object containing task details.
 */
function getTaskDetails() {
    return {
        title: document.getElementById('add_task_title').value,
        description: document.getElementById('add_task_description').value,
        date: document.getElementById('add_task_input_date').value,
        checkbox: checkbox,
        subtasksClosed: subtasksClosed,
    };
}

/**
 * Sets default values for checkbox and subtasksClosed if they are not set.
 *
 * @param {object} taskDetails - The task details object.
 */
function setDefaultValues(taskDetails) {
    if (taskDetails.checkbox.length == 0) {
        taskDetails.checkbox = Array(subtasks.length).fill(false);
    }

    if (taskDetails.subtasksClosed == -1) {
        taskDetails.subtasksClosed = 0;
    }
}

/**
 * Creates a new task and adds it to the list.
 *
 * @param {object} taskDetails - The task details object.
 */
function createAndAddNewTask(taskDetails) {
    let newTask = {
        'id': allTasks.length,
        'Due date': taskDetails.date,
        'status': statusTask,
        'category': categoryForTask,
        'titel': taskDetails.title,
        'description': taskDetails.description,
        'subtasks': subtasks,
        'checkbox': taskDetails.checkbox,
        'subtasks-closed': taskDetails.subtasksClosed,
        'colors': colorsForTask,
        'arrangersFirstName': taskContactList.map(i => firstnames[i]),
        'arrangersLastName': taskContactList.map(i => lastnames[i]),
        'priority': prioForTask
    }

    allTasks.push(newTask);
    setItem('allTasks', JSON.stringify(allTasks));
}

// Removes an existing task from the list.
function removeExistingTask(id) {
    if (id !== "" && id !== undefined) {
        indexToRemove = allTasks.findIndex(task => task.id === id);
        allTasks.splice(indexToRemove, 1);
        ID = -1;
    }
}

// Sets default values for status and category.
function setDefaultValues() {
    if (statusTask === "" || statusTask === undefined) {
        statusTask = 'To do';
    }
}

// Resets the values after a new task has been added.
function resetValues() {
    firstnames = [];
    lastnames = [];
    checkboxForTask = []
    statusTask = "";
    subtasksClosedForTask = -1;
    animationTaskaddedToBoard();
}

// Checks for duplicates in the taskContactList array and removes them.
function checkTaskContactList() {
    taskContactList = new Set(taskContactList);
    taskContactList = [...taskContactList];
}

// Adds the 'show' class to animate the container.
function animationTaskaddedToBoard() {
    const container = document.getElementById('added-to-board-animation');
    container.classList.add('show');

    setTimeout(() => {                      
        container.classList.remove('show');
        window.location.href = '/html/board.html';
    }, 2000);
}




