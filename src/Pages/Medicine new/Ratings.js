import React, { useEffect, useState } from "react";

const Ratings = () => {
    const reviews = [
        {
          image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1716894618~exp=1716898218~hmac=8b45688441236a42bbbaeb97383f62fdfa4e2356de6a1a08ae01e0675dde85ba&w=826",
          name: "John Doe",
          description: "Great product! Highly recommended. It exceeded all my expectations and the quality is top-notch. I will definitely buy again!",
          rating: 5,
          date: "2021-01-01",
        },
        {
          image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?t=st=1716894648~exp=1716898248~hmac=6b2eccf8eaf7118e81f35591474df2ae240c4610e854ce9ddde8615bd5ca602e&w=826",
          name: "Jane Smith",
          description: "Good quality, but could be improved. The packaging was a bit damaged when it arrived, but the product itself works fine.",
          rating: 4,
          date: "2021-01-01",
        },
        {
          image: "https://img.freepik.com/free-photo/lady-with-brown-eyes-is-smiling-red-wall_197531-16958.jpg?t=st=1716894676~exp=1716898276~hmac=de2b19c847d2bb107719bfa1d4f28d61c5b92e48c90f8fe93ac3f4fc168e4db8&w=826",
          name: "Alice Johnson",
          description: "Satisfied with the purchase. It met my needs and the customer service was very responsive. Will consider buying more in the future.",
          rating: 4,
          date: "2021-01-01",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Robert Brown",
          description: "The product is okay. It has some issues but overall it's functional. The price is reasonable for what it offers.",
          rating: 3,
          date: "2021-01-01",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Emma Wilson",
          description: "Excellent value for money. The build quality is solid and it performs as advertised. I'm very happy with my purchase.",
          rating: 5,
          date: "2021-01-01",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Oliver Jones",
          description: "Not bad, but not great either. It serves its purpose but I was expecting a bit more in terms of features and durability.",
          rating: 3,
          date: "2021-01-01",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Sophia Davis",
          description: "The product exceeded my expectations. It's very well made and the attention to detail is impressive. Highly recommend!",
          rating: 5,
          date: "2021-01-01",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Liam Martinez",
          description: "Average experience. The product works fine but the delivery was delayed. Customer service was helpful in resolving the issue.",
          rating: 3,
          date: "2021-01-01",
        },
      ];

      const [startIndex, setStartIndex] = useState(0);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      const getVisibleReviews = () => {
        if (windowWidth < 768) {
          return reviews.slice(startIndex, startIndex + 1);
        } else if (windowWidth < 1024) {
          return reviews.slice(startIndex, startIndex + 2);
        } else {
          return reviews.slice(startIndex, startIndex + 3);
        }
      };
    
      const handleNext = () => {
        if (startIndex + 3 < reviews.length) {
          setStartIndex(startIndex + 1);
        }
      };
    
      const handlePrev = () => {
        if (startIndex > 0) {
          setStartIndex(startIndex - 1);
        }
      };
    
      return (
        <>
          <div className="flex justify-between items-center w-[90%] mx-auto my-10">
            <h1 className="text-left text-xl font-bold">What our Customers say</h1>
          </div>
          <div className="relative w-[93%] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
              {getVisibleReviews().map((review, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 w-full h-full ${
                    index === 1 ? "shadow-lg" : ""
                  }`}
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3
                    className={`${
                      index === 1 ? "text-sky-500" : "text-sky-500 text-opacity-50"
                    } text-lg mb-2`}
                  >
                    {review.name}
                  </h3>
                  <p
                    className={`${
                      index === 1 ? "text-left" : "text-left text-opacity-50"
                    } mb-2 p-4`}
                  >
                    {review.description}
                  </p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className={`w-5 h-5 ${
                          index === 1 ? "text-yellow-500" : "text-yellow-500 text-opacity-50"
                        }`}
                      >
                        <path d="M12 .587l3.668 7.431 8.208 1.193-5.938 5.787 1.4 8.17L12 18.896l-7.338 3.857 1.4-8.17-5.938-5.787 8.208-1.193z" />
                      </svg>
                    ))}
                  </div>
                  <p
                    className={`italic text-sky-500 text-sm my-2 ${
                      index === 1 ? "" : "text-opacity-50"
                    }`}
                  >
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
            {startIndex > 0 && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
                onClick={handlePrev}
              >
                &lt;
              </button>
            )}
            {startIndex + 3 < reviews.length && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
                onClick={handleNext}
              >
                &gt;
              </button>
            )}
          </div>
        </>
  );
};

export default Ratings;
