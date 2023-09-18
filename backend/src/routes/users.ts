import { Router } from "express";
import * as userController from '../controllers/users';
export const userRoutes = Router();

userRoutes.post('/api/users/search/', userController.search);
userRoutes.get('/api/users/getTopQueries/', userController.getTopQueries);
// userRoutes.get('api/users/favorites/', userController.getUserFavorites);
// userRoutes.post('api/users/favorites/', userController.addToUserFavorites);
// userRoutes.delete('api/users/favorites/', userController.removeFromUserFavorites);