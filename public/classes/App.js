import JokeManager from './JokeManager.js';
import UI from './UI.js';

export default class App {
    constructor() {
        this.jokeManager = new JokeManager();
        this.ui = new UI();
        this.initialize();
    }

    // Initialize the app by loading jokes and binding events
    async initialize() {
        await this.loadJokes();
        this.bindEvents();
    }

    // Bind event listeners
    bindEvents() {
        document.getElementById('randomJokeButton').addEventListener('click', () => {
            this.ui.displayRandomJoke(this.jokeManager.getJokes());
        });
    }

    // Load jokes from the server and display them
    async loadJokes() {
        const jokes = await this.jokeManager.fetchJokes();
        this.ui.displayJokeList(jokes);
    }
}
