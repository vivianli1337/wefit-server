import * as dao from "./dao.js";

export default function PostRoutes(app) {
  // Create a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const { userId, content } = req.body;
      if (!userId || !content) {
        throw new Error("User ID and content are required to create a post");
      }
      const post = await PostDAO.createPost({ author: userId, content });
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await PostDAO.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Get a single post by ID
  app.get("/api/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await PostDAO.getPostById(postId);
      if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }
      res.status(200).send(post);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  });

  // Like a post
  app.post("/api/posts/:postId/like", async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;
      if (!userId) {
        throw new Error("User ID is required to like a post");
      }
      const updatedPost = await PostDAO.likePost(postId, userId);
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Dislike a post
  app.post("/api/posts/:postId/dislike", async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;
      if (!userId) {
        throw new Error("User ID is required to dislike a post");
      }
      const updatedPost = await PostDAO.dislikePost(postId, userId);
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Delete a post
  app.delete("/api/posts/:postId", async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;
      const post = await PostDAO.getPostById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      if (post.author._id.toString() !== userId) {
        throw new Error("Unauthorized: You can only delete your own posts");
      }

      await PostDAO.deletePost(postId);
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
}
