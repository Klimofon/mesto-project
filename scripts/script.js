// cards "from box" for adding; ///////////////////////////////////////////////////////////////////////////////////
const cardsArray = [
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openPopup (selector) {
    document.querySelector(selector).classList.add('popup_opened');
}

function closePopup (obj) {
    obj.classList.remove('popup_opened')
}

function openProfilePopup () {
    const oldProfileName = document.querySelector('.profile__name').textContent;
    const oldProfileActivity = document.querySelector('.profile__activity').textContent;
    document.querySelector('.profilePopup .profile-personal-data__name').value = oldProfileName;
    document.querySelector('.profilePopup .profile-personal-data__activity').value = oldProfileActivity;
    openPopup('.profilePopup');
}

function openCardAddPopup () {
    openPopup('.cardAddPopup');
}
  
function addNewProfileData(evt) {
    evt.preventDefault();
    const newProfileName = document.querySelector('.profilePopup .profile-personal-data__name').value;
    const mewProfileActivity = document.querySelector('.profilePopup .profile-personal-data__activity').value;
    document.querySelector('.profile__name').textContent = newProfileName;
    document.querySelector('.profile__activity').textContent = mewProfileActivity;
    closePopup(profilePopup);
}

function createCard(placeName, photoHref) {
    cardClone = cardTemplate.querySelector('.place').cloneNode(true);
    cardClone.querySelector('.place__image').src = photoHref;
    cardClone.querySelector('.place__image').alt = 'Изображение места с названием ' + placeName;
    cardClone.querySelector('.place__caption-name').textContent = placeName;
        cardClone.querySelector('.place__caption-like').addEventListener('click', toggleLike);
        cardClone.querySelector('.place__delete-button').addEventListener('click', deleteCard);
        cardClone.querySelector('.place__image').addEventListener('click', openImagePopup);
    return cardClone;
    //
    //
}

function getNewCard(evt) {
    evt.preventDefault();
    const newPlaceName = cardForm.querySelector('.new-card-name').value;
    const newPhotoHref = cardForm.querySelector('.new-card-url').value;
        if (newPlaceName.length >= 2 && newPhotoHref.length >=  5) {

        const cardClone = createCard(newPlaceName, newPhotoHref);
        addCard(cardClone);
        closePopup(cardPopup);
        cardForm.querySelector('.new-card-name').value = '';
        cardForm.querySelector('.new-card-url').value = '';
        }
}

function addCard(cardClone) {
    cardContainer.prepend(cardClone);
}

function deleteCard(evt) {
    evt.target.closest('.place').remove();
}

function toggleLike(evt) {
    evt.target.classList.toggle('place__caption-like_selected');
}

function openImagePopup(evt) {
    
    const imageSource = evt.target.src;
    const imageCaption = evt.target.closest('.place').querySelector('.place__caption-name').textContent;
    document.querySelector('.popup__image').src = imageSource;
    document.querySelector('.popup__image-caption').textContent = imageCaption;
    openPopup('.image-popup');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const profileEditButton = document.querySelector('.profile__edit-button');
    profileEditButton.addEventListener('click', openProfilePopup);

const cardAddButton = document.querySelector('.profile__add-button');
    cardAddButton.addEventListener('click', openCardAddPopup);

const profilePopup = document.querySelector('.profilePopup');
const profileForm = document.forms['profile-personal-data'];
    profileForm.addEventListener('submit', addNewProfileData);

const cardPopup = document.querySelector('.cardAddPopup');
const cardForm = document.forms['new-card-data'];
    cardForm.addEventListener('click', getNewCard);
    
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
    popupCloseButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    })

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places-list');

cardsArray.forEach(function (item) {
    const placeName = item['name'];
    const photoHref = item['link'];
    let cardClone = createCard(placeName, photoHref);
    addCard(cardClone);
});