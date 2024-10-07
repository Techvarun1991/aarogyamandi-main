import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class MedicineOrderService {

    static checkMedicineAvailabilty = async (payload) => {
        try {
          // Send a PUT request to the API endpoint with the updated data
          const response = await axios.post(`${BASE_REST_API_URL}/InventoryManagement/pharmacyMedicineStocks/check-stock-availability`, payload);
          return response.data;
        } catch (error) {
          console.error("Error getting patient :", error);
          throw error;
        }
      };

      static placeOrderCart(payload) {
        console.log("inside add to cart", payload);
        return axios.post(`${BASE_REST_API_URL}/pharmacy-orders/placeOrder`, payload);
      }

      static getOrderItemDetails = async (orderId, orderItemId, patientId) => {
        try {
          // Send a GET request to the API endpoint
          const response = await axios.get(`${BASE_REST_API_URL}/pharmacy-orders/${orderId}/items/${orderItemId}`, {
            params: { patientId },
            headers: {
              accept: '*/*',
            },
          });
          return response.data; // Return the data from the response
        } catch (error) {
          console.error("Error getting order item details:", error);
          throw error; // Rethrow the error for further handling
        }
      };
}