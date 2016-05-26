//the server param is passed from server.js var route = require("./routes/index.js")(app, server);
//so that the code for server's response can be included in here
module.exports = function(app, server){
  //this gets the socket.io module
var io = require("socket.io").listen(server);

  app.get('/', function (req,res) {
    res.render('index', {title: "Fill in the form"});
    //console.log(res);
  });

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
    });
  });

}
