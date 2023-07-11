import { Request, Response, NextFunction } from "express";

type Post = {
  id: string;
  title: string;
  content: string;
};

const DUMMY_POSTS: Post[] = [
  { id: "p1", title: "First Post", content: "This is the first post" },
  { id: "p2", title: "Second Post", content: "This is the second post" },
];

export const getFilteredPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query);
  const { title } = req.query as { title: string };
  const filteredPosts = DUMMY_POSTS.filter((post) =>
    post.title.includes(title)
  );
  if (!filteredPosts || filteredPosts.length === 0) {
    return res.status(404).json("Post not found");
  }
  res.status(200).json(filteredPosts);
};

export const getPostById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  const { postId } = req.params;
  const singlePost = DUMMY_POSTS.find((post) => post.id === postId);
  if (!singlePost) {
    return res.status(404).json("Post not found");
  }

  res.status(200).json(singlePost);
};

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  console.log("posts");
  res.status(200).json(DUMMY_POSTS);
};

export const createPost = (
  req: Request<{}, {}, Post>,
  res: Response,
  next: NextFunction
) => {
  const { content, title } = req.body; // as Post;
  if (!content || !title) {
    return res.status(400).json("invalid body");
  }
  DUMMY_POSTS.push({
    id: Math.random().toString(),
    title,
    content,
  });
  res.status(201).json(DUMMY_POSTS);
};
