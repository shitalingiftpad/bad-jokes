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
        // Pass the deleteJoke method as a callback
        this.ui.displayJokeList(jokes, this.deleteJoke.bind(this));
    }

    // Delete jokes from the server
    async deleteJoke(index) {
        try {
            const response = await fetch(`http://localhost:3000/api/jokes/${index}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Joke deleted successfully');
                await this.loadJokes(); // Reload jokes after deletion
            } else {
                console.error('Failed to delete joke');
            }
        } catch (error) {
            console.error('Error deleting joke:', error);
        }
    }
}
