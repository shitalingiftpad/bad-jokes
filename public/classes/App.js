import JokeManager from './JokeManager.js';
import UI from './UI.js';

export default class App {
    constructor() {
        this.jokeManager = new JokeManager();
        this.ui = new UI();
        this.currentEditIndex = null;
        this.initialize();
    }

    async initialize() {
        await this.handleErrors(() => this.loadJokes());
        this.bindEvents();
    }

    bindEvents() {
        this.attachEvent('randomJokeButton', 'click', () => {
            this.ui.displayRandomJoke(this.jokeManager.getJokes());
        });

        this.attachEvent('addJokeButton', 'click', async () => {
            const newJoke = this.ui.getNewJokeInput();
            if (newJoke) {
                await this.handleErrors(() => this.storeJoke(newJoke));
            } else {
                this.ui.showMessage('Please enter a joke before adding.', 'error');
            }
        });

        this.ui.onEditSave(() => this.handleErrors(() => this.saveEditedJoke()));
    }

    attachEvent(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    async handleErrors(action) {
        try {
            await action();
        } catch (error) {
            this.ui.showMessage(error.message || 'An unexpected error occurred', 'error');
            console.error(error);
        }
    }

    async loadJokes() {
        const jokes = await this.jokeManager.fetchJokes();
        this.ui.displayJokeList(jokes, this.deleteJoke.bind(this), this.showEditModal.bind(this));
    }

    async storeJoke(joke) {
        await this.jokeManager.addJoke(joke);
        this.ui.showMessage('Joke added successfully.', 'success');
        this.ui.clearNewJokeInput();
        await this.loadJokes();
    }

    async deleteJoke(index) {
        await this.jokeManager.deleteJoke(index);
        this.ui.showMessage('Joke deleted successfully.', 'success');
        await this.loadJokes();
    }

    async showEditModal(index) {
        const joke = this.jokeManager.getJokes()[index];
        this.ui.showEditModal(joke);
        this.currentEditIndex = index;
    }

    async saveEditedJoke() {
        const updatedJoke = this.ui.getEditJokeInput();
        if (!updatedJoke) {
            this.ui.showMessage('Joke cannot be empty.', 'error');
            return;
        }

        await this.jokeManager.updateJoke(this.currentEditIndex, updatedJoke);
        this.ui.showMessage('Joke updated successfully.', 'success');
        this.ui.closeEditModal();
        await this.loadJokes();
    }
}
