// Import actions
const getAllJokesAction = require('../actions/getAllJokes');
const getJokeByIdAction = require('../actions/getJokeById');
const addJokeAction = require('../actions/addJoke');
const updateJokeByIdAction = require('../actions/updateJokeById');
const deleteJokeAction = require('../actions/deleteJoke');

// Import request validation classes
const AddJokeRequest = require('../requests/AddJokeRequest');
const UpdateJokeRequest = require('../requests/UpdateJokeRequest');
const DeleteJokeRequest = require('../requests/DeleteJokeRequest');

/**
 * Controller method to get all jokes.
 */
const getAllJokes = async (req, res) => {
    try {
        const jokes = await getAllJokesAction();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller method to get a joke by ID.
 */
const getJokeById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const joke = await getJokeByIdAction(id);
        res.json({ joke });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/**
 * Controller method to add a new joke.
 */
const addJoke = async (req, res) => {
    try {
        // Validate the request using AddJokeRequest
        const request = new AddJokeRequest(req);
        request.validate();

        // Call the action to add the joke
        await addJokeAction(request.getJoke(), req);

        res.status(201).json({ message: 'Joke added successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Controller method to update a joke by ID.
 */
const updateJokeById = async (req, res) => {
    try {
        // Validate the request using UpdateJokeRequest
        const request = new UpdateJokeRequest(req);
        request.validate();

        // Call the action to update the joke
        await updateJokeByIdAction(request.getId(), request.getJoke(), req);

        res.json({ message: 'Joke updated successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Controller method to delete a joke by ID.
 */
const deleteJoke = async (req, res) => {
    try {
        // Validate the request using DeleteJokeRequest
        const request = new DeleteJokeRequest(req);
        request.validate();

        // Call the action to delete the joke
        await deleteJokeAction(request.getId(), req);

        res.json({ message: 'Joke deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Export controller methods
module.exports = {
    getAllJokes,
    getJokeById,
    addJoke,
    updateJokeById,
    deleteJoke,
};
