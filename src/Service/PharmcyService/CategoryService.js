import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class CategoryService {
  static getAllMainCategory() {
    console.log("inside get suggestions");
    return axios.get(`${BASE_REST_API_URL}/api/category/type?categoryType=main`);
  }

  static getSubCategoriesByCategoryId(categoryId) {
    console.log("inside get suggestions");
    return axios.get(`${BASE_REST_API_URL}/api/category/sub/${categoryId}`);
  }

}
