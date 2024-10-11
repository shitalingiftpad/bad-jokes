class UpdateJokeRequest {
    constructor(req) {
        this.joke = req.body.joke;
        this.id = parseInt(req.params.id, 10);
    }

    validate() {
        if (isNaN(this.id) || this.id < 0) {
            throw new Error('Invalid joke ID.');
        }
        if (!this.joke || typeof this.joke !== 'string' || this.joke.trim() === '') {
            throw new Error('Invalid joke content.');
        }
    }

    getId() {
        return this.id;
    }

    getJoke() {
        return this.joke.trim();
    }
}

module.exports = UpdateJokeRequest;
