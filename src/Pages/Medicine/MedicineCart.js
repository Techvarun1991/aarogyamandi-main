import { useState } from 'react';

const productsData = [
  {
    id: 1,
    name: 'Paracetamol',
    href: '#',
    color: 'Salmon',
    price: '350Rs',
    quantity: 1,
    imageSrc: 'https://images.apollo247.in/pub/media/catalog/product/3/_/3_7_3.png',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Acetaminophen',
    href: '#',
    color: 'Blue',
    price: '350Rs',
    quantity: 1,
    imageSrc: 'https://m.media-amazon.com/images/I/71Gy7z9J0AL._AC_UF1000,1000_QL80_.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Paracetamol',
    href: '#',
    color: 'Salmon',
    price: '350Rs',
    quantity: 1,
    imageSrc: 'https://images.apollo247.in/pub/media/catalog/product/3/_/3_7_3.png',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 4,
    name: 'Acetaminophen',
    href: '#',
    color: 'Blue',
    price: '350Rs',
    quantity: 1,
    imageSrc: 'https://m.media-amazon.com/images/I/71Gy7z9J0AL._AC_UF1000,1000_QL80_.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

const offers = [
    { id: 1, name: 'Buy one get one free' },
    { id: 2, name: '50% off on second item' },
    { id: 3, name: '10% off on entire order' },
  ];
  
  export default function ShoppingCart() {
    const [products, setProducts] = useState(productsData);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeOptions, setPromoCodeOptions] = useState([]);
    const [selectedPromoCode, setSelectedPromoCode] = useState('');
    
    const handleApplyPromoCode = () => {
      // Apply promo code logic here
    };
    
    const handleRemovePromoCode = () => {
      // Remove promo code logic here
    };
    const handleIncrementQuantity = (productId) => {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProducts(updatedProducts);
    };
  
    const handleDecrementQuantity = (productId) => {
      const updatedProducts = products.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProducts(updatedProducts);
    };
  
    const handleDeleteProduct = (productId) => {
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    };
  
    // Calculate subtotal based on prices and quantities of products
    const subtotal = products.reduce((acc, product) => {
      return acc + parseInt(product.price) * product.quantity;
    }, 0);
  
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 bg-gray-100 p-6 lg:ml-4 overflow-auto">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <img src={product.imageSrc} alt={product.imageAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">Color: {product.color}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-600"
                      onClick={() => handleDecrementQuantity(product.id)}
                    >
                      {/* Decrement button */}
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M20 12H4" />
                      </svg>
                    </button>
                    <p className="text-sm text-gray-500 mx-2">Qty {product.quantity}</p>
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-600"
                      onClick={() => handleIncrementQuantity(product.id)}
                    >
                      {/* Increment button */}
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="ml-4 text-gray-500 hover:text-red-600 focus:outline-none"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      {/* Delete button */}
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/3 p-6 lg:container">
            <h1 className="text-2xl font-semibold mb-4">Summary</h1>
            <div className="flex flex-col lg:flex-row items-center">
  <select
    className="w-full lg:w-80 border border-gray-300 rounded-md px-3 py-2 mr-4 focus:outline-none focus:ring focus:ring-indigo-400"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
  >
    {promoCodeOptions.length === 0 && (
      <option value="" disabled>
        No Promo Codes Available
      </option>
    )}
    {promoCodeOptions.map((option) => (
      <option key={option.discountValue} value={option.promoCode}>
        {option.promoCode}
      </option>
    ))}
  </select>

  {!selectedPromoCode ? (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
      onClick={handleApplyPromoCode}
    >
      Apply Promo Code
    </button>
  ) : (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-400"
      onClick={handleRemovePromoCode}
    >
      Remove Promo Code
    </button>
  )}
</div>
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="py-4 flex justify-between">
                  <div>
                    <p className="text-base text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">Qty {product.quantity}</p>
                  </div>
                  <p className="text-base text-gray-900">{product.price}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mb-4">
              <p className="text-lg font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-medium text-gray-900">{subtotal}Rs</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
           
            <div className="mt-6">
              <a
                href="#"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }