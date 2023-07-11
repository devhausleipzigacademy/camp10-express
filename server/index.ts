import express, { Request } from "express";
import {
  getPostById,
  getPosts,
  getFilteredPost,
  createPost,
} from "./controllers/posts.controller";

const app = express();

app.use(
  express.json({
    limit: "3mb",
  })
);

app.use((req, res, next) => {
  console.log("middleware");
  next();
});

app.get("/", (req, res, next) => {
  console.log("hello world");
  res.status(201).json({ message: "hello world", from: "server" });
});

/* function validatePostBody(req, res, next){
    const {content, title} = req.body;
    if(!content || !title){
        return res.status(400).json("Invalid body")
    }
    next()
} */

app.get("/posts/:postId", getPostById);

app.get("/post", getFilteredPost);

app.get("/posts", getPosts);

app.post(
  "/posts",
  /*validatePostBody,*/
  createPost
);

app.listen(8080, () => {
  console.log("Server is running");
});
