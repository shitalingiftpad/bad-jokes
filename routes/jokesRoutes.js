const express = require('express');
const { getAllJokes, deleteJoke, getJokeById, updateJokeById, addJoke} = require('../controllers/jokesController');
const router = express.Router();

router.get('/jokes', getAllJokes);
router.get('/jokes/:id', getJokeById);
router.put('/jokes/:id', updateJokeById);
router.delete('/jokes/:id', deleteJoke);
router.post('/jokes', addJoke);

module.exports = router;
