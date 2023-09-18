import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as UserValidator from "../validators/users";

export const search = async (req: Request, res: Response) => {
    try {
        const searchQueryData = req.body ;
        await UserValidator.searchQuerySchema.validate(searchQueryData, validatorOptions);
        let resp = await UserService.searchUser(searchQueryData);
        res.status(200).send(resp);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// @ts-ignore
export const getTopQueries = async (req: Request, res: Response) => {
    try {
        let resp = await UserService.getTopQueries();
        res.status(200).send(resp);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

// export const getUserFavorites = async (req: Request, res: Response) => {
//     try {
//         const getUserFavoritesData = req.body ;
//         await UserValidator.getUserFavoritesSchema.validate(getUserFavoritesData, validatorOptions);
//         let resp = await UserService.getUserFavorites(getUserFavoritesData);
//         res.status(200).send(resp);
//     } catch (error) {
//         handleErrorResponse(res, error);
//     }
// };

// export const addToUserFavorites = async (req: Request, res: Response) => {
//     try {
//         const addToUserFavoritesData = req.body ;
//         await UserValidator.addToUserFavoritesSchema.validate(addToUserFavoritesData, validatorOptions);
//         let resp = await UserService.addToUserFavorites(addToUserFavoritesData);
//         res.status(200).send(resp);
//     } catch (error) {
//         handleErrorResponse(res, error);
//     }
// };

// export const removeFromUserFavorites = async (req: Request, res: Response) => {
//     try {
//         const removeFromUserFavoritesData = req.body ;
//         await UserValidator.removeFromUserFavoritesSchema.validate(removeFromUserFavoritesData, validatorOptions);
//         let resp = await UserService.removeFromUserFavorites(removeFromUserFavoritesData);
//         res.status(200).send(resp);
//     } catch (error) {
//         handleErrorResponse(res, error);
//     }
// };