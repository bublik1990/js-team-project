const ANATOLII_API_KEY = '6ab460452e9d6fb8f59cab399bd5ef0f';
const API_URL = 'https://api.themoviedb.org/3'


export default class fetchFilms {
    constructor() {
        this.searchQuery = 'THOR';
        this.page = 1;
    }

    async getPopularFilms() {
        const response = await fetch(`${API_URL}/trending/movie/week?api_key=${ANATOLII_API_KEY}`)
        const filmsCollection = response.json();
        return filmsCollection;
    }

    async getSearchFilms() {
        const response = await fetch(`${API_URL}/search/movie?api_key=${ANATOLII_API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`);
        const filmsCollection = response.json();
        this.incrementPage();
        
        return filmsCollection;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    returnPage() {
        return this.page
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}