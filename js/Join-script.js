let names = [];
let phoneNumbers = [];
let mailAdresses = [];
let initials = [];
let colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Turquoise", "Magenta", "Lilac", "Gold", "Silver", "Olive Green", "Sky Blue", "Coral", "Mint Green"];






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

function render() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    showLocalStorage();


    for (let i = 0; i < 26; i++) {
        let currentInitial = String.fromCharCode(65 + i);
        let initialContacts = [];

        for (let j = 0; j < names.length; j++) {
            const contactInfo = names[j];
            const mailAdress = mailAdresses[j];
            const phoneNumber = phoneNumbers[j];
            const color = colors[j];
            const initial = getInitial(contactInfo);
            if (initial === currentInitial) {
                initialContacts.push({ contactInfo, mailAdress, phoneNumber, initial, color});
            }
        }

        if (initialContacts.length > 0) {
            initials.push(currentInitial);

           
            
            contactList.innerHTML += `
                <ul>
                    <li class='initials'>
                        <h1>${currentInitial}</h1>
                    </li>

                    ${initialContacts.map(contact => `
                        <li class='list-row' id='list-row' onclick=' showContact("${contact.contactInfo}", "${contact.mailAdress}", "${contact.phoneNumber}","${contact.color}", "${getBothNameInitials(contact.contactInfo)}")'>
                            <div class="person-initials" style="background-color: ${contact.color};">${getBothNameInitials(contact.contactInfo)}</div> 
                            <div class='list-row-contactInfo'>
                                <span>${contact.contactInfo}</span>
                                <a href="${contact.mailAdress}">${contact.mailAdress}</a>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            `;
        }
    }
}




   

function showContact(contactInfo, mailAdress, phoneNumber, color, initial){
   
    if (window.innerWidth > 428) {

    let contantElement= document.getElementById('contact-contant');
    contantElement.classList.remove('d-none');
    contantElement.innerHTML =`
    
    <div class="contact-contant-headline">

    
    <h1 style="background-color: ${color};">${initial}</h1>
   
    <div class='contact-contant-headline2'>
        <span>${contactInfo}</span>
        <div class="contact-contant-headline-buttons">
        <a onclick="showEditContact('${contactInfo}', '${mailAdress}', '${phoneNumber}', '${initial}', '${color}')"><img src="../img/EditPencil.png" alt="Hinzufügen"></a>
            <a onclick="deleteContact('${contactInfo}', '${mailAdress}', '${phoneNumber}')"><img src="../img/Delete-contact.svg" alt="Delete"></a>
        </div>
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

               `;
               
               } 
            

               
                else {
                   let contantElement = document.getElementById('respsonsive-showContact');
                   contantElement.classList.remove('d-none');

                   contantElement.innerHTML+=`
                   <div class="Contant-Responsive-ShowContact">
                   
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
                     <a onclick="deleteContact('${contactInfo}', '${mailAdress}', '${phoneNumber}')"><img src="../img/Delete-contact.svg" alt="Delete"></a>
                    </div>

                    </div>
                    

                   <div class="arrow-left-responsive">
                   <a href="#" onclick='backResponsiveArrow()'> <img src="../img/arrow-left-line.png" alt="arrow"></a>  
                   </div>

                   `;
                }
           
            }
            
            function backResponsiveArrow(){
                let contantElement = document.getElementById('respsonsive-showContact');
                contantElement.innerHTML='';
                contantElement.classList.add('d-none');
            }
            function showEditButtonResponsive(){
            
                closeResponsiveButton();


            let element = document.getElementById('editButtonResponsive');
            element.classList.remove('d-none');
            }
            
            function showEditContactResponsive(contactInfo, mailAdress, phoneNumber, initial, color){
                showEditContact(contactInfo, mailAdress, phoneNumber, initial, color);
            }
            
            function closeResponsiveButton(){
                let elementEdit = document.getElementById('responsive-popup');
                elementEdit.classList.add('d-none');
            }
            
          


function closeShowContact(){
    let contantElement= document.getElementById('contact-contant');
    contantElement.classList.add('d-none');
}

function deleteContact(contactInfo, mailAddress, phoneNumber) {
    var index = names.indexOf(contactInfo);
    if (index >= 0) {
        names.splice(index, 1);
        mailAdresses.splice(index, 1);
        phoneNumbers.splice(index, 1);
        backResponsiveArrow();
        closeShowContact();
        setLocalStorage();
        render(); // Aktualisiert die Anzeige nach dem Löschen
    }
}
// document.body.addEventListener('click', function() {
//     location.reload();
// });



function showContactForm() {

    let responsiveAdd = document.getElementById('responsive-person-add');
    responsiveAdd.classList.add('d-none');

    let contactForm = document.getElementById('numberForm');
    contactForm.classList.remove('d-none');
     
    
  
    let contantElement = document.getElementById('contact-contant');
    contantElement.classList.add('d-none');
}

  
function closeContactForm(){
    setBackInput();

    let contactForm = document.getElementById('numberForm');
    contactForm.classList.add('d-none');
   
}


function setBackInput(){
    document.getElementById('nameOfContact').value = '';
    document.getElementById('emailOfContact').value = '';
    document.getElementById('numberOfContact').value = '';
}



function editContact(oldContactInfo, oldMailAdress, oldPhoneNumber, newContactInfo, newMailAdress, newPhoneNumber) {
    var index = names.indexOf(oldContactInfo);

    if (index >= 0) {
        names.splice(index, 1);
        mailAdresses.splice(index, 1);
        phoneNumbers.splice(index, 1);

        names.push(newContactInfo);
        mailAdresses.push(newMailAdress);
        phoneNumbers.push(newPhoneNumber);

        backEdit();
        backResponsiveArrow();
        setLocalStorage();

        render();
    }
}

function backEdit(){
    let editForm = document.getElementById('editForm');
    editForm.classList.add('d-none');
    
}

function addNewContact(){
    let name = document.getElementById('nameOfContact').value;
    let eMail = document.getElementById('emailOfContact').value;
    let number = document.getElementById('numberOfContact').value;

    if (name && eMail && number) {
        names.push(name);
        mailAdresses.push(eMail);
        phoneNumbers.push(number);

        setLocalStorage();

        showSuccesButton();
    }

    setBackInput();

    closeContactForm();
    backEdit()
    render();
}


function setLocalStorage(){
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('mailAdresses', JSON.stringify(mailAdresses));
    localStorage.setItem('phoneNumbers', JSON.stringify(phoneNumbers));
}




function showLocalStorage() {
    if(localStorage.getItem('names') !== null) {
        names = JSON.parse(localStorage.getItem('names'));
    }
    if(localStorage.getItem('mailAdresses') !== null) {
        mailAdresses = JSON.parse(localStorage.getItem('mailAdresses'));
    }
    if(localStorage.getItem('phoneNumbers') !== null) {
        phoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers'));
    }
}
function showSuccesButton(){
    let succes = document.getElementById('succes-button');
    succes.classList.remove('d-none');
    setTimeout(function() {
        succes.classList.add('d-none');
    }, 2000);
}


function showEditContact(contactInfo, mailAdress, phoneNumber, initial, color){

    // closeEditButtonResponsive();
    
    let editForm = document.getElementById('editForm');
    editForm.classList.remove('d-none');


    let contactInitials = document.getElementById("contact-initials");
    contactInitials.innerHTML=``;


    let contactInfoElement = document.getElementById('contact-contant');
    contactInfoElement.classList.add('d-none');

    // Hier holen wir uns die Werte des Kontakts
    let name = contactInfo;
    let email = mailAdress;
    let number = phoneNumber;

    // Hier setzen wir die Werte in die Input-Felder
    document.getElementById('inputName').value = name;
    document.getElementById('inputEmail').value = email;
    document.getElementById('inputNumber').value = number;
    
    // Hier setzen wir den Wert im Container
    contactInitials.innerHTML = `
    <div class="EditInitials" style="background-color: ${color};">
    ${initial}
    </div>
    `;


     // Wenn der Benutzer auf "Speichern" klickt
     document.getElementById('create-button').addEventListener('click', function() {
        let newContactInfo = document.getElementById('inputName').value;
        let newMailAdress = document.getElementById('inputEmail').value;
        let newPhoneNumber = document.getElementById('inputNumber').value;

        // Übergib die alten und neuen Kontaktinformationen an editContact
        editContact(contactInfo, mailAdress, phoneNumber, newContactInfo, newMailAdress, newPhoneNumber);
       });

        // Wenn der Benutzer auf "Löschen" klickt
    document.getElementById('delete-Button').addEventListener('click', function() {
        deleteEditContact(contactInfo, mailAdress, phoneNumber);
    });
}

function deleteEditContact(contactInfo, mailAdress, phoneNumber) {
    var index = names.indexOf(contactInfo);
    if (index >= 0) {
        names.splice(index, 1);
        mailAdresses.splice(index, 1);
        phoneNumbers.splice(index, 1);
        if (window.innerWidth <= 428) {
            closeEditContent();
        }
        backEdit();
        closeShowContact();
        setLocalStorage();
        render(); // Aktualisiert die Anzeige nach dem Löschen
    }
}

// function deleteAllContacts() {
//     // Leere alle Arrays
//     names = [];
//     mailAdresses = [];
//     phoneNumbers = [];

    
//     backEdit();
//     closeShowContact();
//     setLocalStorage();
//     render(); // Aktualisiert die Anzeige nach dem Löschen
// }
function closeEditContent(){
    let element = document.getElementById('respsonsive-showContact');
    element.classList.add('d-none');
}