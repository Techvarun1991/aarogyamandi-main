import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class ProductService {
  static getCategoryById(subcategoryId) {
    console.log("inside get suggestions");
    return axios.get(`${BASE_REST_API_URL}/api/medicines/category/${subcategoryId}`);
  }

  static getProductDetails(medicineId) {
    console.log("inside get all medicine details",medicineId);
    return axios.get(`${BASE_REST_API_URL}/api/medicines/${medicineId}`);
  } 

}
