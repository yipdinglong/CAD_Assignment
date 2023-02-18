'use strict';

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
var mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./dbconfig/Add');
const dbdetails = require('./dbconfig/db');
const dbconnect = require('./dbconfig/dbconnection');

const aws = require('aws-sdk');
// aws.config.update({ region: 'us-west-2' });
const sns = new aws.SNS();

const topicArn = process.env.TopicARN;

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/uploads/'); // This is the directory where the file will be saved.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // This sets the name of the uploaded file.
  }
}); 

const upload = multer({ storage: storage });

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Appication
const app = express();


app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'dist')));


app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Default Route
app.get('/', (req, res) => {
  res.render('login', { layout: false });
});

// Lost And Found page Route
app.get('/login', function(req, res) {
   const query = `SELECT * FROM LostItems`;
  dbconnect.connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.render('lostandfound');
    } else {
      res.render('lostandfound', { rows: results });
    }
  });
});

//Dashboard Page Route
app.get('/Dashboard', (req, res) => {
  res.render('dashboard');
});

//Add Lost Item form submit Route
app.post('/submit-form', upload.single('file'), (req, res) => {
    // Get the form data from the request object
    const { Itemname, Dateandtime, Location, Reportedby, Description } = req.body;
    const file = req.file.originalname;
    // Add Lost Items
    db.addLostItems(Itemname,Dateandtime,Location,Reportedby,Description,"uploads/"+file)
    res.sendStatus(200);
    sns.listSubscriptionsByTopic({ TopicArn: topicArn }, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      const notifiedSubscribers = new Set();
      data.Subscriptions.forEach(function(subscription) {
        const subscriberId = subscription.Owner;
        if (!notifiedSubscribers.has(subscriberId)) {
          const params = {
            Message: "This is an notification to tell you that a new item has been reported!",
            TopicArn: topicArn,
            Subject: "Notify New Reported Item"
          };
          sns.publish(params, function(err, data) {
            if (err) {
              console.log(err, err.stack);
            } else {
              console.log(`Message sent to subscription ${subscription.SubscriptionArn}`);
            }
          });
          notifiedSubscribers.add(subscriberId);
        }
      });
  }
});
});

//Add Lost Item Page Route
app.get('/AddLostItem', (req, res) => {
  res.render('addlostitem');
});
app.get('/Lost&Found', (req, res) => {
  const query = `SELECT * FROM LostItems`;
  dbconnect.connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.render('lostandfound');
    } else {
      res.render('lostandfound', { rows: results });
    }
  });
});

//notifcation page route
app.get('/notification', (req, res) => {
  
  res.render('notification');
});

//notifcation form submit route
app.post('/subscribe', async (req, res) => {
  
  const email = req.body.email;
  console.log(email)
  try {
    // Subscribe the email address to the SNS topic
    const params = {
      Protocol: 'email',
      TopicArn: topicArn,
      Endpoint: email
    };
    await sns.subscribe(params).promise();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});




app.listen(PORT, HOST);
console.log(`Running on Port ${PORT}`);


//Tried Running SQL SCRIPT TO ADD SQL DATABASE AND TABLE INTO SQL (DOES NOT WORK - Currently Can only manually run sql script)  - - LostAndFound.sqk

// const connection = mysql.createConnection({
//   host: 'lostandfoundb.c773odc1wes9.us-west-2.rds.amazonaws.com',
//   user: 'admin',
//   password: 'nypadmin1234'
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// //Setting Up Sql Script Path
// const scriptPath = path.join(__dirname, 'LostAndFound.sql');
// const script = fs.readFileSync(scriptPath, 'utf8');

// connection.query(script, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results);
//   }
// });

// connection.end();

