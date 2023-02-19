import axios from 'axios';

const API_KEY = '31544306-98c50720df0af9d375614fc16';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImage(images, page) {
  try {
    return await axios.get(
      `${BASE_URL}?q=${images}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  } catch (error) {
    console.error(error);
  }
}
