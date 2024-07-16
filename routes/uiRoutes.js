const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  getPlayersByTeam,
  getPlayersByPosition,
  createPlayer,
  updatePlayer,
  deletePlayer,
  partialUpdatePlayer
} = require('../dal/dal');

// Home page (GET)
router.get('/', (req, res) => {
  res.render('index');
});

// Player list page (GET)
router.get('/players', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.render('players', { players });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching players' });
  }
});

// Add player page (GET)
router.get('/add-player', (req, res) => {
  res.render('addPlayer');
});

// Add player form submission (POST)
router.post('/add-player', async (req, res) => {
  try {
    const newPlayer = await createPlayer(req.body);
    res.redirect('/players');
  } catch (error) {
    res.status(400).render('error', { message: 'Error creating player' });
  }
});

// Edit player page (GET)
router.get('/edit-player/:id', async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (player) {
      res.render('editPlayer', { player });
    } else {
      res.status(404).render('error', { message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching player' });
  }
});

// Update player (PUT)
router.put('/edit-player/:id', async (req, res) => {
  try {
    const updatedPlayer = await updatePlayer(req.params.id, req.body);
    if (updatedPlayer) {
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating player' });
  }
});

// Partial update player (PATCH)
router.patch('/edit-player/:id', async (req, res) => {
  try {
    const updatedPlayer = await partialUpdatePlayer(req.params.id, req.body);
    if (updatedPlayer) {
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating player' });
  }
});

// Delete player (DELETE)
router.delete('/delete-player/:id', async (req, res) => {
  try {
    const deletedPlayer = await deletePlayer(req.params.id);
    if (deletedPlayer) {
      res.json({ message: 'Player deleted successfully' });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting player' });
  }
});

// Players by team page (GET)
router.get('/players/team/:team', async (req, res) => {
  try {
    const players = await getPlayersByTeam(req.params.team);
    res.render('playersByTeam', { team: req.params.team, players });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching players by team' });
  }
});

// Players by position page (GET)
router.get('/players/position/:position', async (req, res) => {
  try {
    const players = await getPlayersByPosition(req.params.position);
    res.render('playersByPosition', { position: req.params.position, players });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching players by position' });
  }
});

module.exports = router;