import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class MedicineCartService {
  static fetchByPatientId(patientId) {
    console.log("Fetching medicine cart data for patient ID:", patientId);
    return axios.get(`${BASE_REST_API_URL}/api/medicineCart/fetchById`, {
      params: { patientId },
      headers: {
        'Accept': '*/*',
      },
    });
  }
 

  static removeCartItem(cartItemId,payload) {
    console.log("first remove cart item", payload,cartItemId);
    return axios.put(`${BASE_REST_API_URL}/api/medicineCart/removeCartItem/${cartItemId}`,payload);
  }



  static updateCartItemQuantity(cartItem) {
    const { cartId, cartItemId, quantity, pharmaStockId, medicineId } = cartItem;

    return axios.put(`${BASE_REST_API_URL}/api/medicineCart/updateCartItemQuantity`, {
      cartId,
      cartItemId,
      quantity,
      pharmaStockId,
      medicineId
    });
  }




  static fetchMedicineOffers = async (pharmaId, medicineId) => {
    try {
      const payload = {
        userId: pharmaId, // Assuming pharmaId is used as userId
        createdBy: "PHARMACY",
        createdFor: "PHARMACY",
        isActive: true
      };

      const response = await axios.post(`${BASE_REST_API_URL}/api/promocode/user/promocodes/${medicineId}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching lab offers:", error);
      throw error;
    }
  };



  static updateWholeCart(payload){
    console.log("inside update cart",payload)
    return new axios.put(`${BASE_REST_API_URL}/api/medCarts/whole/${payload.cartId}`,payload)
  }

}