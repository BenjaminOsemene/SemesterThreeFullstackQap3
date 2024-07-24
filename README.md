# SemesterThreeFullstackQap3
This fullstack project is for Basketball Player Management System that provides both a RESTful API and a user interface (UI) for managing basketball player information. It implements all CRUD (Create, Read, Update, Delete) operations, allowing users to interact with player data through both the API and UI.

# Main Features
- Data Access Layer for retrieving data from database(postgreSQL)
- RESTful API for managing player data
- User interface for easy interaction

# Testing the Application - Data Acess Layer 
- Test cases created for each CRUD function 
- Running  npm test, fetches all player data, create new player, update and remove player data.

# Testing the Application - User Interface
- Start the server by running node server
- Navigate to localhost:3000 which handles the UI routes
- This renders the index page(home) listing basketball players
- To create a new player, go to  the "Add Player" section.
Fill in the player details in the form.
Click the "Submit" button to add the player.
- To update a player's information
Go to the edith button next to the player "Players List" section.
Update the player details in the form that appears.
Click update player button.
- To partially update a payer's information
Go to the edith button next to the player "Players List" section.
under partial update section fill the player details in the form that appears.
Click  partial update button.
- To Delete a Player:
In the "Players List" section, find the player you want to delete.
Click the "Delete" button next to the player's information.

# Testing the Application - API Endpoints
- Navigate to API Test 
- Click  "Get All Players" Button
Fetches a list of all players in JSON format
- Use an id and click "Get Player by ID" button
  Retrieves details of a Specific Player by id.
- Use a team and click "Get Player by Team" button
  Retrieves details of Players by team. 
- Use a position and click "Get Player by Position" button
  Retrieves details of Players by position. 
- Create a new player.
Fill the player details in the form that appears.
Click "Create Player" button. 
- Update a player.
Fill the player details in the form that appears.
Click "Update Player" button.
- Partially update a player.
Fill the player details in the form that appears.
Click "Patch Player" button.
- Delete a player.
Enter player id and click "Delete Player" button.

