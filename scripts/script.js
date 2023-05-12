// cards "from box"
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

// const
const profileEditButton = document.querySelector('.profile__edit-button');
const oldProfileName = document.querySelector('.profile__name'); // место для заполнения попапа профиля на основной странице
const oldProfileActivity = document.querySelector('.profile__activity'); // место для заполнения попапа профиля на основной странице
const profilePopup = document.querySelector('.profilePopup'); // Попап профиля

const profileForm = document.forms['profile-personal-data'];
const newProfileName = profileForm.querySelector('.profile-personal-data__name'); // место для заполнения данных профиля в попапе
const newProfileActivity = profileForm.querySelector('.profile-personal-data__activity'); // место для заполнения данных профиля в попапе

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.cardAddPopup'); // Попап добавления карточки
const cardForm = document.forms['new-card-data'];
const newPlaceName = cardForm.querySelector('.new-card-name');
const newPhotoHref = cardForm.querySelector('.new-card-url');
const cardContainer = document.querySelector('.places-list');
const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.image-popup'); // Попап картинки
const popupImageSource = imagePopup.querySelector('.popup__image'); // место для вставки контента в попапе
const popupImageCaption = imagePopup.querySelector('.popup__image-caption'); // место для вставки контента в попапе

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// funct

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

function openProfilePopup() {
    newProfileName.value = oldProfileName.textContent;
    newProfileActivity.value = oldProfileActivity.textContent;
    openPopup(profilePopup);
}

function openCardAddPopup() {
    openPopup(cardAddPopup);
}

function openImagePopup(evt) {
    const imageSource = evt.target.src;
    const imageCaption = evt.target.closest('.place').querySelector('.place__caption-name').textContent;
    popupImageSource.src = imageSource;
    popupImageCaption.textContent = imageCaption;
    popupImageSource.alt = 'Увеличенное изображение места с названием ' + imageCaption;
    openPopup(imagePopup);
}

function addNewProfileData(evt) {
    evt.preventDefault();
    oldProfileName.textContent = newProfileName.value;
    oldProfileActivity.textContent = newProfileActivity.value;
    closePopup(profilePopup);
}

function createCard(placeName, photoHref) {
    const cardClone = cardTemplate.querySelector('.place').cloneNode(true);
    const imgClone = cardClone.querySelector('.place__image');
    imgClone.src = photoHref;
    imgClone.alt = 'Изображение места с названием ' + placeName;
    cardClone.querySelector('.place__caption-name').textContent = placeName;
    cardClone.querySelector('.place__caption-like').addEventListener('click', toggleLike);
    cardClone.querySelector('.place__delete-button').addEventListener('click', deleteCard);
    imgClone.addEventListener('click', openImagePopup);
    return cardClone;
}

function getNewCard(evt) {
    evt.preventDefault();
    if (newPlaceName.value.length >= 2 && newPhotoHref.value.length >= 5) {

        const cardClone = createCard(newPlaceName.value, newPhotoHref.value);
        addCard(cardClone);
        closePopup(cardAddPopup);
        newPlaceName.value = '';
        newPhotoHref.value = '';
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

profileForm.addEventListener('submit', addNewProfileData);
profileEditButton.addEventListener('click', openProfilePopup);
cardAddButton.addEventListener('click', openCardAddPopup);
cardForm.addEventListener('click', getNewCard);
popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
})

cardsArray.forEach(function (item) {
    const placeName = item['name'];
    const photoHref = item['link'];
    const cardClone = createCard(placeName, photoHref);
    addCard(cardClone);
});