import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class specialityService {
  static getAllSpeciality(payload) {
    // console.log("inside get suggestions", payload);
    return axios.get(`${BASE_REST_API_URL}/specialities/getAllSpeciality`);
  }
  static getDoctorsByCityAndSpeciality(payload) {
    // console.log("inside get suggestions", payload);
    return axios.post(`${BASE_REST_API_URL}/api/doctors/addressprofileregistration/doctors/search?availabilityType=Online&page=1&pageSize=10`,payload);
  }
}
