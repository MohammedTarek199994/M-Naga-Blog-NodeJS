//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
//----------------------------------------------------------------------
mongoose.connect(
  "mongodb+srv://MohammedNaga:OJMZtR6xJeO6bzpt@cluster0.ieowrn3.mongodb.net/blogDB",
  { useNewUrlParser: true }
);
//------------------------------------------------------------------------
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);
// const post_1 = new Post({
//   title: "My First blog post ",
//   content: "test test test ",
// });
// post_1.save();
//-----------------------------
const posts = [];
//======================================================================
app.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.render("home", { posts: posts });
    })
    .catch((err) => {
      console.log("error" + err);
    });
});
//======================================================================
app.get("/about", (req, res) => {
  res.render("about");
});
//======================================================================
app.get("/contact", (req, res) => {
  res.render("contact");
});
//======================================================================
app.get("/compose", (req, res) => {
  res.render("compose");
});
//======================================================================
app.post("/compose", (req, res) => {
  let postTitle = req.body.postTitle;
  let postContent = req.body.postContent;
  var post = new Post({
    title: postTitle,
    content: postContent,
  });
  post.save();
  res.redirect("/");
});
//======================================================================
app.get("/posts/:postTitle", (req, res) => {
  var reqPostTitle = req.params.postTitle;
  //_.lowerCase(req.params.postTitle);
  // console.log(reqPostTitle);
  //------------------------------------------------------
  Post.findOne({ title: reqPostTitle })
    .then((foundPost) => {
      if (!foundPost) {
        res.render("post", {
          postTitle: "No post",
          postContent: "Sorry no post published with this title",
          postId : -1
        });
      } else {
        res.render("post", {
          postTitle: foundPost.title,
          postContent: foundPost.content,
          postId : foundPost.id
        });
      }
    })
    .catch((err) => {
      console.log("error" + err);
    });
});
// ----------------------------------------------------
app.post("/delete", (req, res) => {
  const postId = req.body.postId;
  Post.deleteOne({ _id: postId })
    .then(() => {
      console.log("Post deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Post not deleted:", err);
    });
});
//-----------------------------------------------------
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
//-------------------------------------------------------
// ### Eng :: Mohammed Tarek Mohammed Hassan
//-------------------------------------------------------
