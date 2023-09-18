import { Router } from "express";
import * as userController from '../controllers/users';
export const userRoutes = Router();

userRoutes.post('/users/search/', userController.search);