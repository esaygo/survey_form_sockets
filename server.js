
// 1. Have the server render views/index.ejs that has the form for the user to fill out
// 2. The user fills out the form and submits
// 3. The submitted form gets sent to /result
// 4. The server recognizes when someone posts things to /result, grabs information from the POST, and sends the POST data back as it renders views/results.ejs

var express = require('express');
var path = require('path'); //!!!
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static"))); //!!!
// This sets the location where express will look for the ejs views
app.set('views',path.join(__dirname, '/views'));
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
//app.use(bodyParser.json());

var route = require("./routes/index.js")(app);

// this selects our port and listens
// note that we're now storing our app.listen within
// a variable called server. this is important!!

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
//his is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server);

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function(socket) {
  // console.log("we are using sockets");
  // console.log(socket.id);
  socket.on("posting_form", function(data){
    //console.log('info submitted ' + data.user.name);
    socket.emit('updated_message', {
                                    response: data.user,
                                    random_no: Math.floor(Math.random()*1000 + 1)
                                  });
    //BROADCAST
    //socket.broadcast.emit("my_broadcast_event");
    //FULL BROADCAST
    //io.emit("my_full_broadcast_event");
  });
});
