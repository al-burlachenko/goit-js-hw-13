import { gallery, lightbox, lightboxImage, lightboxOverlay, modalClsBtn } from '../index';
export { modalOpen, changeLightboxImage };

function modalClose(event) {
  if (event.code !== 'Escape' && event.target !== event.currentTarget) {
    return;
  }

  modalClsBtn.removeEventListener('click', modalClose);
  lightbox.classList.remove('is-open');

  lightboxOverlay.removeEventListener('click', modalClose);
  window.removeEventListener('keydown', modalClose);
  window.removeEventListener('keydown', modalKeyInterface);

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
}

function modalOpen(event) {
  modalClsBtn.addEventListener('click', modalClose);
  lightbox.classList.add('is-open');

  lightboxOverlay.addEventListener('click', modalClose);

  window.addEventListener('keydown', modalClose);
  window.addEventListener('keydown', modalKeyInterface);
}

function changeLightboxImage(src, alt) {
  lightboxImage.setAttribute('src', src);
  lightboxImage.setAttribute('alt', alt);
}

function modalKeyInterface(event) {
  const imgArray = [];
  const itemsArray = gallery.querySelectorAll('.gallery__image');

  [...itemsArray].forEach(element => {
    imgArray.push(element.dataset.source);
  });

  const currentSrc = lightboxImage.getAttribute('src');
  let index = imgArray.indexOf(currentSrc);

  if (event.code === 'ArrowRight') {
    if (index >= itemsArray.length - 1) {
      index = -1;
    }
    index += 1;
  }

  if (event.code === 'ArrowLeft') {
    if (index <= 0) {
      index = itemsArray.length;
    }
    console.log(index);
    index -= 1;
  }

  const src = itemsArray[index].dataset.source;
  const alt = itemsArray[index].getAttribute('alt');
  changeLightboxImage(src, alt);
}