let names = [];
let initials = [];
let colors = ["Red", "Blue", "Green", "Pink", "Orange", "Purple", "Brown", "Black", "Gray", "Turquoise", "Magenta", "Gold", "Silver", "Coral",];
async function initContact() {
    await includeHTML();
    await showLocalStorage();
    await loadUsers();
    await initHeader();
    renderContacts();
}
//Wählt zufällige Farbe aus colors
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
//Gibt Initialien zurück
function getBothNameInitials(fullName) {
    const names = fullName.split(' ');
    const firstNameInitial = names[0] ? names[0][0].toUpperCase() : '';
    const lastNameInitial = names[1] ? names[1][0].toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
}
function getInitial(fullName) {
    const lastName = fullName.split(' ')[0];
    return lastName ? lastName[0] : '';
}
async function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        let currentInitial = String.fromCharCode(65 + i);
        let initialContacts = [];
        createContactElements(initialContacts, currentInitial);
        if (initialContacts.length > 0) {
            initials.push(currentInitial);
            contactList.innerHTML += contactListHTML(currentInitial, initialContacts, `${i}`);
        }
    }
}
//Erstellt Variablen für Contacts
function createContactElements(initialContacts, currentInitial){
    for (let j = 0; j < names.length; j++) {
        const contactInfo = names[j]['name'];
        const mailAdress = names[j]['mail'];
        const phoneNumber = names[j]['phone'];
        const color = names[j]['color'];
        const initial = getInitial(contactInfo);
        if (initial === currentInitial) {
            initialContacts.push({ contactInfo, mailAdress, phoneNumber, initial, color });
        }
    }
}
function contactListHTML(currentInitial, initialContacts, i){
    return `
        <ul>
            <li class='initials'>
                <h1>${currentInitial}</h1>
            </li>
            ${initialContacts.map(contact => `
                <li class='list-row' id='list-row${i}' onclick='showContact("${contact.contactInfo}", "${contact.mailAdress}", "${contact.phoneNumber}","${contact.color}", "${getBothNameInitials(contact.contactInfo)}", ${i})'>
                    <div class="person-initials" style="background-color: ${contact.color};">${getBothNameInitials(contact.contactInfo)}</div> 
                    <div class='list-row-contactInfo'>
                        <span>${contact.contactInfo}</span>
                        <div id="list-rowLink${i}" class="contact-list-mail">${contact.mailAdress}</div>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}
//Erstellt HTML Contact Detailansicht
function showContact(contactInfo, mailAdress, phoneNumber, color, initial, i) {
    if (window.innerWidth > 680) {
        let contantElement = document.getElementById('contact-contant');
        contantElement.classList.remove('d-none');
        contantElement.innerHTML = contantElementHTMLsmall(color, initial, contactInfo, mailAdress, phoneNumber);
    }
    else {
        let contantElement = document.getElementById('respsonsive-showContact');
        contantElement.classList.remove('d-none');
        contantElement.innerHTML += contantElementHTMLnomal(color, initial, contactInfo, mailAdress, phoneNumber);
    }
    currentContact(i);
}

function currentContact(i){
    let contact = document.getElementById(`list-row${i}`);
    let contactLink = document.getElementById(`list-rowLink${i}`);

    watchCurrentContact();

    contact.classList.add('currentContact');
    contactLink.classList.add('currentContactLink');
}

function watchCurrentContact(){
    let currentContact = document.getElementsByClassName('currentContact');
    let currentLink = document.getElementsByClassName('currentContactLink');
    
    if (currentContact) {
        for (let index = 0; index < currentContact.length; index++) {
            currentContact[index].classList.remove('currentContact');
            currentLink[index].classList.remove('currentContactLink');   
        }
    }
}

