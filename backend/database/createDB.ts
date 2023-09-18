import { QueryModel, UserFavoriteModel } from './models';

createDB();
async function createDB() {
    // create tables
    await QueryModel.sync({ force: true });
    await UserFavoriteModel.sync({ force: true });
}
