import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class AddressService {
  static getAllProfiles(profileId) {
    return axios.get(`${BASE_REST_API_URL}/api/addresses/profile-address?role=PATIENT&id=${profileId}`);
  }

  static addAddress(profileId, payload, isUpdate) {
    console.log("inside add address", profileId, payload, isUpdate);

    const newPayload = {
      addressLine1: payload.addressLine1,
      addressLine2: payload.addressLine2,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      personName: payload.personName,
      lattitude: payload.lattitude ?? 0, // Ensure the field exists
      longitude: payload.longitude ?? 0,
      home: payload.home,
      default:payload.default,
      role:"PATIENT"
    };

    if (isUpdate) {
      const UpdatePayload = {
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        city: payload.city,
        state: payload.state,
        zipCode: payload.zipCode,
        personName: payload.personName,
        lattitude: payload.lattitude ?? 0, // Ensure the field exists
        longitude: payload.longitude ?? 0,
        home: payload.home,
      };
      return axios.put(
        `${BASE_REST_API_URL}/api/addresses/${profileId}`,
        newPayload,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    } else {
      return axios.post(
        `${BASE_REST_API_URL}/api/addresses/${profileId}?role=PATIENT`,
        newPayload,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    }
  }

  static deleteAddress(addressId) {
    console.log("inside delete address", addressId);
    return axios.delete(`${BASE_REST_API_URL}/api/addresses/${addressId}`);
  }
}