function contantElementHTMLnomal(color, initial, contactInfo, mailAdress, phoneNumber){
    return `<div class="Contant-Responsive-ShowContact">
            
    <div class='showContact-Responsive'>
    <h1>Contacts</h1>
    <span>Better with a team
    </span>
    <div class="up-line"></div>
    </div>
    
    <div class="contact-contant-headline">
    <h1 style="background-color: ${color};">${initial}</h1>
    
    <div class='contact-contant-headline2'>
        <span>${contactInfo}</span>
    
    </div>
    </div>
    
    <div class='contant-contact-information'>
        <span>Contact Information</span>
        <div class='contant-contact-email-phone'>
        <div class='contant-contact-email'>
        <span>Email</span>
        <a href="${mailAdress}">${mailAdress}</a>
        </div>
        <div class='contant-contact-email'>
        <span>Phone</span>
        +49 ${phoneNumber}
        </div>
        </div>
        </div>
        </div>
    
    
    <a href="#" onclick='showEditButtonResponsive()' id="responsive-popup" class="repsonsive-popUpEdit">
    <div class="points-popUp">
    </div>
    <div class="points-popUp">
    </div>
    <div class="points-popUp">
    </div>
    </a>
    
    
    <div class="d-none editButtonResponsive" id='editButtonResponsive'>
    <div class='editButtonResponsiveFlex'>
        <a onclick="showEditContact('${contactInfo}', '${mailAdress}', '${phoneNumber}', '${initial}', '${color}')"><img src="../img/EditPencil.png" alt="Hinzufügen"></a>
        <a onclick="deleteContact('${contactInfo}')"><img src="../img/Delete-contact.svg" alt="Delete"></a>
    </div>
    </div>
    
    <div class="arrow-left-responsive">
    <a href="#" onclick='backResponsiveArrow()'> <img src="../img/arrow-left-line.png" alt="arrow"></a>  
    </div>
    `;
}
function contantElementHTMLsmall(color, initial, contactInfo, mailAdress, phoneNumber){
    return `<div class="contact-contant-headline">
    <h1 style="background-color: ${color};">${initial}</h1>
   
    <div class='contact-contant-headline2'>
        <span>${contactInfo}</span>
        <div class="contact-contant-headline-buttons">
        <a onclick="showEditContact('${contactInfo}', '${mailAdress}', '${phoneNumber}', '${initial}', '${color}')"><img src="../img/EditPencil.png" alt="Hinzufügen"></a>
            <a onclick="deleteContact('${contactInfo}')"><img src="../img/Delete-contact.svg" alt="Delete"></a>
        </div>
    </div>
    </div>
     
    <div class='contant-contact-information'>
       <span>Contact Information</span>
      <div class='contant-contact-email-phone'>
      <div class='contant-contact-email'>
       <span>Email</span>
       <a href="mailto:${mailAdress}" class="mail-to-contact">${mailAdress}</a>
       </div>
       <div class='contant-contact-email'>
       <span>Phone</span>
       +49 ${phoneNumber}
       </div>
       </div>
    </div>`;
}
//Funktionen für Responsiv
function backResponsiveArrow() {
    let contantElement = document.getElementById('respsonsive-showContact');
    contantElement.innerHTML = '';
    contantElement.classList.add('d-none');
}
function showEditButtonResponsive() {
    closeResponsiveButton();
    let element = document.getElementById('editButtonResponsive');
    element.classList.remove('d-none');
}
function showEditContactResponsive(contactInfo, mailAdress, phoneNumber, initial, color) {
    showEditContact(contactInfo, mailAdress, phoneNumber, initial, color);
}
function closeResponsiveButton() {
    let elementEdit = document.getElementById('responsive-popup');
    elementEdit.classList.add('d-none');
}
function closeShowContact() {
    let contantElement = document.getElementById('contact-contant');
    contantElement.classList.add('d-none');
}
//Löscht Contact
function deleteContact(contactInfo) {
    var index = -1;
    for (let i = 0; i < names.length; i++) {
        if (names[i].name === contactInfo) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        names.splice(index, 1);
        backResponsiveArrow();
        closeShowContact();
        setLocalStorage();
        renderContacts(); // Aktualisiert die Anzeige nach dem Löschen
    }
}
//Zeigt Form zum erstellen des Contacts
function showContactForm() {
    let responsiveAdd = document.getElementById('responsive-person-add');
    responsiveAdd.classList.add('d-none');
    let contactForm = document.getElementById('numberForm');
    contactForm.classList.remove('d-none');
    let contantElement = document.getElementById('contact-contant');
    contantElement.classList.add('d-none');
    scrollPopup(contactForm);
}

//Schließt die Form
function closeContactForm() {
    let contactForm = document.getElementById('numberForm');
    contactForm.classList.add('d-none');
    scrollBody(contactForm);
    watchCurrentContact();
}

