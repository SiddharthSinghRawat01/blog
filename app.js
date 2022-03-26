const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
var lodash = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.set('view engine', 'ejs');
app.set('views','./views');

// app.use(bodyParser.urlencoded({extended: true}));

// let posts = [ ];

//to access public folder
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB")

const testSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Test = mongoose.model("Post",testSchema);

// const test = new Test({
//   title: "test database"
// });

// test.save();


// get request fo home page
app.get('/',function(req,res){

  Test.find((err,foundpost)=>{
    if(err){throw err}
    else {
      console.log("found Post")
      res.render("home", {homeContent : homeStartingContent, posts : foundpost});
    }
  })
});


// get request for about page
app.get("/about",function(req,res){

  res.render("about",{about : aboutContent});

});

// get request for contact page
app.get("/contact",function(req,res){

  res.render("contact",{contact : contactContent})

});

// get request for compose page
app.get("/compose",function(req,res){

  res.render("compose",)

});


// get request for the tile  pages
app.get("/posts/:postName",(function(req,res){ // i can give any name to postname its a object 
 
 const requestTitle = lodash.lowerCase(req.params.postName);  // the title on the page // we turn it into lower case
 
//  posts.forEach(function(post){
//    const storedTitle = lodash.lowerCase(post.title) // it store the title of post // we turn it into lower case
  //  if(storedTitle === requestTitle){ 
  //   res.render("posts", {
  //     titles : post.title,
  //     content : post.content
  //   })
  //  }else{
  //    console.log("not match")
  //  }

   
//  });

  Test.findOne({title: requestTitle},(err,foundtitle)=>{
    if(err){throw err}
    else{
      const storedTitle = lodash.lowerCase(foundtitle.title)
      if(storedTitle === requestTitle){
        console.log("found items")
      // res.render("posts", {
      //   title : foundtitle.title,
      //   content : foundtitle.content
      // })
      } else {
        console.log("not matched")
      }
      
    }
  })

}));

app.post("/compose",function(req,res){
  
  const Title = req.body.postTitle
  const Content =  req.body.postBody

const post = new Test({
  title: Title,
  content: Content
});

post.save();
console.log("saved")

res.redirect("/");


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
