export default function Fetch(inputValue, page, PER_PAGE) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = 'key=24940342-42b3a055a9e1adb2b613cb878';
  //   const PER_PAGE = 12;
  return fetch(
    `${BASE_URL}?q=${inputValue}&page=${page}&${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
}
