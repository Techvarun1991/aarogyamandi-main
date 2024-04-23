import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";

const product = {
  name: "Cetaphil",
  price: "₹ 300",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Medicine", href: "#" },
    { id: 2, name: "Skin Care", href: "#" },
  ],
  images: [
    {
      src: "https://m.media-amazon.com/images/I/71WPus+v+JL._SY879_.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://m.media-amazon.com/images/I/41ZRdJeNxUL.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://m.media-amazon.com/images/I/710voFTOJeL.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://rukminim2.flixcart.com/image/850/1000/xif0q/cleanser/i/1/e/-original-imagsqfg4dzg9c32.jpeg?q=90&crop=false",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [largeImage, setLargeImage] = useState(product.images[0]);

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
  
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol role="list" className="flex items-center space-x-2 py-6">
          {product.breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <a
                  href={breadcrumb.href}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {breadcrumb.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
          ))}
          <li>
            <a
              href={product.href}
              aria-current="page"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      <div className="mx-auto max-w-80 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Large image */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-lg">
              <img
                src={largeImage.src}
                alt={largeImage.alt}
                className="object-cover object-center h-full w-full"
              />
            </div>
          </div>

          {/* Small images */}
          {product.images.slice(1).map((image, index) => (
            <div key={index} className="md:col-span-1 lg:col-span-1">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover object-center h-full w-full cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {product.price}
            </p>


            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-base text-gray-500">
                {product.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900">Highlights</h2>
              <ul
                role="list"
                className="mt-2 pl-4 list-disc text-base text-gray-500"
              >
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
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
                    <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
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
                <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
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
                 <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
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
                 <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
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
                  <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
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
