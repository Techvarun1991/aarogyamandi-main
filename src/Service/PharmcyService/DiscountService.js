import axios from "axios";
import BASE_REST_API_URL from "../BaseUrl";

export default class DiscountService {
    static getFilteredProductFromDiscount(minDiscount, maxDiscount) {
        console.log("inside add to cart", minDiscount, maxDiscount);
        return axios.get(`${BASE_REST_API_URL}/api/medicines/filter-by-discount`, {
            params: {
                discountType: 'PERCENTAGE',
                minDiscount,
                maxDiscount,
            },
        });
    }
}
