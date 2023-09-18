export enum identityTypes {
    person = 'person',
    organization = 'organization',
    all = 'all'
}

export interface searchQueryData {
    query?: string;
    torreGgId?:	string
    identityType?: identityTypes;
    limit?: number;
    meta?: boolean;
    excluding?: [string];
    excludedPeople?: [string];
    excludeContacts?:true;
}