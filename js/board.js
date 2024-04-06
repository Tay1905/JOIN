let allTasks = []

let currentDraggingElement = '';
let ToDoRow = false;
let InProgressRow = false;
let AwaitFeedbackRow = false;
let DoneRow = false;
let containerIndex = 0;
let rightIDSave = -1;

async function initBoard(){
    await includeHTML();
    await loadUsersBoard();
    await loadAllTasks();
    await initHeader();
    updateID();
    updateBoard();
}

/**
 * Update task IDs to maintain consistency after deletions.
 * This function reassigns IDs to tasks after a task is deleted.
 */
function updateID() {
    for (let index = 0; index < allTasks.length; index++) {
        let task = allTasks[index];
        task['id'] = index;
    }
    // Save the updated task list to local storage.
    setItem('allTasks', JSON.stringify(allTasks));
}



function updateBoard(){
    renderToDoTasks();
    renderInProgressTasks();
    renderAwaitFeedbackTasks();
    renderDoneTasks();
}

async function loadUsersBoard() {
    names = JSON.parse(await getItem('names'));
}

async function loadAllTasks(){
    allTasks = JSON.parse(await getItem('allTasks'));
}


function renderToDoTasks(){
    let ToDos = allTasks.filter(t => t['status'] == 'To do');
    let status = 'To do';

    document.getElementById('To do').innerHTML = '';

    for (let i = 0; i < ToDos.length; i++) {
        let element = ToDos[i];
        let id = element['id']

        document.getElementById('To do').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
    controllForEmptyRow(ToDos, status);
}

function renderInProgressTasks(){
    let InProgresses = allTasks.filter(t => t['status'] == 'In progress');
    let status = 'In progress';

    document.getElementById('In progress').innerHTML = '';

    for (let i = 0; i < InProgresses.length; i++) {
        let element = InProgresses[i];
        let id = element['id']

        document.getElementById('In progress').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
    controllForEmptyRow(InProgresses, status);
}

function renderAwaitFeedbackTasks(){
    let Awaitfeedback = allTasks.filter(t => t['status'] == 'Await feedback');
    let status = 'Await feedback';

    document.getElementById('Await feedback').innerHTML = '';

    for (let i = 0; i < Awaitfeedback.length; i++) {
        let element = Awaitfeedback[i];
        let id = element['id']

        document.getElementById('Await feedback').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
    controllForEmptyRow(Awaitfeedback, status);
}

function renderDoneTasks(){
    let done = allTasks.filter(t => t['status'] == 'Done');
    let status = 'Done';

    document.getElementById('Done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        let element = done[i];
        let id = element['id']

        document.getElementById('Done').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
    controllForEmptyRow(done, status);
}

/**
 * Checks if a row has no tasks and displays an empty row message.
 *
 * @param {Array} filter - The filtered list of tasks.
 * @param {string} status - The status of the row (e.g., 'To do', 'In progress', etc.).
 */
function controllForEmptyRow(filter, status) {
    if (filter.length === 0) {
        // Clear the content of the row and display an empty task message.
        document.getElementById(`${status}`).innerHTML = '';
        document.getElementById(`${status}`).innerHTML += emptyTaskRow(status);
    }
}

function emptyTaskRow(status){
    return /*html*/`
       <div class="empty-task-container" id="emptyTaskContainer">
            <div class = "empty-text">No tasks ${status}</div>
        </div> 
    `;
}

function createTaskBoardHTML(element, i){
    return /*html*/`
        <div onclick="showTaskDetails(${i})" id="task-card${i}" class="task-card" draggable="true" ondragstart="startDragging(${i})">
            <div class="inner-card">
                <div id="cardLabel${i}" class="cardLabel">${element['category']}</div>
                <div class="titel-description-container">
                    <div class=titel id="titel${i}">${element['titel']}</div>
                    <div class="description">${element['description']}</div>
                </div>
                <div id="progressbar-subtaskcounter-container${i}" class="progressbar-subtaskcounter-container">
                    <div class="progress-bar-container">
                        <div id="progressBar${i}" class="progress-bar" style="width:0%;" id="progressbarToDo"></div>
                    </div>
                    <div class="subtask-counter" id="subtaskCounter${i}"></div>
                </div>
                <div class="arranger-priority">
                    <div id="ArrangersContainer${i}" class="arrangers-container"></div>
                    <div class="priority-container">
                        <div class="priority"><img id="priorityImg${i}" src="" alt="prio"></div>
                    </div>
                </div>
            </div>
        </div>   
    `;
}

/**
 * Renders all individual elements of a task in the board overview (not the detail view).
 *
 * @param {object} element - The task object to render.
 * @param {number} id - The ID of the task.
 */
function renderCardElements(element, id) {
    createCategoryBackground(element, id);
    createProgressbar(element, id);
    createPriority(element, id);
    createArrangers(element, id);
    createSubtaskCounter(element, id);
}

/**
 * Sets the currently dragged element.
 *
 * @param {number} id - The ID of the currently dragged element.
 */
function startDragging(id) {
    currentDraggingElement = id;
}

/**
 * Allows dropping elements.
 *
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Determines the target row for a task to be moved to and updates the task's status.
 *
 * @param {string} status - The status to which the task will be moved (e.g., 'To do', 'In progress', etc.).
 */
function moveTo(status) {
    allTasks[currentDraggingElement]['status'] = status;
    setItem('allTasks', JSON.stringify(allTasks));
    updateBoard();
}

/**
 * Creates a view of the employees involved in the task.
 *
 * @param {object} element - The task object.
 * @param {number} i - The task's ID.
 */
function createArrangers(element, i) {
    document.getElementById(`ArrangersContainer${i}`).innerHTML = '';

    for (let index = 0; index < element['arrangersFirstName'].length; index++) {
        let firstName = element['arrangersFirstName'][index].charAt(0).toUpperCase();
        let lastName = element['arrangersLastName'][index].charAt(0).toUpperCase();
        let arranger = firstName + lastName;
        containerIndex++;

        document.getElementById(`ArrangersContainer${i}`).innerHTML += createTaskBoardArrangers(arranger, containerIndex);

        color = element['colors'][index];
        let profileCard = document.getElementById(`profileCard${containerIndex}`);
        profileCard.style.backgroundColor = color;
    }
}

function createTaskBoardArrangers(arranger, index){
    return /*html*/`
       <div id="profileCard${index}" class="profile-AS profile-card">${arranger}</div> 
    `;
}

/**
 * Creates a subtask counter indicating how many subtasks are completed out of the total.
 *
 * @param {object} element - The task object.
 * @param {number} id - The task's ID.
 */
function createSubtaskCounter(element, id) {
    document.getElementById(`subtaskCounter${id}`).innerHTML = '';

    let allSubtasksNumber = element['subtasks'].length;
    let closedSubtasksNumber = element['subtasks-closed'];
    closedSubtasksNumber++;

    document.getElementById(`subtaskCounter${id}`).innerHTML = /*html*/`
        ${closedSubtasksNumber}/${allSubtasksNumber} Subtasks
    `;
}

/**
 * Creates a progress bar for tracking the completion of subtasks.
 *
 * @param {object} element - The task object.
 * @param {number} i - The task's ID.
 */
function createProgressbar(element, i) {
    let allSubTask = element['subtasks'].length;
    let closedSubTasks = element['subtasks-closed'];
    closedSubTasks++;
    let width = closedSubTasks * 100 / allSubTask;
    let progressBar = document.getElementById(`progressBar${i}`);
    let progressBarContainer = document.getElementById(`progressbar-subtaskcounter-container${i}`);

    controllConditionsProgressbar(allSubTask, width, progressBar, progressBarContainer, closedSubTasks);
}

function controllConditionsProgressbar(allSubTask, width, progressBar, progressBarContainer, closedSubTasks){
    if(allSubTask == 0){
        progressBarContainer.style.display='none';
    }
    else if(closedSubTasks == 0){
        width=0;
    }
    else{
        progressBar.style.width = `${width}%`;
    }
}

/**
 * Creates a priority image based on the task's priority.
 *
 * @param {object} element - The task object.
 * @param {number} i - The task's ID.
 */
function createPriority(element, i) {
    let priority = element['priority'];
    let priorityImg = document.getElementById(`priorityImg${i}`);

    switch(priority) {
        case 'Urgent':
            priorityImg.src = "/img/Prio baja.svg";
            break;
        case 'Medium':
            priorityImg.src = "/img/Prio media.svg";
            break;
        case 'Low':
            priorityImg.src = "/img/Prio low.svg";
            break;
        default:
            priorityImg.classList.add('d-none');
    }
}

/**
 * Determines the background color for the category label.
 *
 * @param {object} element - The task object.
 * @param {number} i - The task's ID.
 */
function createCategoryBackground(element, i) {
    let category = element['category'];
    let cardLabel = document.getElementById(`cardLabel${i}`);

    switch(category) {
        case 'User Story':
            cardLabel.classList.add('user-story');
            break;
        case 'Technical Task':
            cardLabel.classList.add('technical-task');
    }
}

/**
 * Displays the detailed view for a task.
 *
 * @param {number} taskID - The ID of the task to display.
 */
function showTaskDetails(taskID) {
    let element = allTasks[taskID];
    let detailTaskContainer = document.querySelector('.detail-task-container');
    let dueDateValue = new Date(element['Due date']);
    detailTaskContainer.style.display = 'flex';

    document.getElementById('detailTask').innerHTML = '';
    document.getElementById('detailTask').innerHTML += createDetailHTML(element, dueDateValue, taskID);
    createCategoryBackgroundForDetail(element);
    createPriorityForDetail(element);
    createArrangersForDetail(element, taskID);
    createSubtasksForDetail(element, taskID);
}


function createDetailHTML(element, dueDateValue, taskID){
    return /*html*/`
    <div class="cardlabel-detail-close-container">
        <div id="cardLabelDetail" class="cardLabel-detail cardLabel"><span>${element['category']}</span></div>
        <div class="close-container">
            <img class="closeIcon" onclick="closeDetailTask()" src="/img/close.svg" alt="">
        </div>
    </div>
    <div class="detailTitel">${element['titel']}</div>
    <div class="detailDescription">${element['description']}</div>
    <div class="designation-container">
        <div class="designation-element">Due Date:</div>
        <div class="data-detail-element">${dueDateValue.toLocaleDateString()}</div>

    </div>
    <div class="designation-container">
        <div class="designation-element">Priority:</div> 
        <div class="priority-img-container">
            <div class="data-detail-element">${element['priority']}</div>
            <div><img id="prio-detail" src="" alt=""></div>
        </div>
    </div>
    <div class="arrangers-detail-container">
        <div class="arrangers-designation">Assigned To:</div>
        <div id="allArangersDetail"></div>
    </div>
    <div class="subtask-detail-container">
        <div class="designation-element">Subtasks</div>
        <div id="allSubtasks"></div>
    </div>
    <div class="edit-delete-container">
        <div onclick="deleteTask(${taskID})" onmouseenter="imgChangeDeleteEdit('deleteImg')" onmouseleave="imgChangeDeleteEditBack('deleteImg')" class="delete-container">
            <div class="delete-img"><img id="deleteImg" src="/img/delete.svg" alt=""></div>
            <div class="delete-text"><span>Delete</span></div>
        </div>
        <div><img class="vector-svg" src="/img/Vector 3.svg" alt=""></div>
        <div onclick="editTask(${taskID})" onmouseenter="imgChangeDeleteEdit('editImg')" onmouseleave="imgChangeDeleteEditBack('editImg')"  class="edit-container">
            <div class="delete-img"><img id="editImg" src="/img/edit.svg" alt=""></div>
            <div class="delete-text"><span>Edit</span></div>
        </div>
    </div>
    `;
}

/**
 * Deletes the specified task and updates the task list.
 *
 * @param {number} taskID - The ID of the task to be deleted.
 */
function deleteTask(taskID) {
    allTasks.splice(taskID, 1);
    setItem('allTasks', JSON.stringify(allTasks));
    closeDetailTask();
    initBoard();
}

/**
 * Creates the list of task assignees in the task detail view.
 *
 * @param {object} element - The task object.
 * @param {number} taskID - The ID of the task.
 */
function createArrangersForDetail(element, taskID) {
    document.getElementById('allArangersDetail').innerHTML = '';

    for (let index = 0; index < element['arrangersFirstName'].length; index++) {
        let firstNameSmall = element['arrangersFirstName'][index].charAt(0);
        let lastNameSmall = element['arrangersLastName'][index].charAt(0);
        let arrangerSmall = firstNameSmall + lastNameSmall;
        
        let firstNameLong = element['arrangersFirstName'][index] + ' ';
        let lastNameLong = element['arrangersLastName'][index];
        let arrangerLong = firstNameLong + lastNameLong;
        let color = element['colors'][index];

        document.getElementById(`allArangersDetail`).innerHTML += createTaskBoardArrangersDetail(arrangerSmall, arrangerLong, index);
        let avatar = document.getElementById(`avatar${index}`);
        avatar.style.backgroundColor = color;
    }
}

function createTaskBoardArrangersDetail(arrangerSmall, arrangerLong, index){
    return /*html*/`
        <div class="arranger-detail">
            <div class="avatar-div">
                <div id="avatar${index}" class="avatar">${arrangerSmall}</div>
            </div>
            <div>${arrangerLong}</div>
        </div>    
    `;
}

/**
 * Creates the list of subtasks in the task detail view.
 *
 * @param {object} element - The task object.
 * @param {number} taskID - The ID of the task.
 */
function createSubtasksForDetail(element, taskID) {
    document.getElementById('allSubtasks').innerHTML = '';

    for (let index = 0; index < element['subtasks'].length; index++) {
        let subtask = element['subtasks'][index];
        document.getElementById('allSubtasks').innerHTML += /*html*/`
            <div class="subtasks-check">
                <div class="subtasks-checkbox"><img onclick="changeCheckboxImg(${taskID}, ${index})" id="checkbox${index}" class="checkbox" src="" alt=""></div> 
                <div>${subtask}</div>
            </div>  
        `;
        CheckboxImg(taskID, index);
    }
}

/**
 * Creates the priority icon in the task detail view.
 *
 * @param {object} element - The task object.
 */
function createPriorityForDetail(element) {
    let priority = element['priority'];
    let priorityImg = document.getElementById(`prio-detail`);
    
    switch(priority) {
        case 'Urgent':
            priorityImg.src = "/img/Prio baja.svg";
            break;
        case 'Medium':
            priorityImg.src = "/img/Prio media.svg";
            break;
        case 'Low':
            priorityImg.src = "/img/Prio low.svg";
        }
}

/**
 * Updates the checkbox image in the task detail view based on whether the subtask is completed or open.
 *
 * @param {number} taskID - The ID of the task.
 * @param {number} index - The index of the subtask.
 */
function CheckboxImg(taskID, index) {
    let checkbox = allTasks[taskID]['checkbox'][index];
    let checkboxImg = document.getElementById(`checkbox${index}`);

    if (!checkbox) {
        checkboxImg.src = "/img/checkbox-empty.svg";
    } else if (checkbox) {
        checkboxImg.src = "/img/Group 19.png";
    }
}

function changeCheckboxImg(taskID, index){
    let element = allTasks[taskID];
    let checkbox = allTasks[taskID]['checkbox'][index];

    if(!checkbox){
        allTasks[taskID]['checkbox'][index] = true;
        element['subtasks-closed'] += 1;
    }
    else if(checkbox){
        allTasks[taskID]['checkbox'][index] = false;
        element['subtasks-closed'] -= 1;
    }

    CheckboxImg(taskID, index);
    updateBoard();
    setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * Closes the task detail view.
 */
function closeDetailTask() {
    let detailTaskContainer = document.querySelector('.detail-task-container');
    detailTaskContainer.style.display = 'none';
}

/**
 * Sets the background color of the category in the task detail view.
 *
 * @param {object} element - The task object.
 */
function createCategoryBackgroundForDetail(element) {
    let category = element['category'];
    let cardLabelDetail = document.getElementById(`cardLabelDetail`);

    switch(category) {
        case 'User Story':
            cardLabelDetail.classList.add('user-story');
            break;
        case 'Technical Task':
            cardLabelDetail.classList.add('technical-task');
    }
}

/**
 * Changes the image on hover to a plus image (over the rows).
 *
 * @param {string} imgElement - The ID of the image element.
 */
function imgChange(imgElement) {
    picture = document.getElementById(`${imgElement}`);
    picture.src = "/img/mein_svg(3).svg";
}

/**
 * Reverts the image to its original state on hover (over the rows).
 *
 * @param {string} imgElement - The ID of the image element.
 */
function imgChangeBack(imgElement) {
    picture = document.getElementById(`${imgElement}`);
    picture.src = "/img/Capa 1.svg";
}

/**
 * Changes the delete or edit image in the task detail view on hover.
 *
 * @param {string} img - The ID of the image element ('deleteImg' or 'editImg').
 */
function imgChangeDeleteEdit(img) {
    let id = document.getElementById(`${img}`);

    switch(img) {
        case 'deleteImg':
            id.src = "/img/hooverDelete.svg";
            break;
        case 'editImg':
            id.src = "/img/hooverEdit.svg";
            break;
    }
}

/**
 * Reverts the delete or edit image in the task detail view to its original state on hover.
 *
 * @param {string} img - The ID of the image element ('deleteImg' or 'editImg').
 */
function imgChangeDeleteEditBack(img) {
    let id = document.getElementById(`${img}`);

    switch(img) {
        case 'deleteImg':
            id.src = "/img/delete.svg";
            break;
        case 'editImg':
            id.src = "/img/edit.svg";
            break;
    }
}

/**
 * Searches for tasks based on title and description and updates the board view.
 */
function searchTask() {
    let searchingTask = document.getElementById('searchTaskInput').value.toLowerCase();
    ToDoRow = false;
    InProgressRow = false;
    AwaitFeedbackRow = false;
    DoneRow = false;
    if (searchingTask == "") {
        updateBoard();
    } else {
        emptyAll();
        searchForTask(searchingTask);
        controllForEmptyRowSearch();
    }
}

function searchForTask(searchingTask){
    for (let index = 0; index < allTasks.length; index++) {
        let rightTitel = allTasks[index]['titel'].toLowerCase();
        let rightDescription = allTasks[index]['description'].toLowerCase();
        let rightID = allTasks[index]['id'];
        
        if(rightTitel.includes(searchingTask) || rightDescription.includes(searchingTask)){
            rightIDSave = rightID;
            renderSearchingHTML(rightID);
        }
    }
}

/**
 * Empties all task rows on the board.
 */
function emptyAll() {
    document.getElementById('To do').innerHTML = '';
    document.getElementById('In progress').innerHTML = '';
    document.getElementById('Await feedback').innerHTML = '';
    document.getElementById('Done').innerHTML = '';
}

/**
 * Renders the HTML for the searched task based on its status.
 *
 * @param {number} rightID - The ID of the searched task.
 */
function renderSearchingHTML(rightID) {
    let status = allTasks[rightID]['status'];

    switch (status) {
        case 'To do':
            renderSearchingToDo(rightID);
            break;
        case 'In progress':
            renderSearchingInProgress(rightID);
            break;
        case 'Await feedback':
            renderSearchingAwaitFeedback(rightID);
            break;
        case 'Done':
            renderSearchingDone(rightID);
    }
}

function renderSearchingToDo(rightID){
    let ToDos = allTasks.filter(t => t['id'] == rightID);
    ToDoRow = true;

    for (let i = 0; i < ToDos.length; i++) {
        let element = ToDos[i];
        let id = element['id']

        document.getElementById('To do').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
}

function renderSearchingInProgress(rightID){
    let InProgress = allTasks.filter(t => t['id'] == rightID);
    InProgressRow = true;

    for (let i = 0; i < InProgress.length; i++) {
        let element = InProgress[i];
        let id = element['id']

        document.getElementById('In progress').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
}

function renderSearchingAwaitFeedback(rightID){
    let AwaitFeedback = allTasks.filter(t => t['id'] == rightID);
    AwaitFeedbackRow = true;

    for (let i = 0; i < AwaitFeedback.length; i++) {
        let element = AwaitFeedback[i];
        let id = element['id']

        document.getElementById('Await feedback').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
}

function renderSearchingDone(rightID){
    let Done = allTasks.filter(t => t['id'] == rightID);
    DoneRow = true;
    

    for (let i = 0; i < Done.length; i++) {
        let element = Done[i];
        let id = element['id']

        document.getElementById('Done').innerHTML += createTaskBoardHTML(element, id);
        renderCardElements(element, id);
    }
}

/**
 * Empties all task rows on the board.
 */
function emptyAll() {
    document.getElementById('To do').innerHTML = '';
    document.getElementById('In progress').innerHTML = '';
    document.getElementById('Await feedback').innerHTML = '';
    document.getElementById('Done').innerHTML = '';
}

function addEmptyTaskRowIfNeeded(rowCondition, elementId) {
    if(!rowCondition) {
        document.getElementById(elementId).innerHTML += emptyTaskRow(elementId);
    }
}

/**
 * Passes all the variables required to edit a task to the editing popup.
 *
 * @param {number} taskID - The ID of the task to be edited.
 */
function editTask(taskID){
    let element = allTasks[taskID];
    let id = element['id'];
    let titel = element['titel'];
    let description = element['description'];
    let dueDate = element['Due date'];
    let prio = element['priority'];
    let firstNames = element['arrangersFirstName'];
    let lastNames = element['arrangersLastName'];
    let colors = element['colors'];
    let status = element['status'];
    let category = element['category'];
    let checkbox = element['checkbox'];
    let subtasks = element['subtasks'];
    let subtasksClosed = element['subtasks-closed'];

    openAddTaskPopupEdit(id, titel, description, dueDate, prio, firstNames, lastNames, colors, status, category, checkbox, subtasks, subtasksClosed)
}