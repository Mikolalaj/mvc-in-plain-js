var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Model = /** @class */ (function () {
    function Model() {
        this.movies = [
            { id: 1, title: 'Run a marathon', watched: false, rating: null },
            { id: 2, title: 'Plant a garden', watched: true, rating: 7 },
        ];
    }
    Model.prototype.addMovie = function (title) {
        var newMovie = {
            id: this.movies.length + 1,
            title: title,
            watched: false,
            rating: null
        };
        this.movies.push(newMovie);
    };
    Model.prototype.editMovie = function (id, title, rating) {
        this.movies = this.movies.map(function (movie) {
            return movie.id === id ? __assign(__assign({}, movie), { title: title, rating: rating }) : movie;
        });
    };
    Model.prototype.deleteMovie = function (id) {
        this.movies = this.movies.filter(function (movie) { return movie.id !== id; });
    };
    Model.prototype.toggleMovie = function (id) {
        this.movies = this.movies.map(function (movie) {
            return movie.id === id ? __assign(__assign({}, movie), { watched: !movie.watched, watchDate: movie.watched ? null : new Date() }) : movie;
        });
    };
    return Model;
}());
var View = /** @class */ (function () {
    function View() {
        this.app = this.getElement('#root');
        this.title = this.createElement('h1');
        this.title.textContent = 'Movie list';
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Movie title';
        this.input.name = 'movie';
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.moviesList = this.createElement('ul', 'movies-list');
        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.moviesList);
    }
    View.prototype.displayMovies = function (movies) {
        var _this = this;
        while (this.moviesList.firstChild) {
            this.moviesList.removeChild(this.moviesList.firstChild);
        }
        if (movies.length === 0) {
            var p = this.createElement('p');
            p.textContent = 'Add new movie to watch!';
            this.moviesList.append(p);
        }
        else {
            // Create movie item nodes for each movie in state
            movies.forEach(function (movie) {
                var li = _this.createElement('li');
                li.id = movie.id.toString();
                // The movie item text will be in a contenteditable span
                var span = _this.createElement('span');
                span.contentEditable = 'true';
                span.classList.add('editable');
                var ratingWrapper = _this.createElement('span');
                var rating = _this.createElement('span');
                rating.contentEditable = 'true';
                rating.classList.add('editable');
                rating.textContent = movie.rating !== null ? movie.rating.toString() : '';
                var ratingRange = _this.createElement('span');
                ratingRange.textContent = '/10';
                ratingWrapper.append(rating, ratingRange);
                span.textContent = movie.title;
                // The movies will also have a delete button
                var deleteButton = _this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(ratingWrapper, span, deleteButton);
                // Append nodes to the movies list
                _this.moviesList.append(li);
            });
        }
    };
    View.prototype.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    };
    View.prototype.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };
    Object.defineProperty(View.prototype, "_movieText", {
        get: function () {
            return this.input.value;
        },
        enumerable: false,
        configurable: true
    });
    View.prototype._resetInput = function () {
        this.input.value = '';
    };
    return View;
}());
var Controller = /** @class */ (function () {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
        // Display initial todos
        this.onMovieListChanged(this.model.movies);
    }
    Controller.prototype.onMovieListChanged = function (movies) {
        this.view.displayMovies(movies);
    };
    return Controller;
}());
var app = new Controller(new Model(), new View());
//# sourceMappingURL=script.js.map