// import './css/utils/fontawesome.min.css'
import './css/main.css';


import { modalOpen, changeLightboxImage } from './js/modalInterface';

export const gallery = document.querySelector('.js-gallery');
export const lightbox = document.querySelector('.js-lightbox');
export const lightboxImage = lightbox.querySelector('.lightbox__image');
export const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');
export const modalClsBtn = lightbox.querySelector('button[data-action="close-lightbox"]');

