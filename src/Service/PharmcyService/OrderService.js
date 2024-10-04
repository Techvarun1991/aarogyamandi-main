import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class OrderService {
  static getByProfileId(profileId) {
    console.log("inside get orders by profileId",profileId);
    return axios.get(`http://localhost:8080/pharmacy-orders/byPatientId/${profileId}`);
  }

 

}
