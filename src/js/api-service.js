import getRefs from './refs'

const refs = getRefs();
const { notice, error } = require('@pnotify/core');
const ANATOLII_API_KEY = '6ab460452e9d6fb8f59cab399bd5ef0f';

export default class fetchFilms {
    constructor() {
        this.searchQuery = 'THOR';
        this.page = 1;
    }

    async getPopularFilms() {
        try {
            const response = await fetch(`${refs.API_URL}/trending/movie/week?api_key=${ANATOLII_API_KEY}`)
            const filmsCollection = response.json();
            return filmsCollection;
        } catch (err) {
            notice({
                text: 'An error occured! Please try again later.',
                width: '450px',
                delay: 3500,
            })
        }
    }

    async getSearchFilms() {
        try {
            const response = await fetch(`${refs.API_URL}/search/movie?api_key=${ANATOLII_API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`);
            const filmsCollection = response.json();
            this.incrementPage();
            return filmsCollection;
        } catch (err) {
            notice({
                text: 'An error occured! Please try again later.',
                width: '450px',
                delay: 3500,
            })
        }
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