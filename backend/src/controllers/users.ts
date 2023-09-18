import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { handleErrorResponse } from "../helpers/errorHandler";
import { validatorOptions } from '../validators/validatorOptions';
import * as UserValidator from "../validators/users";

/**
 * Updates the user data.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves to void.
 */
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

