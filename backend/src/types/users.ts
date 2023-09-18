export enum IdentityTypes {
    person = 'person',
    organization = 'organization',
    all = 'all'
}

export interface SearchQueryData {
    query?: string;
    torreGgId?:	string
    identityType?: IdentityTypes;
    limit?: number;
    meta?: boolean;
    excluding?: [string];
    excludedPeople?: [string];
    excludeContacts?:true;
}

export interface Query {
    id: string;
    query:	string
    count: number;
}

export interface UserFavoritesData {
    userTorreGgId: string;
    favoriteUserTorreGgId:	string;
}