import { Movie } from './utils'

class Model {
    movies: Movie[]
    onMovieListChanged: (movies: Movie[]) => void
    constructor() {
        this.movies = JSON.parse(localStorage.getItem('movies')) || []
    }

    _commit(movies: Movie[]) {
        this.onMovieListChanged(movies)
        localStorage.setItem('movies', JSON.stringify(movies))
    }

    addMovie(title: string) {
        const newMovie = {
            id: this.movies.length + 1,
            title: title,
            watched: false,
            rating: null,
        }

        this.movies.push(newMovie)

        this._commit(this.movies)
    }

    editMovie(id: number, title: string) {
        this.movies = this.movies.map(movie => (movie.id === id ? { ...movie, title: title } : movie))

        this._commit(this.movies)
    }

    deleteMovie(id: number) {
        this.movies = this.movies.filter(movie => movie.id !== id)

        this._commit(this.movies)
    }

    toggleMovie(id: number) {
        this.movies = this.movies.map(movie => (movie.id === id ? { ...movie, watched: !movie.watched } : movie))

        this._commit(this.movies)
    }

    bindMovieListChanged(callback: (movies: Movie[]) => void) {
        this.onMovieListChanged = callback
    }
}

export default Model
