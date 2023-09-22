import express from 'express';
import { deleteUser, followUser, getAllUser, getUser, unFollowUser, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const route = express.Router();
route.get('/', getAllUser)
route.get('/:id', getUser)
route.put('/:id',authMiddleware, updateUser)
route.delete('/:id',authMiddleware, deleteUser)
route.put('/:id/follow',authMiddleware, followUser)
route.put('/:id/unfollow',authMiddleware, unFollowUser)
export default route