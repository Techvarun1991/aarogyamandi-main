import React, { useState, useEffect } from "react";
import CartService from "../../Service/PharmcyService/CartService";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for proper styling
import { toast, ToastContainer } from "react-toastify";

const Halfpricestore = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 2,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 3,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 4,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
    {
      id: 5,
      imageSrc:
        "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
      label: "40% OFF",
      title: "The Coldest Sunset",
      market: "Mkt: Inlife Pharma Private Limited",
      bestPrice: "Rs. 400",
      mrp: "Rs. 499.00",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (windowWidth < 768) {
      setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
    } else {
      setStartIndex((prevIndex) =>
        prevIndex + 4 < cards.length ? prevIndex + 4 : prevIndex
      );
    }
  };
  const handleAddToCart = (medicine, event) => {
    console.log(medicine);
    const payload = {
      medicineId: medicine.medicine.medicineId,
      profileId: localStorage.getItem("profileId"),
      quantity: 1,
      pharmaStockId: medicine.pharmacyMedicineStockId,
      prescriptionId: "",
    };
    CartService.addToCart(payload).then((response) => {
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/cart");
        }, 2000);
        toast.success("Item added to cart successfully");
      } else {
        toast.error("Failed to add item to cart please try again");
      }
    });
  };
  const handlePrev = () => {
    if (windowWidth < 768) {
      setStartIndex((prevIndex) =>
        prevIndex === 0 ? cards.length - 1 : prevIndex - 1
      );
    } else {
      setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-[90%] mx-auto my-10">
        <h1 className="text-left text-xl font-bold">Half Price Store</h1>
        <span className="text-right text-sm text-blue-500 cursor-pointer">
          View More
        </span>
      </div>

      <div className="relative w-[93%] mx-auto">
        <div className="flex overflow-hidden">
          {cards
            .slice(
              startIndex,
              windowWidth < 768 ? startIndex + 1 : startIndex + 4
            )
            .map((card) => (
              <div
                key={card.id}
                className="w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 relative"
              >
                <div className="bg-white p-4 shadow relative">
                  <img
                    className="w-3/4 h-full mx-auto mt-10"
                    src={card.imageSrc}
                    alt="Sunset in the mountains"
                  />
                  <span className="absolute top-3 left-0 bg-rose-400 text-white px-2 py-1 rounded-r-md">
                    {card.label}
                  </span>
                  <div className="px-2 py-4">
                    <div className="font-bold text-md mb-2 text-left">
                      {card.title}
                    </div>
                    <p className="text-sm text-gray-400 text-left">
                      {card.market}
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      Best Price{" "}
                      <span className="text-blue-500">{card.bestPrice}</span>
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      MRP <span className="line-through">{card.mrp}</span>
                    </p>
                    <button className="font-bold text-sky-400 w-full mt-2" onClick={(e) => {
                      e.stopPropagation(); // Prevents event from bubbling up if necessary
                      handleAddToCart(card); // Ensures it's called only once
                    }}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
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
        {(windowWidth < 768 && startIndex + 1 < cards.length) ||
          (windowWidth >= 768 && startIndex + 4 < cards.length) ? (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-cyan-400 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            &gt;
          </button>
        ) : null}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Halfpricestore;
