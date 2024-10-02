import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class ManageProfileService {
  static getAllProfiles(patientId) {
    // console.log("inside get suggestions", payload);
    return axios.get(`${BASE_REST_API_URL}/api/patients/${patientId}/profiles`);
  }

}
