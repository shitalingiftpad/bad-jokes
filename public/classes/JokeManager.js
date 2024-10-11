export default class JokeManager {
    constructor() {
        this.jokes = [];
        this.apiUrl = 'http://localhost:3000/api/jokes';
    }

    // Centralized method to make API requests
    async request(endpoint = '', method = 'GET', body = null) {
        try {
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' },
            };
            if (body) options.body = JSON.stringify(body);

            const response = await fetch(`${this.apiUrl}/${endpoint}`, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Fetch all jokes
    async fetchJokes() {
        this.jokes = await this.request();
        return this.jokes;
    }

    // Get the locally stored jokes
    getJokes() {
        return this.jokes;
    }

    // Add a new joke
    async addJoke(joke) {
        await this.request('', 'POST', { joke });
    }

    // Update an existing joke
    async updateJoke(id, joke) {
        await this.request(id, 'PUT', { joke });
    }

    // Delete a joke by ID
    async deleteJoke(id) {
        await this.request(id, 'DELETE');
    }
}
