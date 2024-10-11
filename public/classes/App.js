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

        document.getElementById('addJokeButton').addEventListener('click', () => {
            const newJoke = document.getElementById('newJoke').value.trim();
            if (newJoke) {
                this.storeJoke(newJoke);
            } else {
                this.ui.showMessage('Please enter a joke before adding.', 'error');
            }
        });

        this.ui.saveEditButton.addEventListener('click', () => this.saveEditedJoke());
    }

    // Load jokes from the server and display them
    async loadJokes() {
        const jokes = await this.jokeManager.fetchJokes();
        // Pass the deleteJoke method as a callback
        this.ui.displayJokeList(jokes, this.deleteJoke.bind(this));
        this.ui.displayJokeList(jokes, this.deleteJoke.bind(this), this.showEditModal.bind(this));
    }

    // Delete jokes from the server
    async deleteJoke(index) {
        try {
            const response = await fetch(`http://localhost:3000/api/jokes/${index}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.ui.showMessage('Joke deleted successfully.', 'success');
                await this.loadJokes();
            } else {
                const data = await response.json();
                this.ui.showMessage(data.message, 'error');  
            }
        } catch (error) {
            console.error('Error deleting joke:', error);
        }
    }

    async showEditModal(index) {
        this.currentEditIndex = index; 

        try {
            // Fetch the current joke from the server
            const response = await fetch(`http://localhost:3000/api/jokes/${index}`);

            if (response.ok) {
                const { joke } = await response.json();
                this.ui.showEditModal(joke);
            } else {
                this.ui.showMessage('Failed to load joke for editing.', 'error');
            }
        } catch (error) {
            this.ui.showMessage('Error fetching joke.', 'error');
            console.error('Error fetching joke:', error);
        }
    }

    async saveEditedJoke() {
        const updatedJoke = this.ui.editJokeInput.value.trim();

        if (!updatedJoke) {
            this.ui.showMessage('Joke cannot be empty.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/jokes/${this.currentEditIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ joke: updatedJoke }),
            });

            if (response.ok) {
                console.log('Joke updated successfully');
                this.ui.showMessage('Joke updated successfully.', 'success');
                this.ui.closeEditModal();
                await this.loadJokes();
            } else {
                this.ui.showMessage('Failed to update joke.', 'error');
            }
        } catch (error) {
            this.ui.showMessage('Error updating joke.', 'error');
            console.error('Error updating joke:', error);
        }
    }

    async storeJoke(joke) {
        try {
            const response = await fetch(`http://localhost:3000/api/jokes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ joke }),
            });

            if (response.ok) {
                console.log('Joke added successfully');
                this.ui.showMessage('Joke added successfully.', 'success');
                document.getElementById('newJoke').value = '';
                await this.loadJokes(); 
            } else {
                this.ui.showMessage('Failed to add joke.', 'error');
                console.error('Failed to add joke');
            }
        } catch (error) {
            this.ui.showMessage('Error adding joke.', 'error');
            console.error('Error adding joke:', error);
        }
    }
}
