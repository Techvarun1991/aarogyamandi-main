import React from 'react'

const Product = () => {

    const products = [
        // Sample product data
        {
          id: 1,
          name: "TRESemme Anti-Dandruff Shampoo Anti-Hair fall 72 ml",
          price: "75.76",
          discount: "10% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "New",
          market: "Procter & Gamble",
          bestPrice: "$9",
          mrp: "Rs 80",
        },
        {
          id: 2,
          name: "TRESemme Anti-Dandruff Shampoo Anti-Hair fall 72 ml",
          price: "75.76",
          discount: "15% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "Sale",
          market: "Procter & Gamble",
          bestPrice: "$18",
          mrp: "Rs 80",
        },
        {
          id: 3,
          name: "Product 3",
          price: "75.76",
          discount: "20% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "Discount",
          market: "Procter & Gamble",
          bestPrice: "$25",
          mrp: "Rs 80",
        },
        {
          id: 4,
          name: "Product 4",
          price: "75.76",
          discount: "25% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "Limited",
          market: "Procter & Gamble",
          bestPrice: "$35",
          mrp: "Rs 80",
        },
        {
          id: 5,
          name: "Product 5",
          price: "75.76",
          discount: "30% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "Offer",
          market: "Procter & Gamble",
          bestPrice: "$40",
          mrp: "Rs 80",
        },
        {
          id: 6,
          name: "Product 6",
          price: "75.76",
          discount: "35% Off",
          imageSrc:
            "https://www.practostatic.com/ecommerce-assets/static/media/home/desktop/cat-2.640dcfd5.png",
          label: "Clearance",
          market: "Procter & Gamble",
          bestPrice: "$50",
          mrp: "Rs 80",
        },
        // Add more products as needed
      ];

  return (
    <div>
         <div className="container mx-auto p-4">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4">
          <h2 className="text-lg mb-4 text-left mx-4">Filters</h2>
          <div className="text-lg mb-4 text-left mx-4">
            <h3 className="mb-2">Shopping List</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="shampoo" className="mr-2" />
              <label htmlFor="shampoo" className="text-sm">
                Whishlist
              </label>
            </div>
           
          
          </div>


        </div>
        {/* Products Grid */}
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 ">
                <div className="bg-white p-4 shadow relative ">
                  <img
                    className="w-3/4 h-full mx-auto mt-10"
                    src={product.imageSrc}
                    alt={product.name}
                  />
                 
                  <div className="py-4 min-h-44">
                    <div className="font-bold text-sm mb-2 text-left min-h-12">
                      {product.name}
                    </div>
                    <p className="text-sm text-gray-400 text-left">
                      Mkt: {product.market}
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      Best Price: {""}
                      <span className="text-blue-500">₹ {product.price}</span>
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      MRP: <span className="line-through">{product.mrp}</span>
                    </p>
                    <button className="font-bold text-sky-400 w-full mt-2">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Product