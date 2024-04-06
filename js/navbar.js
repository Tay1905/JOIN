function checkFocusNav(){
    let topWindowURL = window.top.location.href
    if (topWindowURL.includes("board")){
        document.getElementById('BoardLinkDiv').classList.add('current-link');
    }
    else if(topWindowURL.includes("summary")){
        document.getElementById('SummaryLinkDiv').classList.add('current-link');
    }
    else if(topWindowURL.includes("add")){
        document.getElementById('AddTaskLinkDiv').classList.add('current-link');
    }
    else if(topWindowURL.includes("contacts")){
        document.getElementById('ContactsLinkDiv').classList.add('current-link');
    }
    else if(topWindowURL.includes("policy")){
        document.getElementById('PolicyLinkDiv').classList.add('current-link');
    }
    else if(topWindowURL.includes("impressum")){
        document.getElementById('LegalNoticeLinkDiv').classList.add('current-link');
    }
}