function scrollPopup(contactForm) {
    document.body.style.overflow = "hidden";
    contactForm.style.overflow = "auto";
}
function scrollBody(contactForm) {
  document.body.style.overflow = "auto";
  contactForm.style.overflow = "hidden";
}
//Funktion zum bearbeiten des Kontaktes
function editContact(newContactInfo, newMailAdress, newPhoneNumber, color, contactInfo, mailAdress, phoneNumber, color) {
    var index = -1;
    for (let i = 0; i < names.length; i++) {
        if (names[i].name === contactInfo && names[i].mail === mailAdress && names[i].phone === phoneNumber) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        names.splice(index, 1);
        names.push({ name: newContactInfo, mail: newMailAdress, phone: newPhoneNumber, color: color });
        pushNewNameElements();
    }
}
function pushNewNameElements(){
    backEdit();
    backResponsiveArrow();
    setLocalStorage();
    renderContacts();
}
function backEdit() {
    let editForm = document.getElementById('editForm');
    editForm.classList.add('d-none');
}
//Fühe neuen Contact hinzu
function addNewContact() {
    let name = document.getElementById('nameOfContact').value;
    let indexOfSpace = name.indexOf(" ") + 1;
    let eMail = document.getElementById('emailOfContact').value;
    let number = document.getElementById('numberOfContact').value;
    if(indexOfSpace == -1){
        name = name[0].toUpperCase() + name.substring(1).toLowerCase();
    }
    else{
        name = name[0].toUpperCase() + name.substring(1, indexOfSpace).toLowerCase() + name[indexOfSpace].toUpperCase() + name.substring(indexOfSpace + 1).toLowerCase();
    }
    if (name && eMail && number) {
        let color = getRandomColor();
        names.push({ name, mail: eMail, phone: number, color });
        setLocalStorage();
        showSuccesButton();
    }
    // Setze die Eingabefelder zurück
    document.getElementById('nameOfContact').value = '';
    document.getElementById('emailOfContact').value = '';
    document.getElementById('numberOfContact').value = '';
    closeContactForm();
    backEdit()
    renderContacts();
}
function setLocalStorage() {
    setItem('names', JSON.stringify(names));
}
async function showLocalStorage() {
    names = JSON.parse(await getItem('names'));
}
function showSuccesButton() {
    let succes = document.getElementById('succes-button');
    succes.classList.remove('d-none');
    setTimeout(function () {
        succes.classList.add('d-none');
    }, 2000);
}
//Läd gegebene Werte in Form zur bearbeitung
function showEditContact(contactInfo, mailAdress, phoneNumber, initial, color) {
    let contactInitials = createEditVaribels();
    // Hier holen wir uns die Werte des Kontakts
    let name = contactInfo;
    let email = mailAdress;
    let number = phoneNumber;
    setContactValues(name, email, number)
    // Hier setzen wir den Wert im Container
    contactInitials.innerHTML = contactInitialsHTML(color, initial);
    // Wenn der Benutzer auf "Speichern" klickt
    document.getElementById('create-button').addEventListener('click', function () {
        let newContactInfo = document.getElementById('inputName').value;
        let newMailAdress = document.getElementById('inputEmail').value;
        let newPhoneNumber = document.getElementById('inputNumber').value;
        
        // Übergib die alten und neuen Kontaktinformationen an editContact
        editContact(newContactInfo, newMailAdress, newPhoneNumber, color, contactInfo, mailAdress, phoneNumber, color);
    });
}
function contactInitialsHTML(color, initial){
    return `<div class="EditInitials" style="background-color: ${color};">
    ${initial}
    </div>`;
}
function createEditVaribels(){
    let editForm = document.getElementById('editForm');
    editForm.classList.remove('d-none');
    let contactInitials = document.getElementById("contact-initials");
    contactInitials.innerHTML = ``;
    let contactInfoElement = document.getElementById('contact-contant');
    contactInfoElement.classList.add('d-none');
    return contactInitials;
}
function setContactValues(name, email, number) {
    document.getElementById('inputName').value = name;
    document.getElementById('inputEmail').value = email;
    document.getElementById('inputNumber').value = number;
}