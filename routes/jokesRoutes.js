const express = require('express');
const { getAllJokes } = require('../controllers/jokesController');
const router = express.Router();

router.get('/jokes', getAllJokes);

module.exports = router;
