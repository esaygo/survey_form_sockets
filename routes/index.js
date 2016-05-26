module.exports = function(app){

  app.get('/', function (req,res) {
    res.render('index', {title: "Fill in the form"});
    //console.log(res);
  });

}
