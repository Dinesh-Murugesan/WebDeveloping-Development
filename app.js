var express = require("express");
    app = express();
    bodyParse = require("body-parser");
    mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movie-app",{useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true});
var MovieSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Movie = mongoose.model("Movie", MovieSchema);
// Movie.create({
//     name: "Kaithi",
//     image: "https://m.media-amazon.com/images/M/MV5BMzNjMDhmYzEtM2YxOC00NzZjLThkODctZjI4M2UyOWIyOTZmXkEyXkFqcGdeQXVyNzcxMzI4Njk@._V1_QL50_SY1000_CR0,0,639,1000_AL_.jpg",
//     description: "A drug bust, an injured cop and a convicted criminal who wants to meet his daughter for first time in life, what happens when they all cross their path is the story of this emotional action flick."
// },function(err, movie){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Added to DB!");
//         console.log(movie);
//     }
// });
app.use(bodyParse.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", function(req, res){
    res.render("home");
});
app.get("/movies", function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            console.log(err);
        }
        else{
            console.log(movies);
            res.render("movies", {movies:movies});
        }
    });
});
app.get("/movies/newmovies", function(req, res){
    res.render("newmovies");
});
app.post("/movies", function(req, res){
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.desc
    var newMovie  = {name:name, image:url, description: description};
    Movie.create(newMovie, function(err, movie){
        if(err){
            console.log("Oh NO, Error!!");
            console.log(err);
        }
        else{
            console.log("Created new!");
        }
    });
    // movies.push(newMovie);
    res.redirect("/movies");
});
app.get("/movies/:id", function(req, res){
    Movie.findById(req.params.id, function(err, found){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("show", {movie: found});
        }
    });
});
app.listen(3000, function(){
    console.log("Server Connected!!!");
});