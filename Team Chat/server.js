const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/chatMessage');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const dbname = 'chatApp';
const port = 7000;
const database = 'mongodb://0.0.0.0:27017/';
const app = express();

const server=http.createServer(app);
const io = socketio(server);

app.use(cors());
// MongoDB connection
mongoose.connect(database+dbname, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define users
const onlineusersSchema = new mongoose.Schema({
    ID: { type: String, unique: true },
    name: { type: String, unique: true },
    projectID: String
});

// Define chat
const chatSchema = new mongoose.Schema({
    from: String,
    to: String,
    message: String,
    date: String,
    time: String,
});

const Onlineuser = mongoose.model('Onlineuser', onlineusersSchema);
const Chat = mongoose.model('Chat', chatSchema);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

function getUserId(cookie){
    //Authenticate user
    const token = cookie;
    console.log("Decoding", token);
    if (!token) {
        return null;
    }
    try {
    const decoded = jwt.verify(token, "your-secret-key");
    const { empID, role, orgID } = decoded;
    return empID;
    } catch (error) {
        // socket.emit('clear');
        return null;
    }
}

io.on('connection', (socket) => {
    console.log('New User Logged In with ID '+socket.id);

    //Collect message and insert into database
    socket.on('chatMessage', (data) =>{ //recieves message from client-end along with sender's and reciever's details
        var dataElement = formatMessage(data);
        dataElement.from = getUserId(dataElement.from)
        if(dataElement.from == null){
            console.log("Invalid user");
        }
        mongoClient.connect(database, async (err,db) => {
            if (err)
                throw err;
            else {
                Chat.insertMany([dataElement], (err,res) => {
                    if(err){
                        console.log('Already added');
                    }
                    else{
                        socket.emit('message',dataElement);
                    }
                });
                res = await Onlineuser.find({"projectID":data.toUser});
                for(let j=0;j<res.length;j++){
                    console.log("Sending to " + res[j]);
                    console.log(dataElement)
                    socket.to(res[j].ID).emit('message',dataElement);
                }
            }
            db.close();
        });

    });

    socket.on('userDetails',(data) => { //checks if a new user has logged in and recieves the established chat details
        console.log(data);
        mongoClient.connect(database, (err,db) => {
            if(err)
                throw err;
            else {
                data.fromUser = getUserId(data.fromUser)
                if(data.fromUser == null){
                    console.log("Invalid user");
                }
                var onlineUser = { //forms JSON object for the user details
                    "ID":socket.id,
                    "name":data.fromUser,
                    "projectID":data.toUser
                };
                console.log("Setting online user ", onlineUser);
                Onlineuser.findOneAndUpdate({"name":data.fromUser}, onlineUser, {upsert: true}, function(err, doc) {
                    if(err){
                        console.log(onlineUser.name + " is already online...");
                    }
                    else{
                        console.log(onlineUser.name + " is online...");
                    }
                });
                socket.emit('clear');
                Chat.find(
                    { "to": { "$in": [data.toUser] } },
                    { "_id": 0 }, // Projection to exclude _id field
                    (err, res) => {
                        if (err) {
                            throw err;
                        } else {
                            socket.emit('output', res);
                        }
                    }
                );
            }
            db.close();
        });   
    });  
    var userID = socket.id;
    socket.on('disconnect', () => {
        mongoClient.connect(database, function(err, db) {
            if (err) throw err;
            Onlineuser.deleteOne({"ID": userID}, function(err, res) {
              if (err) throw err;
              console.log("User " + userID + "went offline...");
              db.close();
            });
          });
    });
});

app.get('/chat/:projectId', async function (req, res){

    const projectId = req.params.projectId;
    Chat.find(
        { "to": { "$in": [projectId] } },
        { "_id": 0 }, // Projection to exclude _id field
        (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log(data);
                res.json(data);
            }
        }
    );
})

app.get('/', async function(req, res){
    let projectID=req.query.projectID;
    let empID=req.query.empID;
    console.log(projectID, empID);
    res.render('chat', {empID: empID, projectID: projectID});
});

server.listen(port, () => {
    console.log(`Chat Server listening to port ${port}...`);
});