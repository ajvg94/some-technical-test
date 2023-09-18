import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import { HttpStatusCode } from '../types/error'
import * as UserValidator from "../validators/users";


/**
 * Executes a search operation based on the provided search query data.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @return {Promise<void>} - A Promise that returns the search operation results.
 */
export const search = async (req: Request, res: Response) => {
    try {
        const searchQueryData = req.body ;
        await UserValidator.searchQuerySchema.validate(searchQueryData, validatorOptions);
        let resp = await UserService.searchUser(searchQueryData);
        res.status(HttpStatusCode.OK).send(resp);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Retrieves the top queries from the UserService and sends them as a response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that returns the top queries.
 */
// @ts-ignore
export const getTopQueries = async (req: Request, res: Response) => {
    try {
        let topQueries = await UserService.getTopQueries();
        res.status(HttpStatusCode.OK).send({ 
            status: HttpStatusCode.OK, 
            data: topQueries
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Retrieves the favorites of a user.
 *
 * @param {Request} req - The request object containing the userTorreGgId.
 * @param {Response} res - The response object to send the user favorites.
 * @return {Promise<void>} - A promise that resolves when the user favorites.
 */
export const getUserFavorites = async (req: Request, res: Response) => {
    try {
        const userTorreGgId = req.body.userTorreGgId;
        await UserValidator.getUserFavoritesSchema.validate({ userTorreGgId }, validatorOptions);
        let userFavorites = await UserService.getUserFavorites(userTorreGgId);
        res.status(HttpStatusCode.OK).send({ 
            status: HttpStatusCode.OK, 
            data: userFavorites
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Adds an item to the user's favorites.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the favorite is added successfully.
 */
export const addToUserFavorites = async (req: Request, res: Response) => {
    try {
        const addToUserFavoritesData = req.body;
        await UserValidator.addToUserFavoritesSchema.validate(addToUserFavoritesData, validatorOptions);
        await UserService.addToUserFavorites(addToUserFavoritesData);
        res.status(HttpStatusCode.OK).send({ 
            status: HttpStatusCode.OK, 
            message: "User favorite created sucessfully"
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


/**
 * Removes a favorite item from the user's favorites.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the favorite is removed successfully.
 */
export const removeFromUserFavorites = async (req: Request, res: Response) => {
    try {
        const removeFromUserFavoritesData = req.body;
        await UserValidator.removeFromUserFavoritesSchema.validate(removeFromUserFavoritesData, validatorOptions);
        await UserService.removeFromUserFavorites(removeFromUserFavoritesData);
        res.status(HttpStatusCode.OK).send({ 
            status: HttpStatusCode.OK, 
            message: "User favorite removed sucessfully"
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};