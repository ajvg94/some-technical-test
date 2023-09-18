import axios from 'axios';
import { searchQueryData } from '../types/users';

const SEARCH_URL = "https://torre.ai/api/entities/_search";

export class UserService {
  static async searchUser(searchQueryData: searchQueryData) {
    try{
      const { data, status } = await axios.post(SEARCH_URL, searchQueryData);
      return { status, data };
    }catch (error){
      throw error;
    }
  }
}