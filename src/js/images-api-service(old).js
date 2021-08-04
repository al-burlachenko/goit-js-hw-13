// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '22701944-f8f056c666d70ac6de5e1d35b';

// const parameters = {
//   key: API_KEY,
//   q: '',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: 1,
//   per_page: 40,
// };

// // fetch(BASE_URL, parameters)

// export default class ImageCardsService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchCards() {
//     const url = `${BASE_URL}?key=${parameters.key}&q=${this.searchQuery}&image_type=${parameters.image_type}&orientation=${parameters.orientation}&safesearch=${parameters.safesearch}&page=${this.page}`;

//     return fetch(url)
//       .then(response => response.json())
//       .then(pictures => {
//         // this.increment();

//         return pictures;
//       });
//   }

//   increment() {
//     this.page += 1;
//     console.log(this.page);
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
