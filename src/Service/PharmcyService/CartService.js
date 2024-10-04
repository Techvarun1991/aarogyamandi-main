import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class CartService {
  static addToCart(payload) {
    console.log("inside add to cart",payload);
    return axios.post(`${BASE_REST_API_URL}/api/medicineCart/addToCart`,payload);
  }

  static getSubCategoriesByCategoryId(categoryId) {
    console.log("inside get suggestions");
    return axios.get(`${BASE_REST_API_URL}/api/category/sub/${categoryId}`);
  }

}
