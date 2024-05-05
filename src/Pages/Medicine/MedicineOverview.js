import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
 
export default function ProductOverview() {
 
  const [medicine, setMedicine] = useState({});
  const [medicineImages, setMedicineImages] = useState([]);
  const [medicineDetails,setMedicineDetails] = useState({});
  const [stockDetails , setStockDetails] = useState({});
  const [largeImage, setLargeImage] = useState('');
  const navigate = useNavigate();
  console.log(largeImage);  
  const handleImageClick = (image) => {
    setLargeImage(image);
  };
 
  const [openState, setOpenState] = useState({
    keyComponents: false,
    indications: false,
    directionForUse: false,
    storage: false,
    precautions: false,
  });
 
  const toggleFeatures = (section, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setOpenState({ ...openState, [section]: !openState[section] });
  };
 
  useEffect(() => {
    const fetchMedicineById = async () => {
      try {
        const payload = {
          currentLat:13.04753,
          currentLong:77.61923,
          radius: 10
        };
        const response = await axios.post(`https://192.168.1.206:30002/InventoryManagement/unique/141`,payload)
        console.log("response: " ,response.data);
        setMedicine(response.data.medicine);
        setMedicineImages(response.data.medicine.medicineImages);
        setMedicineDetails(response.data.medicine.medicineDetails);
        setStockDetails(response.data);
        console.log("object: " ,response.data.medicine.medicineImages[0])
        setLargeImage(response.data.medicine.medicineImages[0])
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };
 
    fetchMedicineById();
  }, []);
 
  const goBack = () => {
    navigate(-1);
  };
 
  return (
    <div className="bg-white">
      {/* Link to view all sellers */}
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8 flex items-center">
  <button onClick={goBack} className="mr-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>
  <Link to="/ViewAllSeller" className="text-blue-600 hover:underline">
    View all sellers
  </Link>
  {/* <p className="text-gray-600 text-sm mt-2">
  (Compare prices from different sellers to get the best deal for the same product.)
</p> */}

</div>

      {/* Image gallery */}
      <div className="mx-auto max-w-80 sm:px-6 lg:px-8">
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
    {/* Large image */}
    <div className="md:col-span-2 lg:col-span-2"> {/* Adjust the span to accommodate large image */}
      <div className="aspect-w-6 aspect-h-7 overflow-hidden rounded-lg">
        <img
          src={`https://192.168.1.206:30002/api/documentation/medicine-photos/${largeImage}/download`}
          alt={""}
          className="object-cover object-center h-full w-full"
        />
      </div>
    </div>

    {/* Small images */}         
    <div className="md:col-span-1 lg:col-span-1">
      {medicineImages.slice(1).map((image, index) => (
        <div key={index} className="mb-2">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
            <img
              src={`https://192.168.1.206:30002/api/documentation/medicine-photos/${medicineImages[index]}/download`}
              alt={image.alt}
              className="object-cover object-center h-full w-full cursor-pointer"
              onClick={() => handleImageClick(`${medicineImages[index]}`)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>]
</div>
 
      {/* Product info */}
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{medicine.medicineName}</h1>
            <p className="mt-2 text-2xl font-bold text-gray-900">
            &#x20B9; {stockDetails.sellingPrice}
            </p>
 
 
            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-base text-gray-500">
                {medicineDetails.description}
              </p>
            </div>
 
            {/* Highlights */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900">Highlights</h2>
              <p className="">{medicineDetails.highlights}</p>
            </div>
          </div>
 
          {/* Options */}
          <div>
            <form className="space-y-4">
              {/* Size */}
             
              <div className="container mx-auto px-2 py-4">
                <button
                  className="text-xl font-bold hover:text-blue-500"
                  onClick={(event) => toggleFeatures("keyComponents", event)}
                >
                  {openState.keyComponents ? "-" : "+"} Key Components:
                </button>
                {openState.keyComponents && (
                  <ul className="list-disc space-y-2 mt-4">
                    <p>{medicineDetails.keyComponents}</p>
                  </ul>
                )}
              </div>
              <div className="container mx-auto px-2 py-4">
                <button
                  className="text-xl font-bold hover:text-blue-500"
                  onClick={(event) => toggleFeatures("indications", event)}
                >
                  {openState.indications ? "-" : "+"} Indications:
                </button>
                {openState.indications && (
                <ul className="list-disc space-y-2 mt-4">
                <p>{medicineDetails.indications}</p>
              </ul>
                )}
              </div>
              <div className="container mx-auto px-2 py-4">
                <button
                  className="text-xl font-bold hover:text-blue-500"
                  onClick={(event) => toggleFeatures("directionForUse", event)}
                >
                  {openState.directionForUse ? "-" : "+"} Direction For Use:
                </button>
                {openState.directionForUse && (
                 <ul className="list-disc space-y-2 mt-4">
                 <p>{medicineDetails.directionForUse}</p>
               </ul>
                )}
              </div>
              <div className="container mx-auto px-2 py-4">
                <button
                  className="text-xl font-bold hover:text-blue-500"
                  onClick={(event) => toggleFeatures("storage", event)}
                >
                  {openState.storage ? "-" : "+"} Storage:
                </button>
                {openState.storage && (
                 <ul className="list-disc space-y-2 mt-4">
                 <p>{medicineDetails.storage}</p>
               </ul>
                )}
              </div>
              <div className="container mx-auto px-2 py-4">
                <button
                  className="text-xl font-bold hover:text-blue-500"
                  onClick={(event) => toggleFeatures("precautions", event)}
                >
                  {openState.precautions ? "-" : "+"} Precautions:
                </button>
                {openState.precautions && (
                  <ul className="list-disc space-y-2 mt-4">
                  <p>{medicineDetails.precautions}</p>
                </ul>
                )}
              </div>
              {/* Add to bag */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-3 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 
