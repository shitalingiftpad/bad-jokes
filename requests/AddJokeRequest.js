class AddJokeRequest {
    constructor(req) {
        this.joke = req.body.joke;
    }

    validate() {
        if (!this.joke || typeof this.joke !== 'string' || this.joke.trim() === '') {
            throw new Error('Invalid joke content.');
        }
    }

    getJoke() {
        return this.joke.trim();
    }
}

module.exports = AddJokeRequest;
