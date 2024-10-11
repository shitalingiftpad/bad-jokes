const express = require('express');
const { getAllJokes, deleteJoke } = require('../controllers/jokesController');
const router = express.Router();

router.get('/jokes', getAllJokes);

router.delete('/jokes/:id', deleteJoke);

module.exports = router;
