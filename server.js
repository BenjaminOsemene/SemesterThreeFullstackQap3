const express = require('express');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dal = require('./dal/dal');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // This parse JSON requests
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');

// GET - Main page
app.get('/', async (req, res) => {
    try {
        const players = await dal.getAllPlayers();
        res.render('index', { players, title: 'Basketball Players' });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching players', title: 'Error' });
    }
});

// Route for API testing page
app.get('/api-test', (req, res) => {
    res.render('api-test', { title: 'API Testing' });
});

// API Routes
// GET all players
app.get('/api/players', async (req, res) => {
    try {
        const players = await dal.getAllPlayers();
        res.json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET player by ID
app.get('/api/players/:id', async (req, res) => {
    try {
        const player = await dal.getPlayerById(req.params.id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET players by team
app.get('/api/players/team/:team', async (req, res) => {
    try {
        const players = await dal.getPlayersByTeam(req.params.team);
        res.json(players);
    } catch (error) {
        console.error('Error fetching players by team:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET players by position
app.get('/api/players/position/:position', async (req, res) => {
    try {
        const players = await dal.getPlayersByPosition(req.params.position);
        res.json(players);
    } catch (error) {
        console.error('Error fetching players by position:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST create new player
app.post('/api/players', async (req, res) => {
    try {
        const newPlayer = await dal.createPlayer(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(400).json({ error: 'Error creating player' });
    }
});

// PUT update player (full update)
app.put('/api/players/:id', async (req, res) => {
    try {
        const updatedPlayer = await dal.updatePlayer(req.params.id, req.body);
        if (updatedPlayer) {
            res.json(updatedPlayer);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(400).json({ error: 'Error updating player' });
    }
});

// PATCH update player (partial update)
app.patch('/api/players/:id', async (req, res) => {
    try {
        const updatedPlayer = await dal.partialUpdatePlayer(req.params.id, req.body);
        if (updatedPlayer) {
            res.json(updatedPlayer);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(400).json({ error: 'Error updating player' });
    }
});

// DELETE player
app.delete('/api/players/:id', async (req, res) => {
    try {
        const deletedPlayer = await dal.deletePlayer(req.params.id);
        if (deletedPlayer) {
            res.json({ message: 'Player deleted successfully' });
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({ error: 'Error deleting player' });
    }
});

// UI Routes (these remain unchanged)
app.post('/players', async (req, res) => {
    try {
        await dal.createPlayer(req.body);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('error', { message: 'Error creating player', title: 'Error' });
    }
});

app.get('/players/:id/edit', async (req, res) => {
    try {
        const player = await dal.getPlayerById(req.params.id);
        res.render('edit-player', { player, title: 'Edit Player' });
    } catch (error) {
        res.status(404).render('error', { message: 'Player not found', title: 'Error' });
    }
});

app.put('/players/:id', async (req, res) => {
    try {
        await dal.updatePlayer(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('error', { message: 'Error updating player', title: 'Error' });
    }
});

app.patch('/players/:id', async (req, res) => {
    try {
        await dal.partialUpdatePlayer(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('error', { message: 'Error updating player', title: 'Error' });
    }
});

app.delete('/players/:id', async (req, res) => {
    try {
        await dal.deletePlayer(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { message: 'Error deleting player', title: 'Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



