const express = require('express');
const { getAllJokes, deleteJoke, getJokeById, updateJokeById } = require('../controllers/jokesController');
const router = express.Router();

router.get('/jokes', getAllJokes);
router.get('/jokes/:id', getJokeById);
router.put('/jokes/:id', updateJokeById);
router.delete('/jokes/:id', deleteJoke);

module.exports = router;
