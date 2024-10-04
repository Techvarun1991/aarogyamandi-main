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
}