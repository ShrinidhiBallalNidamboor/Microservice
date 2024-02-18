const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/chatMessage');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbname = 'chatApp';
const port = 5000;
const database = 'mongodb://localhost:27017/';
const app = express();

const server=http.createServer(app);
const io = socketio(server);

// MongoDB connection
mongoose.connect(database+dbname, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define assignment
const teamassignmentSchema = new mongoose.Schema({
  empID: String,
  teamID: String,
});

// Define users
const onlineusersSchema = new mongoose.Schema({
    ID: { type: String, unique: true },
    name: { type: String, unique: true }
});

// Define chat
const chatSchema = new mongoose.Schema({
    from: String,
    to: String,
    message: String,
    date: String,
    time: String,
});

const Teamassignment = mongoose.model('Teamassignment', teamassignmentSchema);
const Onlineuser = mongoose.model('Onlineuser', onlineusersSchema);
const Chat = mongoose.model('Chat', chatSchema);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

io.on('connection', (socket) => {
    console.log('New User Logged In with ID '+socket.id);

    //Collect message and insert into database
    socket.on('chatMessage', (data) =>{ //recieves message from client-end along with sender's and reciever's details
        var dataElement = formatMessage(data);
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
                res1 = await Teamassignment.find({'teamID': data.toUser});
                for(let i=0;i<res1.length;i++){
                    res2 = await Onlineuser.find({"name":res1[i].empID});
                    for(let j=0;j<res2.length;j++){
                        socket.to(res2[j].ID).emit('message',dataElement);
                    }
                }
            }
            db.close();
        });

    });

    socket.on('userDetails',(data) => { //checks if a new user has logged in and recieves the established chat details
        mongoClient.connect(database, (err,db) => {
            if(err)
                throw err;
            else {
                var onlineUser = { //forms JSON object for the user details
                    "ID":socket.id,
                    "name":data.fromUser
                };
                Onlineuser.insertMany([onlineUser],(err,res) =>{
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


app.get('/:empID', async function(req, res){
    let empID=req.params.empID;
    let assignments = await Teamassignment.find({empID: empID});
    res.render('chat', {empID: empID, assignments: assignments});
});

server.listen(port, () => {
    console.log(`Chat Server listening to port ${port}...`);
});