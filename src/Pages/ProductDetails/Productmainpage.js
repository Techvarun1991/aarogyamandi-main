import React, { useEffect, useState } from "react";
import Productdetail from "./Productdetail";
import Productdescription from "./Productdescription";
import Similarproducts from "./Similarproducts";
import Frequentlyboughtproduct from "./Frequentlyboughtproduct";
import Rating from "./Rating";
import RelatedPost from "./RelatedPost";
import Disclaimer from "./Disclaimer";
import axios from "axios";
import BASE_REST_API_URL from "../../Service/BaseUrl";
import { CircleLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

const Productmainpage = () => {
  const [medicineData, setMedicineData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const medicineId = location.state.medicineId || {};
  console.log(medicineId)
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const fetchSimillarProducts = async () => {
    return await axios
      .post(`${BASE_REST_API_URL}/api/medicines/similar/${medicineId}`)
      .then((response) => {
        console.log(response.data,'inside similar products');
        return response.data; // Return the data to handle it in Promise.all
      })
      .catch((err) => {
        console.log("Error fetching similar products", err);
        return null; // Return null to handle errors gracefully
      });
  };

  const fetchMedicineDetails = async () => {
    return await axios
      .get(`${BASE_REST_API_URL}/api/medicines/unique/${medicineId}`)
      .then((response) => {
        return response.data; // Return the data to handle it in Promise.all
      })
      .catch((err) => {
        console.log("Error fetching medicine details", err);
        return null; // Return null to handle errors gracefully
      });
  };

  useEffect(() => {
    setIsLoading(true); // Set loading to true before making API calls

    Promise.all([fetchSimillarProducts(), fetchMedicineDetails()])
      .then(([similarProductsData, medicineDetailsData]) => {
        // Handle both API responses here
        if (similarProductsData) {
          // Do something with similarProductsData
          console.log("Similar Products Data: ", similarProductsData);
          setSimilarProductsData(similarProductsData); // For example, set similar products data
        }
        if (medicineDetailsData) {
          // Do something with medicineDetailsData
          console.log("Medicine Details Data: ", medicineDetailsData);
          setMedicineData(medicineDetailsData); // For example, set medicine data
        }
      })
      .catch((err) => {
        console.log("Error with one or both API requests", err);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after both API calls complete
      });
  }, [medicineId]); // Empty dependency array to run once on mount


  return (
    isLoading ? (
      <div className="flex items-center justify-center min-h-screen">
        <CircleLoader />
      </div>

    ) : (
      <div>
        <Productdetail medicineData={medicineData} />

        <Productdescription medicineDetails={medicineData.medicine.medicineDetails} />

        <Similarproducts similarProductsData={similarProductsData} />

        <Frequentlyboughtproduct />

        <Rating />

        <RelatedPost />

        <Disclaimer />
      </div>
    )

  );
};

export default Productmainpage;
