import { object, string, number, array, boolean } from 'yup';
import { identityTypes } from '../types/users'

export const searchQuerySchema = object().shape({
    query: string(),
    torreGgId:	string(),
    identityType: string().oneOf(Object.values(identityTypes)),
    limit: number(),
    meta: boolean(),
    excluding:  array().of(string()),
    excludedPeople:  array().of(string()),
    excludeContacts: boolean(),
}).noUnknown(true);