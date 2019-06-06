var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(MONGODB_URI);

//Routes go here:

app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/section/sports").then(function(response){
        var $ = cheerio.load(response.data)

        $("article h2").each(function(i, element){
            var result = {}
            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href")

            console.log(result)

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle)
            })
            .catch(function(err){
                console.log(err)
            })
        })
        res.send("Scrape Done!")
    })
})

app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        res.json(err)
    })
})

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle){
      res.json(dbArticle)
    })
    .catch(function(err){
      res.json(err)
    })
  
  });

  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote){
      return db.Article.findOneAndUpdate({_id: req.params.id}, {$set: { note: dbNote._id}, })
    })
    .then(function(dbNote){
      res.json(dbNote)
    })
    .catch(function(err){
      res.json(err)
    })
  });

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
