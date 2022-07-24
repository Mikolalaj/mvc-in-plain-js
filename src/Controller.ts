import { Movie } from './utils'
import Model from './Model'
import View from './View'

class Controller {
    model: Model
    view: View

    constructor(model: Model, view: View) {
        this.model = model
        this.view = view
        // Display initial movies
        this.onMovieListChanged(this.model.movies)

        this.view.bindAddMovie(this.handleAddMovie)
        this.view.bindDeleteMovie(this.handleDeleteMovie)
        this.view.bindToggleMovie(this.handleToggleMovie)
        this.view.bindEditMovie(this.handleEditMovie)
        this.model.bindMovieListChanged(this.onMovieListChanged)
    }

    onMovieListChanged = (movies: Movie[]) => {
        this.view.displayMovies(movies)
    }

    handleAddMovie = (movieTitle: string) => {
        this.model.addMovie(movieTitle)
    }

    handleEditMovie = (id: number, movieTitle: string) => {
        this.model.editMovie(id, movieTitle)
    }

    handleDeleteMovie = (id: number) => {
        this.model.deleteMovie(id)
    }

    handleToggleMovie = (id: number) => {
        this.model.toggleMovie(id)
    }
}

export default Controller
