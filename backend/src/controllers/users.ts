import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import { HttpStatusCode } from '../types/error'
import * as UserValidator from "../validators/users";

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