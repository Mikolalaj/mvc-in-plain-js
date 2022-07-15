type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null // "dirty" solution but it's best here

type Movie = {
    id: number
    title: string
    watched: boolean
    rating: Rating
}

class Model {
    movies: Movie[]
    constructor() {
        this.movies = [
            { id: 1, title: 'Run a marathon', watched: false, rating: null },
            { id: 2, title: 'Plant a garden', watched: true, rating: 7 },
        ]
    }
  
    addMovie(title: string) {
        const newMovie = {
            id: this.movies.length + 1,
            title: title,
            watched: false,
            rating:  null
        }
  
        this.movies.push(newMovie)
    }
  
    editMovie(id: number, title: string, rating: Rating) {
        this.movies = this.movies.map(movie =>
            movie.id === id ? { ...movie, title: title, rating: rating } : movie,
        )
    }

    deleteMovie(id: number) {
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    toggleMovie(id: number) {
        this.movies = this.movies.map(movie =>
            movie.id === id ? { ...movie, watched: !movie.watched, watchDate: movie.watched ? null : new Date() } : movie,
        )
    }
}
  
class View {
    app: Element
    title: Element
    form: HTMLFormElement
    input: HTMLInputElement
    submitButton: HTMLButtonElement
    moviesList: HTMLUListElement

    constructor() {
        this.app = this.getElement('#root')

        this.title = this.createElement('h1')
        this.title.textContent = 'Movie list'

        this.form = this.createElement('form') as HTMLFormElement

        this.input = this.createElement('input') as HTMLInputElement
        this.input.type = 'text'
        this.input.placeholder = 'Movie title'
        this.input.name = 'movie'

        this.submitButton = this.createElement('button') as HTMLButtonElement
        this.submitButton.textContent = 'Submit'

        this.moviesList = this.createElement('ul', 'movies-list') as HTMLUListElement

        this.form.append(this.input, this.submitButton)

        this.app.append(this.title, this.form, this.moviesList)
    }

    displayMovies(movies: Movie[]) {
        while (this.moviesList.firstChild) {
            this.moviesList.removeChild(this.moviesList.firstChild)
        }
        
        if (movies.length === 0) {
            const p = this.createElement('p') as HTMLParagraphElement
            p.textContent = 'Add new movie to watch!'
            this.moviesList.append(p)
        } else {
            // Create movie item nodes for each movie in state
            movies.forEach(movie => {
                const li = this.createElement('li') as HTMLLIElement
                li.id = movie.id.toString()
            
                // The movie item text will be in a contenteditable span
                const span = this.createElement('span') as HTMLSpanElement
                span.contentEditable = 'true'
                span.classList.add('editable')
            
                const ratingWrapper = this.createElement('span') as HTMLSpanElement

                const rating = this.createElement('span') as HTMLSpanElement
                rating.contentEditable = 'true'
                rating.classList.add('editable')
                rating.textContent = movie.rating !== null ? movie.rating.toString() : ''

                const ratingRange = this.createElement('span') as HTMLSpanElement
                ratingRange.textContent = '/10'

                ratingWrapper.append(rating, ratingRange)

                span.textContent = movie.title

                // The movies will also have a delete button
                const deleteButton = this.createElement('button', 'delete') as HTMLButtonElement
                deleteButton.textContent = 'Delete'
                li.append(ratingWrapper, span, deleteButton)
            
                // Append nodes to the movies list
                this.moviesList.append(li)
            })
          }
    }

    createElement(tag: keyof HTMLElementTagNameMap, className?: string) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    getElement(selector: string): Element {
        const element = document.querySelector(selector)

        return element as Element
    }

    get _movieText() {
        return this.input.value
    }
    
    _resetInput() {
        this.input.value = ''
    }
}
  
class Controller {
    model: Model
    view: View
    constructor(model: Model, view: View) {
        this.model = model
        this.view = view
        // Display initial movies
        this.onMovieListChanged(this.model.movies)
    }

    onMovieListChanged(movies: Movie[]) {
        this.view.displayMovies(movies)
    }

    handleAddMovie(movieTitle: string) {
        this.model.addMovie(movieTitle)
    }
      
    handleEditMovie(id: number, movieTitle: string, rating: Rating) {
        this.model.editMovie(id, movieTitle, rating)
    }
      
    handleDeleteMovie(id: number) {
        this.model.deleteMovie(id)
    }
      
    handleToggleMovie(id: number) {
        this.model.toggleMovie(id)
    }
}

const app = new Controller(new Model(), new View())
