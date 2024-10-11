export default class JokeManager {
    constructor() {
        this.jokes = [];
        this.apiUrl = 'http://localhost:3000/api/jokes';
    }

    // Fetch jokes from the server and update the local jokes array
    async fetchJokes() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Failed to fetch jokes from the server');
            this.jokes = await response.json();
        } catch (error) {
            console.error('Error fetching jokes:', error);
            this.jokes = []; // Fallback to an empty array if fetching fails
        }
        return this.jokes;
    }

    // Get the locally stored jokes
    getJokes() {
        return this.jokes;
    }
}
