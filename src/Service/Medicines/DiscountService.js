import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class DiscountService {
  static getSpecialOffers = async (page, pageSize) => {
    try {
      // Send a PUT request to the API endpoint with the updated data
      const response = await axios.get(`${BASE_REST_API_URL}/api/discounts`, {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting patient :", error);
      throw error;
    }
  };

  static getHalfPriceProductFromDiscount(page, pageSize) {
    return axios.get(`${BASE_REST_API_URL}/api/medicines/filter-by-discount`, {
      params: {
        discountType: "BUY_ONE_GET_ONE",
        page,
        pageSize
      },
    });
  }
}
