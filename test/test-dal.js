//This is a test for the data access layer(DAL) which manages basketbal_players info
const dal = require('../dal/dal');
//It is asynchronous function allowing the use of await
//Testing various functions like getAllPlayers, createPlayer, updatePlayer,deletePlayer,getPlayersByTeam,getPlayersByPosition, getPlayerByid
//Functions called and  uses try - catch block to handle errors that might occur during the testing ca
//Then each test logging to the console showing what is tested and result
async function runTests() {
  try {
    console.log("1. Testing getAllPlayers (Web page listing and API fetch)...");
    const allPlayers = await dal.getAllPlayers();
    console.log("All players:", JSON.stringify(allPlayers, null, 2));

    console.log("\n3. Testing createPlayer...");
    const newPlayer = await dal.createPlayer({
      first_name: "Test",
      last_name: "Player",
      team: "Test Team",
      position: "Guard",
      height: 185,
      age: 25,
      jersey_number: 99
    });
    console.log("New player created:", newPlayer);

    console.log("\n4. Testing updatePlayer...");
    const updatedPlayer = await dal.updatePlayer(newPlayer.id, {
      ...newPlayer,
      team: "Updated Team"
    });
    console.log("Player updated:", updatedPlayer);

    console.log("\n5. Testing deletePlayer...");
    const deletedPlayer = await dal.deletePlayer(newPlayer.id);
    console.log("Player deleted:", deletedPlayer);

    console.log("\n6. Testing getPlayersByTeam...");
    const teamPlayers = await dal.getPlayersByTeam("Los Angeles Lakers");
    console.log("Players from Los Angeles Lakers:", teamPlayers);

    console.log("\n7. Testing getPlayersByPosition...");
    const positionPlayers = await dal.getPlayersByPosition("Point Guard");
    console.log("Point Guards:", positionPlayers);

    console.log("\n8. Testing getPlayerById...");
    const specificPlayer = await dal.getPlayerById(1);
    console.log("Player with ID 1:", specificPlayer);

    // Note: The following tests are not directly supported by your current DAL functions
    // but are included in the test cases. You may want to implement these in your DAL later.

    /*console.log("\n9. Retrieving players above a certain height is not directly supported by the current DAL.");
    
    console.log("\n10. Updating multiple players' team information in a single operation is not directly supported by the current DAL.");
    
    console.log("\n11. Viewing a list of all teams is not directly supported by the current DAL.");
    
    console.log("\n12. Fetching a player's statistics by ID is not directly supported by the current DAL.");
*/

  } catch (error) {
    console.error("An error occurred during testing:", error);
  }
}
runTests();