import express from "express";
import { createPost, deletePost, getPost, likePost, timelinePosts, updatePost } from "../controllers/postController.js";
const route = express.Router()
route.post('/', createPost)
route.get('/:id', getPost)
route.put('/:id', updatePost)
route.delete('/:id', deletePost)
route.put('/:id/like', likePost)
route.get('/:id/timeline', timelinePosts)
export default route