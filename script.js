const elForm = document.querySelector(".form__js");
const elName = elForm.querySelector(".input__name");
const elDataList = elForm.querySelector(".input__datalist");
const elPhone = elForm.querySelector(".input__phone");
const elList = document.querySelector(".list");

const newArray = [];
let count = 0;

// Domga Render Qilish

function myContactFuction(){
    
    elList.innerHTML = "";
    
    newArray.forEach((element) => {
        
        const newItem = document.createElement("li");
        newItem.classList.add("item-js")
        const newSpan = document.createElement("span");
        newSpan.classList.add("span-js")
        const newTitle = document.createElement("h3");
        newTitle.classList.add("title-js")
        const newText = document.createElement("p");
        newText.classList.add("text-js")
        const newPhone = document.createElement("a");
        newPhone.classList.add("link-js");
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.dataset.id = element.id;
        delBtn.classList.add("del-btn" , "btn" , "btn-danger" ,"d-block" , "ms-2");
        delBtn.textContent = "delete"
        
        newSpan.textContent = element.id;
        newTitle.textContent = element.userName;
        newText.textContent = element.userDataList;
        newPhone.textContent ="+" + element.userPhone;
        newPhone.setAttribute("href" , `${"tel:" + element.userPhone}`)
        
        
        newItem.append(newSpan , newTitle , newText , newPhone, delBtn);
        elList.appendChild(newItem);
    });    
}

elForm.addEventListener("submit" , evt =>{
    evt.preventDefault();
    
    elList.classList.add("list-js");
    
    const nameValue = elName.value.trim();
    const datalistValue = elDataList.value.trim();
    const phoneValue = elPhone.value.trim();
    
    
    const obj = {
        id: ++count,
        userName: nameValue,
        userDataList:datalistValue,
        userPhone: phoneValue,
    }
    
    const item = newArray.find(item => item.userPhone === phoneValue);
    
    if(item) {
        alert("oldin kiritilgan")
        return;
    } else {
        newArray.push(obj);
    }
    elForm.reset();
    
    myContactFuction();
    
});

elList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".del-btn")){
        
        const delbtnId = Number(evt.target.dataset.id);
        const findListArray = newArray.findIndex((item) => {
            return item.id === delbtnId
        });
        
        newArray.splice(findListArray, 1);
        myContactFuction();
    }
})