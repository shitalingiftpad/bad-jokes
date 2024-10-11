const express = require('express');
const path = require('path');
const jokesRoutes = require('./routes/jokesRoutes');
const { ADDRESS, PORT } = require('./config'); 
const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());

app.use('/api', jokesRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${ADDRESS}`);
});
