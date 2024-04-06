let deadlines = [];

async function init(){
    await includeHTML();
    await loadAllTasks();
    await loadCurrentUser();
    await initHeader();
    loadSummary();
    loadGreets();
}

async function loadAllTasks(){
    allTasks = JSON.parse(await getItem('allTasks'));
}

async function loadCurrentUser(){
    currentUser = await getItem('currentUser');
}

/**
 * Loads the summary by counting the number of tasks in different categories.
 */
function loadSummary(){
    // Count tasks in various categories.
    let toDos = allTasks.filter(t => t['status'] == 'To do').length;
    let dones = allTasks.filter(t => t['status'] == 'Done').length;
    let urgents = allTasks.filter(t => t['priority'] == 'Urgent').length;
    let allTaksCounter = allTasks.length;
    let inProgresses = allTasks.filter(t => t['status'] == 'In progress').length;
    let awaitFeedbacks = allTasks.filter(t => t['status'] == 'Await feedback').length;

    // Load the counts into the respective visualizations.
    loadTodosVision(toDos);
    loadDonesVision(dones);
    loadUrgentsVision(urgents);
    loadDeadlineVision();
    loadAllTasksVision(allTaksCounter);
    loadInProgressTasksVision(inProgresses);
    loadAwaitFeedbackVision(awaitFeedbacks);
}

function loadGreets(){
    let d = new Date();
    let hours = d.getHours();
    greetTime(hours);
    loadAccount();
}

function loadTodosVision(toDos){
    document.getElementById('toDo-vision').innerHTML = '';
    document.getElementById('toDo-vision').innerHTML += /*html*/`
        <div class="task-img"><img id="toDoImg" src="/img/Group 7.svg" alt=""></div>
        <div class="task-counter-container">
            <div class="task-counter">${toDos}</div>
            <div class="task-status">To-do</div>
        </div>
    `;
}

function loadDonesVision(dones){
    document.getElementById('done-vision').innerHTML = '';
    document.getElementById('done-vision').innerHTML += /*html*/`
        <div class="task-img"><img id="DoneImg" src="/img/doneVision.svg" alt=""></div>
        <div class="task-counter-container">
            <div class="task-counter">${dones}</div>
            <div class="task-status">Done</div>
        </div>
    `;
}

function loadUrgentsVision(urgents){
    document.getElementById('urgent-vision').innerHTML = '';
    document.getElementById('urgent-vision').innerHTML += /*html*/`
        <div class="task-img"><img src="/img/urgentVision.png" alt=""></div>
        <div class="task-counter-container">
            <div class="task-counter">${urgents}</div>
            <div class="task-status">Urgent</div>
        </div>
    `;
}

/**
 * Loads the next deadline from UrgentTasks and visualizes it.
 */
function loadDeadlineVision(){
    deadlines = [];
    let dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    let urgents = allTasks.filter(t => t['priority'] == 'Urgent');

    for (let index = 0; index < urgents.length; index++) {
        let dueDate = new Date(urgents[index]['Due date']);
        let formattedDate = dueDate.toLocaleDateString("en-US", dateOptions);
        deadlines.push(formattedDate);
    }

    deadlines.sort((a, b) => new Date(a) - new Date(b));
    earliestDeadline = deadlines[0];
    loadDeadlineVisionHTML(earliestDeadline);
}


function loadDeadlineVisionHTML(earliestDeadline){
    document.getElementById('deadline-container').innerHTML = /*html*/`
        <div class="deadline">${earliestDeadline}</div>
        <div class="deadline-text">Upcoming Deadline</div>
    `;
}

function loadAllTasksVision(allTaksCounter){
    document.getElementById(`allTasks-vision`).innerHTML = /*html*/`
        <div class="task-counter">${allTaksCounter}</div>
        <div class="task-status text-center">Tasks in <br> Board</div>
    `;
}

function loadInProgressTasksVision(inPogresses){
    document.getElementById(`InProgressTasks-vision`).innerHTML = /*html*/`
    <div class="task-counter">${inPogresses}</div>
    <div class="task-status text-center">Tasks In <br> Progress</div>
    `;
}

function loadAwaitFeedbackVision(awaitFeedbacks){
    document.getElementById(`AwaitFeedbackTasks-vision`).innerHTML = /*html*/`
    <div class="task-counter">${awaitFeedbacks}</div>
    <div class="task-status text-center">Await <br> Feedback</div>
    `;
}

/**
 * Determines the greeting based on the time of the day.
 * @param {number} hours - The current hour.
 */
function greetTime(hours) {
    if (hours >= 4 && hours <= 11) {
        document.getElementById('greet').innerHTML = /*html*/`
            <span class="greet-time">Good morning</span>`;
    } else if (hours >= 12 && hours <= 17) {
        document.getElementById('greet').innerHTML = /*html*/`
            <span class="greet-time">Good afternoon</span>`;
    } else if (hours >= 18 && hours <= 21) {
        document.getElementById('greet').innerHTML = /*html*/`
            <span class="greet-time">Good evening</span>`;
    } else if ((hours >= 22 && hours <= 3) || hours === 0) {
        document.getElementById('greet').innerHTML = /*html*/`
            <span class="greet-time">Good night</span>`;
    }
}

function loadAccount() {
    const accountElement = document.getElementById('account');
    accountElement.innerHTML = /*html*/ `
        <span class="greet-account">${currentUser}</span>
    `;
}

/**
 * Hover effect that changes the image for summary visuals.
 * @param {string} id - The ID of the visual element.
 */
function imgChangeSummary(id) {
    let visionToDo = document.getElementById(`toDoImg`);
    let visionInProgress = document.getElementById(`DoneImg`);

    switch (id) {
        case "toDo-vision":
            visionToDo.src = "../img/ToDoVisionHoover.svg";
            break;
        case "done-vision":
            visionInProgress.src = "../img/InProgressVisionHoover.svg";
            break;
    }
}

function imgChangeSummaryBack(id){
    let visionToDo = document.getElementById(`toDoImg`);
    let visionInProgress = document.getElementById(`DoneImg`);

    switch (id) {
        case "toDo-vision":
            visionToDo.src = "../img/Group 7.svg"
            break;
        case "done-vision":
            visionInProgress.src = "../img/doneVision.svg"
            break;
    }
}




