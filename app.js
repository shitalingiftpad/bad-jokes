class JokeManager {
    constructor() {
        this.jokes = JSON.parse(localStorage.getItem('jokes')) || this.defaultJokes();
    }

    defaultJokes() {
        return [
            "Why don't skeletons fight each other? They don't have the guts.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I would avoid the sushi if I was you. It’s a little fishy.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "What do you call fake spaghetti? An impasta."
        ];
    }

    getJokes() {
        return this.jokes;
    }

    addJoke(joke) {
        this.jokes.push(joke);
        this.saveJokes();
    }

    deleteJoke(index) {
        this.jokes.splice(index, 1);
        this.saveJokes();
    }

    saveJokes() {
        localStorage.setItem('jokes', JSON.stringify(this.jokes));
    }
}

class UI {
    constructor() {
        this.jokeDisplay = document.getElementById('jokeDisplay');
        this.jokeList = document.getElementById('jokeList');
        this.newJokeInput = document.getElementById('newJoke');
    }

    displayRandomJoke(jokes) {
        if (jokes.length > 0) {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            this.jokeDisplay.textContent = jokes[randomIndex];
            this.jokeDisplay.classList.add('show');
            setTimeout(() => this.jokeDisplay.classList.remove('show'), 1000);
        } else {
            this.jokeDisplay.textContent = "No jokes available! Add some bad jokes!";
        }
    }

    displayJokeList(jokes, deleteCallback) {
        this.jokeList.innerHTML = '';
        jokes.forEach((joke, index) => {
            const jokeItem = document.createElement('div');
            jokeItem.classList.add('joke-item');

            const jokeText = document.createElement('span');
            jokeText.textContent = joke;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => deleteCallback(index));

            jokeItem.appendChild(jokeText);
            jokeItem.appendChild(deleteButton);
            this.jokeList.appendChild(jokeItem);
        });
    }

    getNewJoke() {
        return this.newJokeInput.value.trim();
    }

    clearNewJokeInput() {
        this.newJokeInput.value = '';
    }
}

class App {
    constructor() {
        this.jokeManager = new JokeManager();
        this.ui = new UI();
        this.bindEvents();
        this.ui.displayJokeList(this.jokeManager.getJokes(), this.deleteJoke.bind(this));
    }

    bindEvents() {
        document.getElementById('randomJokeButton').addEventListener('click', () => {
            this.ui.displayRandomJoke(this.jokeManager.getJokes());
        });

        document.getElementById('addJokeButton').addEventListener('click', () => {
            const newJoke = this.ui.getNewJoke();
            if (newJoke) {
                this.addJoke(newJoke);
            }
        });
    }

    addJoke(joke) {
        this.jokeManager.addJoke(joke);
        this.ui.clearNewJokeInput();
        this.ui.displayJokeList(this.jokeManager.getJokes(), this.deleteJoke.bind(this));
    }

    deleteJoke(index) {
        this.jokeManager.deleteJoke(index);
        this.ui.displayJokeList(this.jokeManager.getJokes(), this.deleteJoke.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
