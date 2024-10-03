import React, { useEffect, useState } from "react";
import InputWithValidation from "./InputWithValidation";

const Productdetail = ({medicineData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startThumbnailIndex, setStartThumbnailIndex] = useState(0);

  const images = [
    "https://img.freepik.com/free-photo/top-view-untidy-pills_23-2148021494.jpg?t=st=1716965965~exp=1716969565~hmac=6ec996b855641751892841a089b34cfbf42b5751676398b51c367525ff3ac053&w=826",
    "https://img.freepik.com/free-photo/top-view-bowl-pills_23-2148530926.jpg?t=st=1716965985~exp=1716969585~hmac=2b9a39af7d3e916ee2fef77622504c65c0eb02afb5150de751d56d3867bdf877&w=740",
    "https://img.freepik.com/free-photo/many-pill-blister-pack-yellow-background_23-2148129589.jpg?t=st=1716966002~exp=1716969602~hmac=79f4b34a3af926cc02644427fa419e8786195503434ca6df1b7b0094e68c4e22&w=826   ",
    "https://img.freepik.com/free-photo/flat-lay-pills-coming-out-plastic-container_23-2148530994.jpg?t=st=1716966017~exp=1716969617~hmac=a41617726450c98e68c79f2e62f49ccc304ca1a3522abd9c151e69d1d5beab19&w=360",
  ];

  const handleNext = () => {
    if (startThumbnailIndex + 3 < images.length) {
      setStartThumbnailIndex((prevIndex) => prevIndex + 1);
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    if (startThumbnailIndex > 0) {
      setStartThumbnailIndex((prevIndex) => prevIndex - 1);
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    
    <div>
      <div class="bg-white-100 dark:bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div className="text-center">
                <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[420px] xl:h-[400px] rounded-lg bg-white-300 flex justify-center items-center">
                  <img
                    className="w-4/5 h-4/5 object-cover"
                    src={images[currentIndex]}
                    alt="Product Image"
                  />
                </div>

                <div className="flex justify-center relative mt-4">
                  <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white-500 text-black p-2 rounded-full font-bold sm:p-3 md:p-4 lg:p-5 xl:p-6"
                    onClick={handlePrev}
                  >
                    {"<"}
                  </button>
                  {images
                    .slice(startThumbnailIndex, startThumbnailIndex + 3)
                    .map((image, index) => (
                      <img
                        key={index}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-1 sm:mx-2 border border-white-300 cursor-pointer"
                        src={image}
                        alt={`Thumbnail ${index + startThumbnailIndex + 1}`}
                        onClick={() =>
                          setCurrentIndex(index + startThumbnailIndex)
                        }
                      />
                    ))}
                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white-500 text-black p-2 rounded-full font-bold sm:p-3 md:p-4 lg:p-5 xl:p-6"
                    onClick={handleNext}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
            <div class="md:flex-1 px-2 sm:px-4">
              <h2 class="text-lg sm:text-xl text-left font-bold text-gray-800 dark:text-white mb-2 sm:my-9 my-4">
                {medicineData.medicineName}
              </h2>

              <div class="flex mb-2 sm:mb-4">
                <div class="mr-2 sm:mr-4">
                  <span class="font-bold text-sky-400 dark:text-gray-300">
                    {medicineData.category.categoryName}
                  </span>
                </div>
                <div>
                  <span class="font-bold text-sky-400 dark:text-gray-300">
                   {medicineData.medicineIngredients}
                  </span>
                </div>
              </div>

              <div class="mb-2 sm:mb-4">
                <p class="text-gray-400 text-left text-sm sm:text-base">
                  Best Price*
                  <span class="text-rose-400"> Rs 85</span>
                </p>

                <p class="text-xs sm:text-sm text-gray-400 text-left">
                  MRP <span class="line-through"> Rs 400</span>
                  <span class="text-sky-400 text-xs"> Get 15% OFF</span>
                </p>

                <p class="text-xs text-gray-400 text-left mt-2 sm:mt-5">
                  (Inclusive of all taxes)
                </p>
                <p class="text-xs text-gray-400 text-left">
                  *Applicable coupon can be applied during checkout
                </p>
                <p class="text-xs text-gray-400 text-left">
                  *This product cannot be returned for a refund or exchange
                </p>
                <p class="text-xs text-gray-400 text-left">
                  *MKT: {medicineData.manufacturer}
                </p>
                <p class="text-xs text-gray-400 text-left">
                  *Country of origin: India
                </p>
                <p class="italic text-xs text-gray-400 text-left">
                  *Delivery Charges if applicable will be applied at checkout
                </p>
              </div>

              <div class="mb-2 sm:mb-4 flex flex-col sm:flex-row">
                <button class="bg-cyan-400 text-white p-2 sm:p-1 rounded-lg w-full sm:w-2/6 my-2 sm:my-4 flex justify-center sm:justify-start">
                  <span class="w-full">Add To cart</span>
                </button>
                <button class="bg-cyan-400 text-white p-2 sm:p-1 rounded-lg w-full sm:w-2/6 my-2 sm:my-4 flex justify-center sm:justify-start sm:mx-10">
                  <span class="w-full">Buy Now</span>
                </button>
              </div>

              {/* <div class=" sm:flex-row">
                <p class="text-left text-gray-300 text-md sm:text-md">
                  Delivery Options
                </p>
                <div class="relative w-full sm:w-3/5 mt-2 sm:mt-0">
                  <div>
                    <label
                      for="first_name"
                      class="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter pincode"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 bottom-1 px-4 text-pink-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Check
                    </button>
                  </div>
                </div>
                <p class="text-left text-gray-400 text-sm sm:text-sm my-2">
                  Please enter PIN code to check delivery time & Pay on delivery Availability
                </p>
              </div> */}

              <InputWithValidation />

              {/* <div class="mt-2">
                <div class="w-full sm:w-2/5 bg-gray-400 h-16 sm:h-4/5">
                  <div class=""></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;