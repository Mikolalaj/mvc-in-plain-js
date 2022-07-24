import { Movie } from './utils'

class View {
    app: Element
    title: Element
    form: HTMLFormElement
    input: HTMLInputElement
    submitButton: HTMLButtonElement
    moviesList: HTMLUListElement
    private _temporaryMovieTitle: string

    constructor() {
        this.app = this.getElement('#root')

        this.title = this.createElement('h1')
        this.title.textContent = 'Movie list'

        this.form = this.createElement('form') as HTMLFormElement

        this.input = this.createElement('input', 'movie-title') as HTMLInputElement
        this.input.type = 'text'
        this.input.placeholder = 'Movie title'
        this.input.name = 'movie'

        this.submitButton = this.createElement('button') as HTMLButtonElement
        this.submitButton.textContent = 'Submit'

        this.moviesList = this.createElement('ul', 'movies-list') as HTMLUListElement

        this.form.append(this.input, this.submitButton)

        this.app.append(this.title, this.form, this.moviesList)

        this._initLocalListeners()
    }

    // Update temporary state
    private _initLocalListeners() {
        this.moviesList.addEventListener('input', (event: any) => {
            if (event.target.className === 'editable') {
                this._temporaryMovieTitle = event.target.innerText
            }
        })
    }

    // Send the completed value to the model
    bindEditMovie(handler: (id: number, title: string) => void) {
        this.moviesList.addEventListener('focusout', (event: any) => {
            if (this._temporaryMovieTitle) {
                const id = parseInt(event.target.parentElement.id)

                handler(id, this._temporaryMovieTitle)
                this._temporaryMovieTitle = ''
            }
        })
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

                // Each movie item will have a checkbox you can toggle
                const checkbox = this.createElement('input') as HTMLInputElement
                checkbox.type = 'checkbox'
                checkbox.checked = movie.watched

                // The movie item text will be in a contenteditable span
                const span = this.createElement('span') as HTMLSpanElement
                span.contentEditable = 'true'
                span.classList.add('editable')

                // If the movie is watched, it will have a strikethrough
                if (movie.watched) {
                    const strike = this.createElement('s') as HTMLTimeElement
                    strike.textContent = movie.title
                    span.append(strike)
                } else {
                    // Otherwise just display the title
                    span.textContent = movie.title
                }

                // The movies will also have a delete button
                const deleteButton = this.createElement('button', 'delete') as HTMLButtonElement
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

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

    bindAddMovie(handler: (title: string) => void) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._movieText) {
                handler(this._movieText)
                this._resetInput()
            }
        })
    }

    bindDeleteMovie(handler: (id: number) => void) {
        this.moviesList.addEventListener('click', (event: any) => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    bindToggleMovie(handler: (id: number) => void) {
        this.moviesList.addEventListener('change', (event: any) => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }
}

export default View
