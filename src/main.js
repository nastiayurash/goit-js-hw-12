
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const galleryElement = document.querySelector('.gallery');

const loadingIndicator = document.getElementById('loading-indicator');
let page = 1;

function showLoader() {
  loadingIndicator.style.display = 'block';
}

function hideLoader() {
  loadingIndicator.style.display = 'none';
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchForm.querySelector('input').value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter a search term.' });
    return;
  }

  page = 1;
  galleryElement.innerHTML = ''; 
  showLoader();

  try {
    const data = await fetchImages(query, page);
    hideLoader();
   if (!data.hits || data.hits.length === 0) {
    iziToast.error({ message: 'Sorry, no images found. Please try again!' });
} else {
    renderGallery(data.hits, galleryElement, true);
    
}

  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Error fetching images. Please try again!' });
  }
});

