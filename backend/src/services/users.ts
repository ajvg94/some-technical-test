import axios from 'axios';
import { SearchQueryData, Query, UserFavoritesData } from '../types/users';
import { QueryModel, UserFavoriteModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

const SEARCH_URL = "https://torre.ai/api/entities/_search";

export class UserService {

  /**
   * Executes a search query for a user.
   *
   * @param {SearchQueryData} searchQueryData - The data for the search query.
   * @returns {Promise<{ status: any, data: any }>} - The status and data of the search result.
   */
  static async searchUser(searchQueryData: SearchQueryData) {
    try{
      const { data, status } = await axios.post(SEARCH_URL, searchQueryData);
      const stringOfQuery = JSON.stringify(searchQueryData);

      const query = await UserService.getQuery(stringOfQuery);
      if(query) await UserService.updateQuery(stringOfQuery);
      else await UserService.createQuery(stringOfQuery);

      const userFavorites = await UserService.getUserFavorites(searchQueryData.torreGgId);
      data.userFavorites = userFavorites;
      return { status, data };
    }catch (error){
      throw error;
    }
  }

  /**
   * Create a query in the QueryModel.
   *
   * @param {string} getQueryData - The data for the query.
   * @return {Promise<void>} - A promise that resolves with no value.
   */
  static async createQuery(getQueryData: string) {
    try{
      await QueryModel.create({ query: getQueryData, count: 1 });
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves a query from the database based on the provided getQueryData.
   *
   * @param {string} getQueryData - The data used to search for the query.
   * @return {Query | undefined} The retrieved query if found, otherwise undefined.
   */
  static async getQuery(getQueryData: string) {
    try{
      const foundQuery = await QueryModel.findOne({ where: { query: getQueryData } });
      const query = foundQuery?.dataValues as Query;
      return query;
    }catch (error){
      throw error;
    }
  }

  /**
   * Updates a query in the database.
   *
   * @param {string} getQueryData - The data used to find the query.
   * @return {Promise<void>} - A promise that resolves with no value.
   */
  static async updateQuery(getQueryData: string) {
    try{
      const foundQuery = await UserService.getQuery(getQueryData);
      if(foundQuery) {
        await QueryModel.update({query: foundQuery.query, count: ++foundQuery.count}, { where: { query: getQueryData } });
      }
      else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves the top queries from the database.
   *
   * @return {Promise<Array<QueryModel>>} An array of the top queries.
   */
  static async getTopQueries() {
    try{
      return await QueryModel.findAll({ order: [['count', 'DESC']], limit: 10 });
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves the favorites of a user with the given torreGgId.
   *
   * @param {string} userTorreGgId - The torreGgId of the user.
   * @return {Array<string>} An array containing the torreGgIds of the user's favorites.
   */
  static async getUserFavorites(userTorreGgId: string) {
    try{
      let favorites=  await UserFavoriteModel.findAll({ 
        attributes: ['favoriteUserTorreGgId'], 
        where: { userTorreGgId: userTorreGgId } 
      }) as Array<any>;
      return favorites.map(e => e.favoriteUserTorreGgId);
    }catch (error){
      throw error;
    }
  }

  /**
   * Retrieves a user's favorite by their torreGgId.
   *
   * @param {UserFavoritesData} getUserFavoriteByGgIdData - The data used to find the user's favorite.
   * @return {Query} The user's favorite.
   */
  static async getUserFavoriteByGgId(getUserFavoriteByGgIdData: UserFavoritesData) {
    try{
      const foundFavorite = await UserFavoriteModel.findOne({ where: { ...getUserFavoriteByGgIdData } });
      const favorite = foundFavorite?.dataValues as Query;
      return favorite;
    }catch (error){
      throw error;
    }
  }

  static async addToUserFavorites(addToUserFavoritesData: UserFavoritesData) {
    try{
      const favorite = await UserService.getUserFavoriteByGgId(addToUserFavoritesData);
      if(!favorite) 
        await UserFavoriteModel.create({ ...addToUserFavoritesData });
    }catch (error){
      throw error;
    }
  }

  static async removeFromUserFavorites(removeFromUserFavoritesData: UserFavoritesData) {
    try{
      await UserFavoriteModel.destroy({ where: { ...removeFromUserFavoritesData } });
    }catch (error){
      throw error;
    }
  }
}