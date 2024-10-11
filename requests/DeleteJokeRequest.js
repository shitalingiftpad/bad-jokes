class DeleteJokeRequest {
    constructor(req) {
        this.id = parseInt(req.params.id, 10);
    }

    validate() {
        if (isNaN(this.id) || this.id < 0) {
            throw new Error('Invalid joke ID.');
        }
    }

    getId() {
        return this.id;
    }
}

module.exports = DeleteJokeRequest;
