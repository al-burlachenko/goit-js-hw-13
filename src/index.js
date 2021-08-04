// import './css/utils/fontawesome.min.css'
import './css/main.css';
import ImageCardsService from './js/images-api-service';
import Notiflix from 'notiflix';

// import ImageCardsService from './js/images-api-service(old)';

import { modalOpen, changeLightboxImage } from './js/modalInterface';

require('handlebars');

import imageCardTpl from './templates/image-card.hbs';

export const gallery = document.querySelector('.js-gallery');
export const lightbox = document.querySelector('.js-lightbox');
export const lightboxImage = lightbox.querySelector('.lightbox__image');
export const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');
export const modalClsBtn = lightbox.querySelector('button[data-action="close-lightbox"]');

const imageCardsService = new ImageCardsService();

const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');

let cardsCounter = 0;
let isAll = (cardsCounter = null);

searchForm.addEventListener('submit', getNewCards);
loadMoreBtn.addEventListener('click', uploadNewCards);

function getNewCards(event) {
  event.preventDefault();
  loadMoreBtn.style.display = '';
  cardsCounter = 0;

  imageCardsService.query = event.currentTarget.elements.searchQuery.value;
  imageCardsService.resetPage();
  imageCardsService
    .fetchCards()
    .then(imageCard => {
      return imageCard;
    })
    .then(imageCard => {
      clearGallery();
      if (imageCard.hits.length === 0) {
        console.log(imageCard.hits.length)
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        )
        return;
      }

      appendImageCards(imageCard);
      loadMoreBtn.style.display = 'flex';

      checkCardsAmount(imageCard);
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
      checkCardsAmount(imageCard);
      appendImageCards(imageCard);
    });
}

function appendImageCards(imageCard) {
  gallery.insertAdjacentHTML('beforeend', imageCardTpl(imageCard.hits));
}

function clearGallery() {
  gallery.innerHTML = '';
}

function checkCardsAmount(imageCard) {
  cardsCounter = cardsCounter + imageCard.hits.length;
  isAll = cardsCounter < imageCard.totalHits;
  console.log(isAll);
  if (!isAll) {
    loadMoreBtn.style.display = '';
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  return isAll;
}
