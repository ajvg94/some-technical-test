import { object, string, number, array, boolean } from 'yup';
import { IdentityTypes } from '../types/users'

export const searchQuerySchema = object().shape({
    query: string(),
    torreGgId: string(),
    identityType: string().oneOf(Object.values(IdentityTypes)),
    limit: number(),
    meta: boolean(),
    excluding: array().of(string()),
    excludedPeople: array().of(string()),
    excludeContacts: boolean(),
}).noUnknown(true);

export const getUserFavoritesSchema = object().shape({
    torreGgId: string(),
}).noUnknown(true);

export const addToUserFavoritesSchema = object().shape({
    torreGgId: string(),
    favoriteUserTorreGgId: string(),
}).noUnknown(true);

export const removeFromUserFavoritesSchema = addToUserFavoritesSchema;