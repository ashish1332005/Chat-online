const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4}=require(`uuid`);


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { username: "ashish sharma", content: "i love coding",id:uuidv4() },
    { username: "vishal sharma", content: "i love rosting",id:uuidv4() },
    { username: "ankit sharma", content: "i love pagalpanti",id:uuidv4() },
    { username: "prince sharma", content: "i love masti",id:uuidv4() }
];


app.get("/", (req, res) => {
    res.send("Welcome to the Home Page! Go to <a href='/posts'>/posts</a> to see posts.");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id=uuidv4();;

    posts.push({ id,username, content });
    res.redirect("/posts"); // ✅ Redirect to see the updated list
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id == id); // Use '==' to match string & number
res.render("show.ejs",{post});

});
app.patch("posts/:id",(req,res)=>{
    let {id}=req.params;
 let newcontent=req.body.content;
 let post = posts.find(p => p.id == id);
 post.content=newcontent;
 console.log(post);
    res.send("patch req working");
})
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id == id);
    res.render("edit.ejs", { post });
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
