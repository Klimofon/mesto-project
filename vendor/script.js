
//  profile  /////////////////////////////////////////////////////////////////////////////////
// "edit profile" DOM objects

const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const editionProfileName = document.querySelector('.profile-personal-data__name'); //to get DOM object for changing value in form
const editionProfileActivity = document.querySelector('.profile-personal-data__activity'); //same

const profileName = document.querySelector('.profile__info .profile__name'); //to get DOM object for data to value
const profileActivity = document.querySelector('.profile__info .profile__activity'); //same

const profileSubmit = document.querySelector('#profile-personal-data');// for submit. It use id for get different popups

// "edit profile" popup

function vievEditProfilePopup() {
    popup.classList.add('popup_visibility-status_on');
    popup.classList.remove('popup_visibility-status_out');
        
    editionProfileName.value = profileName.textContent; //add default data to form
    editionProfileActivity.value = profileActivity.textContent; //same
}

function closeEditProfilePopup() {
    popup.classList.add('popup_visibility-status_out');
    popup.classList.remove('popup_visibility-status_on');
        
    editionProfileName.value = profileName.textContent;
    editionProfileActivity.value = profileActivity.textContent;
}

profileEditButton.addEventListener('click', vievEditProfilePopup);
popupCloseButton.addEventListener('click', closeEditProfilePopup);

// "edit profile" save new data

function addNewProfileData(evt) {
    evt.preventDefault();
    const newProfileName = editionProfileName.value;
    const newProfileActivity = editionProfileActivity.value;
    profileName.textContent = newProfileName;
    profileActivity.textContent = newProfileActivity;
    closeEditProfilePopup();
}
profileSubmit.addEventListener('submit', addNewProfileData);

// cards   //////////////////////////////////////////////////////////////////////////////////////////
// adding card

function addCard(placeName, photoHref) {
 
    const cardTemplate = document.querySelector('#card-template').content;
    const cardClone = cardTemplate.querySelector('.place').cloneNode(true);
    cardClone.querySelector('.place__image').src = photoHref;
    cardClone.querySelector('.place__image').alt = placeName;
    cardClone.querySelector('.place__caption-name').textContent = placeName;
        
    const cardContainer = document.querySelector('.places-list');
    cardContainer.prepend(cardClone);
}

// cards "from box" for adding;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// get content from array initialCards

initialCards.forEach(function (item) {
    const placeName = item['name'];
    const photoHref = item['link'];
    addCard(placeName, photoHref); // initial adding function
});

// "add new place" popup

const addNewPlaceButton = document.querySelector('.profile__add-button');
const popupNewCardContainer = document.querySelector('#new-card-section'); // getting container in DOM
const popupCloseNewCard = popupNewCardContainer.querySelector('.popup__close-button');

function vievAddNewePlacePopup() {
    popupNewCardContainer.classList.add('popup_visibility-status_on');
    popupNewCardContainer.classList.remove('popup_visibility-status_out');
}

function closeAddNewPlacePopup() {
    popupNewCardContainer.classList.remove('popup_visibility-status_on');
    popupNewCardContainer.classList.add('popup_visibility-status_out');
}

addNewPlaceButton.addEventListener('click', vievAddNewePlacePopup);
popupCloseNewCard.addEventListener('click', closeAddNewPlacePopup);

// get "new place" data from user on submit

function addNewPlaceData(evt) {
    evt.preventDefault();
    const newPlaceName = popupNewCardContainer.querySelector('.new-card-name').value;
    const newPlaceUrl = popupNewCardContainer.querySelector('.new-card-url').value;
        if (newPlaceName.length >= 2 && newPlaceUrl.length >=  5) {

        addCard(newPlaceName, newPlaceUrl); // initial adding function
        popupNewCardContainer.querySelector('.new-card-name').value = ""; // reset local form data
        popupNewCardContainer.querySelector('.new-card-url').value = ""; // same

        closeAddNewPlacePopup();
        addCardListeners();
        }
}

newPlaceSubmit = popupNewCardContainer.querySelector('.form');
newPlaceSubmit.addEventListener('submit', addNewPlaceData);

// cards functions

function deleteCard(evt) {
    evt.target.parentElement.remove();
}

function addLike(evt) {
    evt.target.classList.toggle('place__caption-like_selected');
}

function closeImagePopup(evt) {
    evt.target.parentElement.parentElement.classList.remove('popup_visibility-status_on');
    evt.target.parentElement.parentElement.classList.add('popup_visibility-status_out');
}

function showImagePopup(evt) {
    const imageSource = evt.target.src;
    const imageCaption = evt.target.parentElement.querySelector('.place__caption-name').textContent;
    document.querySelector('.popup__image-caption').textContent = imageCaption;
    document.querySelector('.popup__image').src = imageSource;
  
    const popupShowImageContainer = document.querySelector('#image-popup-section');
    popupShowImageContainer.classList.remove('popup_visibility-status_out');
    popupShowImageContainer.classList.add('popup_visibility-status_on');
            
    const closeImageButton = popupShowImageContainer.querySelector('.popup__close-button');
    closeImageButton.addEventListener('click', closeImagePopup);
}

 // add listeners to every card

function addCardListeners() {
    const placeContainers = document.querySelectorAll('.place');
    placeContainers.forEach(function (item) {
        const deleteButton = item.querySelector('.place__delete-button');
        const likeButton = item.querySelector('.place__caption-like');
        const imageLink = item.querySelector('.place__image');

        deleteButton.addEventListener('click', deleteCard);
        likeButton.addEventListener('click', addLike);
        imageLink.addEventListener('click', showImagePopup);
    })
}

addCardListeners();

