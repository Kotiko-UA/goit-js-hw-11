import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const API_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true&';
const API_KEY = 'key=38382365-2ce894cbac0e5297650bdbdb4';
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};
const optionsScroll = {
  root: null,
  rootMargin: '1000px',
  threshold: 0,
};
const observer = new IntersectionObserver(onPagination, optionsScroll);
refs.form.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImgClick);

let counter = 0;
let totalPageCounter = 0;
let searchQuery = '';
let showFindAndScroll = true;

function onSearch(e) {
  e.preventDefault();
  observer.unobserve(refs.guard);
  counter = 0;
  totalPageCounter = 0;
  showFindAndScroll = true;
  refs.gallery.innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  getImg(searchQuery);
}

function onPagination(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      getImg(searchQuery);
    }
  });
}

async function getImg(query) {
  counter += 1;
  totalPageCounter += 40;
  try {
    const data = await axios.get(
      `${API_URL}${API_KEY}&q=${query}&per_page=40&page=${counter}`
    );
    if (data.status !== 200) {
      throw new Error(data.status);
    }
    if (data.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    galleryMarkup(data);
    if (showFindAndScroll) {
      Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
      showFindAndScroll = false;
    }

    if (totalPageCounter > data.data.totalHits) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      observer.unobserve(refs.guard);
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const optionSimple = {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};
let imgGallery = new SimpleLightbox(
  '.gallery .photo-card .img-link',
  optionSimple
);

function galleryMarkup(imgData) {
  const markup = imgData.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = {}) => {
        return `<div class="photo-card">
        <a class="img-link" href="${largeImageURL}">
        <img width="320" class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
        <p class="info-item"><b>Likes</b>${likes}</p>
        <p class="info-item"><b>Views</b>${views}</p>
        <p class="info-item"><b>Comments</b>${comments}</p>
        <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
        </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  imgGallery.refresh();
  observer.observe(refs.guard);
}

function onImgClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('gallery-image')) {
    imgGallery.on('show .simplelightbox');
  }
}
