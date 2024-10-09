

import React, { useEffect, useState, useRef } from "react";
import CategoryService from "../../Service/PharmcyService/CategoryService";
import { useNavigate } from "react-router-dom";

const NavbarLine = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track currently open dropdown
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Track the active category
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 }); // Track dropdown position
  const navigate = useNavigate();

  const toggleDropdown = (categoryId, categoryElement) => {
    // Get the position of the hovered category
    const rect = categoryElement.getBoundingClientRect();

    // Set the dropdown position below the hovered category
    setDropdownPosition({
      top: rect.bottom, // Position below the category
      left: rect.left, // Align with the category's left side
    });

    // If the same dropdown is clicked again, it closes; otherwise, it opens
    if (openDropdown === categoryId) {
      setOpenDropdown(null);
      setActiveCategory(null); // Reset active category if closing the dropdown
    } else {
      setOpenDropdown(categoryId);
      setActiveCategory(categoryId); // Set active category
      // Fetch subcategories for the new dropdown
      CategoryService.getSubCategoriesByCategoryId(categoryId).then(
        (response) => {
          console.log(
            response.data,
            "------------------sub category--------------"
          );
          setSubCategory(response.data);
        }
      );
    }
  };

  const closeDropdown = () => {
    // Close the dropdown when leaving the main category or the dropdown
    setOpenDropdown(null);
    setActiveCategory(null);
  };

  const handleItem = (item) => {
    console.log(item);
    localStorage.setItem("itemId", item);
    setOpenDropdown(null);
    navigate("/product", { state: { item } });
  };

  useEffect(() => {
    CategoryService.getAllMainCategory().then((response) => {
      console.log(response.data);
      setMainCategories(response.data);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#33BBC5" }}>
      {/* Light blue background */}
      <div className="container mx-auto">
        {/* Main Menu Wrapper */}
        <div className="max-h-16 overflow-y-auto">
          {" "}
          {/* Fixed height and scrollable */}
          <ul className="flex space-x-8 py-4 pl-12 text-[#FFFFFF] font-semibold justify-center">
            {mainCategories.map((category) => (
              <li key={category.categoryId} className="relative">
                <div
                  onMouseEnter={(e) => toggleDropdown(category.categoryId, e.currentTarget)} // Pass element to get position
                  onMouseLeave={closeDropdown} // Close dropdown when the mouse leaves
                  className={`hover:text-[#0099B1] cursor-pointer ${activeCategory === category.categoryId ? "underline" : ""
                    }`} // Add underline if active
                >
                  {category.categoryName}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Dropdown for Subcategories */}
        {subCategory.length > 0 && openDropdown && (
          <div
            className="absolute bg-white shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 z-10"
            style={{
              top: dropdownPosition.top + "px",
              left: dropdownPosition.left + "px",
              height: "400px", // Set the desired height
              overflowY: "auto" // Enable vertical scrolling if content exceeds height
            }} onMouseEnter={() => setOpenDropdown(activeCategory)}
            onMouseLeave={closeDropdown}
          >
            {subCategory.map((category) => (
              <div key={category.categoryId}>
                <h3 className="font-bold text-[#007b8f] mb-2 text-left">
                  {category.categoryName}
                </h3>
                <ul className="text-sm text-[#000000] space-y-1">
                  {category.subCategories.map((subCategory) => (
                    <li
                      key={subCategory.categoryId}
                      className="hover:text-[#0099B1] cursor-pointer text-left"
                    >
                      <div
                        onClick={() => handleItem(subCategory.categoryId)}
                        className={`hover:text-[#0099B1] ${activeCategory === category.categoryId
                          ? "underline"
                          : ""
                          }`}
                      >
                        {subCategory.categoryName}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLine;


