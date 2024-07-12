//Here pg package is used to connect to postgreSQL
const { Pool } = require('pg');

// Create pool instance to manage database connections
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Functions to implement CRUD operations such as GET,POST,PUT/PATCH,DELETE
//Using async/await for handling promises
//Errors logged to the console and thrown
//Returns result from the database which are promises
async function getAllPlayers() {
  try {
    const result = await pool.query('SELECT * FROM basketball_players');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllPlayers:', error);
    throw error;
  }
}

async function getPlayerById(id) {
  try {
    const result = await pool.query('SELECT * FROM basketball_players WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getPlayerById:', error);
    throw error;
  }
}

async function getPlayersByTeam(team) {
  try {
    const result = await pool.query('SELECT * FROM basketball_players WHERE team = $1', [team]);
    return result.rows;
  } catch (error) {
    console.error('Error in getPlayersByTeam:', error);
    throw error;
  }
}

async function getPlayersByPosition(position) {
  try {
    const result = await pool.query('SELECT * FROM basketball_players WHERE position = $1', [position]);
    return result.rows;
  } catch (error) {
    console.error('Error in getPlayersByPosition:', error);
    throw error;
  }
}

async function createPlayer(player) {
  const { first_name, last_name, team, position, height, age, jersey_number } = player;
  try {
    const result = await pool.query(
      'INSERT INTO basketball_players (first_name, last_name, team, position, "height(cm)", age, jersey_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [first_name, last_name, team, position, height, age, jersey_number]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in createPlayer:', error);
    throw error;
  }
}

async function updatePlayer(id, player) {
  const { first_name, last_name, team, position, height, age, jersey_number } = player;
  try {
    const result = await pool.query(
      'UPDATE basketball_players SET first_name = $1, last_name = $2, team = $3, position = $4, "height(cm)" = $5, age = $6, jersey_number = $7 WHERE id = $8 RETURNING *',
      [first_name, last_name, team, position, height, age, jersey_number, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in updatePlayer:', error);
    throw error;
  }
}

async function deletePlayer(id) {
  try {
    const result = await pool.query('DELETE FROM basketball_players WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in deletePlayer:', error);
    throw error;
  }
}

//Exporting all functions for use 
module.exports = {
  getAllPlayers,
  getPlayerById,
  getPlayersByTeam,
  getPlayersByPosition,
  createPlayer,
  updatePlayer,
  deletePlayer,
};