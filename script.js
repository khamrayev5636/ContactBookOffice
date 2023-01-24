const elForm = document.querySelector(".form__js");
const elName = elForm.querySelector(".input__name");
const elDataList = elForm.querySelector(".input__datalist");
const elPhone = elForm.querySelector(".input__phone");
const elList = document.querySelector(".contact__list");

const contactListArr = [];

// Add  Contact function

const addContact = ((userName , relationShip , userNumber) => {
    
    contactListArr.push({
        user_name: userName,
        relation_ship: relationShip,
        user_number:userNumber,
    });
    
});


// Invalid Number 

function invalidFunction(contactInvalid) {
    
    return contactListArr.findIndex(num => num.user_number === contactInvalid ) > -1;
}


// Render Contatc 

function renderContact() {
    
    const elContactTemplate = document.querySelector(".contact__temp").content;
    const elContactFragment = document.createDocumentFragment();
    
    elList.innerHTML = "";
    
    contactListArr.forEach((item , index) =>{
        
        const elClone = elContactTemplate.cloneNode(true);
        
        elClone.querySelector(".contact__span-id").textContent = index + 1;
        elClone.querySelector(".contact__title").textContent = item.user_name;
        elClone.querySelector(".contact__text").textContent = item.relation_ship;
        elClone.querySelector(".contact__link").textContent = "+" + item.user_number;
        elClone.querySelector(".contact__link").href = `tel:+${item.user_number}`;
        elClone.querySelector(".contact__btn").dataset.contactId = index;
        
        elContactFragment.appendChild(elClone)
        
    })
    
    elList.appendChild(elContactFragment)
    
}


// Delete Contact 

function deleteContact() {
    
    
    //Event Delegation 
    
    elList.addEventListener("click" , (evt) => {
        
        if(evt.target.matches(".contact__btn")){
            
            const delBtn = Number(evt.target.dataset.contactId);
            
            contactListArr.splice(delBtn , 1);
            renderContact()
        }
        
    });
}


// ELFORM SUBMIT FORMANI ESHITAMIZZ !!!

elForm.addEventListener("submit" , (evt)=> {
    evt.preventDefault();
    
    elList.classList.add("contact__list-js")
    
    const elNameValue = elName.value.trim();    
    const elDataListValue = elDataList.value.trim();    
    const elPhoneValue = elPhone.value.trim();  
    
    if(invalidFunction(elPhoneValue)){
        elPhone.classList.add("input__phone-js");
        return
    }
    
    elPhone.classList.remove("input__phone-js")
    
    addContact(elNameValue , elDataListValue , elPhoneValue);
    renderContact();
    
    elForm.reset();
    
    
});

deleteContact()

