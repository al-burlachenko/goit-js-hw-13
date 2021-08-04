import './css/main.css';
import ImageCardsService from './js/images-api-service';
import Notiflix from 'notiflix';
import imageCardTpl from './templates/image-card.hbs';

// import ImageCardsService from './js/images-api-service(old)';
require('handlebars');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const gallery = document.querySelector('.js-gallery');
const imageCardsService = new ImageCardsService();

const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('.search-form');

let cardsCounter = 0;
let isAll = (cardsCounter = null);

// searchForm.addEventListener('submit', debounce(getNewCards, DEBOUNCE_DELAY));
searchForm.addEventListener('submit', getNewCards);

loadMoreBtn.addEventListener('click', uploadNewCards);

var lightbox = new SimpleLightbox('.photo-card a');

function getNewCards(event) {
  event.preventDefault();

  loadMoreBtn.style.display = '';
  cardsCounter = 0;

  imageCardsService.query = event.currentTarget.elements.searchQuery.value;
  imageCardsService.resetPage();
  imageCardsService.fetchCards().then(imageCard => {
    clearGallery();
    if (imageCard.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${imageCard.totalHits} images.`);

    appendImageCards(imageCard);
    loadMoreBtn.style.display = 'flex';
    checkCardsAmount(imageCard);
    console.log('Ща должен быть рефреш')
    lightbox.refresh();
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
      lightbox.refresh();
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
  if (!isAll) {
    loadMoreBtn.style.display = '';
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  return isAll;
}
