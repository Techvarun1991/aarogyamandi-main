import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";


export default class Location {
  static UseMyLocation(payload) {
    // console.log("inside the use my loaction", payload);
    return axios.post(`${BASE_REST_API_URL}/map/api/revGeoCode`, payload);
  }

  static getSuggestions(payload) {
    // console.log("inside get suggestions", payload);
    return axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${payload}&apiKey=d029776ff0954f36bdc410121372579c`);
  }
}
