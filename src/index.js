// import './css/utils/fontawesome.min.css'
import './css/main.css';
import ImageCardsService from './js/images-api-service';

import { modalOpen, changeLightboxImage } from './js/modalInterface';

require('handlebars');

import imageCardTpl from './templates/image-card.hbs';

export const gallery = document.querySelector('.js-gallery');
export const lightbox = document.querySelector('.js-lightbox');
export const lightboxImage = lightbox.querySelector('.lightbox__image');
export const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');
export const modalClsBtn = lightbox.querySelector('button[data-action="close-lightbox"]');

const imageCardsService = new ImageCardsService();

// const searchBtn = document.querySelector('button[type="submit"]');
// const inputField = document.querySelector('input[type="text"]');
const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', getNewCards);
loadMoreBtn.addEventListener('click', uploadNewCards);

// console.log(loadMoreBtn);
// console.log(searchBtn);

// function getOriginalImgData(event) {
//   event.preventDefault();

//   if (event.target === event.currentTarget) {
//     return;
//   }

//   const src = event.target.dataset.source;
//   const alt = event.target.getAttribute('alt');

//   modalOpen(event);
//   changeLightboxImage(src, alt);
// }

function getNewCards(event) {
  event.preventDefault();

  imageCardsService.query = event.currentTarget.elements.searchQuery.value;
  imageCardsService.resetPage();
  imageCardsService
    .fetchCards()
    .then(imageCard => {
      return imageCard;
    })
    .then(imageCard => {
      clearGallery();
      appendImageCards(imageCard);
    });
}

function uploadNewCards(event) {
  event.preventDefault();

  imageCardsService.increment();
  imageCardsService
    .fetchCards()
    .then(imageCard => {
      return imageCard;
    })
    .then(imageCard => {
      appendImageCards(imageCard);
    });
}

function appendImageCards(imageCard) {
  gallery.insertAdjacentHTML('beforeend', imageCardTpl(imageCard.hits));
}

function clearGallery() {
  gallery.innerHTML = '';
}
