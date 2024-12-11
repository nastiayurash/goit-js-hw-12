
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const galleryElement = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('load-more');
const loadingIndicator = document.getElementById('loading-indicator');

let page = 1;
let query = '';
let totalHits = 0;
let loadedHits = 0;

function showLoader() {
  loadingIndicator.style.display = 'block';
}

function hideLoader() {
  loadingIndicator.style.display = 'none';
}

function toggleLoadMoreButton(show) {
  loadMoreButton.style.display = show ? 'block' : 'none';
}

function smoothScrollToNewContent() {
  const { height: cardHeight } = galleryElement.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = searchForm.querySelector('input').value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search term.' });
    return;
  }

  page = 1;
  loadedHits = 0;
  galleryElement.innerHTML = '';
  toggleLoadMoreButton(false);
  showLoader();

  try {
    const data = await fetchImages(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({ message: 'Sorry, no images found. Please try again!' });
    } else {
      totalHits = data.totalHits;
      loadedHits += data.hits.length;
      renderGallery(data.hits, galleryElement);

      if (loadedHits < totalHits) {
        toggleLoadMoreButton(true);
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Error fetching images. Please try again!' });
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      toggleLoadMoreButton(false);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadedHits += data.hits.length;
      renderGallery(data.hits, galleryElement);

      smoothScrollToNewContent();

      if (loadedHits >= totalHits) {
        toggleLoadMoreButton(false);
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Error fetching images. Please try again!' });
  }
});
