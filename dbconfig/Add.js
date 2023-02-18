const db = require('./dbconnection');

function addLostItems(lostitemname, dateandtimefound,location,reportedby,description,lostitemimage) {
  const query = 'INSERT INTO LostItems (lostitemname, dateandtimefound,location,reportedby,description,lostitemimage) VALUES (?, ?, ?, ?, ?, ?)';
  db.connection.query(query, [lostitemname, dateandtimefound, location,reportedby , description , lostitemimage], (error, result) => {
    if (error) {
      console.error('Error adding data to MySQL database: ' + error.stack);
      return;
    }
    console.log(`Data added to MySQL database with id: ${result.insertId}`);
  });
}

module.exports={addLostItems}