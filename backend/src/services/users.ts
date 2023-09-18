import axios from 'axios';
import { SearchQueryData, Query } from '../types/users';
import { QueryModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

const SEARCH_URL = "https://torre.ai/api/entities/_search";

export class UserService {

  static async searchUser(searchQueryData: SearchQueryData) {
    try{
      const { data, status } = await axios.post(SEARCH_URL, searchQueryData);
      const stringOfQuery = JSON.stringify(searchQueryData);

      const query = await UserService.getQuery(stringOfQuery);
      if(query) await UserService.updateQuery(stringOfQuery);
      else await UserService.createQuery(stringOfQuery);

      return { status, data };
    }catch (error){
      throw error;
    }
  }

  static async createQuery(getQueryData: string) {
    try{
      await QueryModel.create({ query: getQueryData, count: 1 });
    }catch (error){
      throw error;
    }
  }

  static async getQuery(getQueryData: string) {
    try{
      const foundQuery = await QueryModel.findOne({ where: { query: getQueryData } });
      const query = foundQuery?.dataValues as Query;
      return query;
    }catch (error){
      throw error;
    }
  }

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

  static async getTopQueries() {
    try{
      return await QueryModel.findAll({ order: [['count', 'DESC']], limit: 10 });
    }catch (error){
      throw error;
    }
  }

  // static async getUserFavorites(getUserFavoritesData: searchQueryData) {
  //   try{
  //     return await QueryModel.findAll({ order: [['count', 'DESC']], limit: 10 });
  //   }catch (error){
  //     throw error;
  //   }
  // }

  // static async addToUserFavorites(searchQueryData: searchQueryData) {
  //   try{
  //     const { data, status } = await axios.post(SEARCH_URL, searchQueryData);
  //     return { status, data };
  //   }catch (error){
  //     throw error;
  //   }
  // }

  // static async removeFromUserFavorites(searchQueryData: searchQueryData) {
  //   try{
  //     const { data, status } = await axios.post(SEARCH_URL, searchQueryData);
  //     return { status, data };
  //   }catch (error){
  //     throw error;
  //   }
  // }
}