const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  getPlayersByTeam,
  getPlayersByPosition,
  createPlayer,
  updatePlayer,
  deletePlayer
} = require('../dal/dal');


//GET all players
router.get('/', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific player
router.get('/:id', async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET players by team
router.get('/team/:team', async (req, res) => {
  try {
    const players = await getPlayersByTeam(req.params.team);
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET players by position
router.get('/position/:position', async (req, res) => {
  try {
    const players = await getPlayersByPosition(req.params.position);
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST implemented by creating a new player
router.post('/', async (req, res) => {
  try {
    const newPlayer = await createPlayer(req.body);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// This PUT method updates players fully
router.put('/:id', async (req, res) => {
  try {
    const updatedPlayer = await updatePlayer(req.params.id, req.body);
    if (updatedPlayer) {
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PATCH method for partial update of a player
router.patch('/:id', async (req, res) => {
    try {
      const updatedPlayer = await partialUpdatePlayer(req.params.id, req.body);
      if (updatedPlayer) {
        res.json(updatedPlayer);
      } else {
        res.status(404).json({ message: 'Player not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// Deleting  a player
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlayer = await deletePlayer(req.params.id);
    if (deletedPlayer) {
      res.json({ message: 'Player deleted successfully', player: deletedPlayer });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;