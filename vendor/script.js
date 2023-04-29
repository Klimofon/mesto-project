// popup
let editProfileButtonObj = document.querySelector('.profile__edit-button');
let popupWindowObj = document.querySelector('.popup');
let popupCloseButtonObj = document.querySelector('.popup__close-button');

let editProfilePresonalDataNameObj = document.querySelector('.profile-personal-data__name'); //to get DOM object for changing placeholder in form
let editProfilePresonalDataActivityObj = document.querySelector('.profile-personal-data__activity'); //same

let profilePersonalDataNameObj = document.querySelector('.profile__info .profile__name'); //to get DOM object for data to placeholder
let profilePresonalDataActivityObj = document.querySelector('.profile__info .profile__activity'); //same

function vievPopup() {
    popupWindowObj.classList.add('popup_opened');
    editProfilePresonalDataNameObj.placeholder = profilePersonalDataNameObj.textContent; //change data in form
    editProfilePresonalDataActivityObj.placeholder = profilePresonalDataActivityObj.textContent; //same
}

function closePopup() {
    popupWindowObj.classList.remove('popup_opened');
    
    //editProfilePresonalDataNameObj.placeholder = '';
    //editProfilePresonalDataActivityObj.placeholder = profilePresonalDataActivityObj.textContent;
}

editProfileButtonObj.addEventListener('click', vievPopup);
popupCloseButtonObj.addEventListener('click', closePopup);
//console.log(editProfileButton);
//console.log(popupWindowObj.classList);
//console.log(popupCloseButtonObj.classList);
//console.log(editProfilePresonalDataNameObj.classList);
//console.log(editProfilePresonalDataActivityObj.classList);
console.log(profilePersonalDataNameObj.textContent);
console.log(profilePresonalDataActivityObj.textContent);