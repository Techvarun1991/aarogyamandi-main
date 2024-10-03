import React, { useEffect, useState } from 'react';
import CategoryService from '../../Service/PharmcyService/CategoryService';
import { useNavigate } from 'react-router-dom';

const NavbarLine = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track currently open dropdown
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Track the active category
  const navigate = useNavigate();

  const toggleDropdown = (categoryId) => {
    // If the same dropdown is clicked again, it closes; otherwise, it opens
    if (openDropdown === categoryId) {
      setOpenDropdown(null);
      setActiveCategory(null); // Reset active category if closing the dropdown
    } else {
      setOpenDropdown(categoryId);
      setActiveCategory(categoryId); // Set active category
      // Fetch subcategories for the new dropdown
      CategoryService.getSubCategoriesByCategoryId(categoryId).then((response) => {
        console.log(response.data, '------------------sub category--------------');
        setSubCategory(response.data);
      });
    }
  };

  const handleItem = (item) => {
    console.log(item);
    localStorage.setItem('itemId', item);
    setOpenDropdown(null)
    navigate("/product", { state: { item } });
};


  useEffect(() => {
    CategoryService.getAllMainCategory().then((response) => {
      console.log(response.data);
      setMainCategories(response.data);
    });
  }, []);


  

  return (
    <div style={{ backgroundColor: "#33BBC5" }}> {/* Light blue background */}
      <div className="container mx-auto">
        {/* Main Menu Wrapper */}
        <div className="max-h-16 overflow-y-auto"> {/* Fixed height and scrollable */}
          <ul className="flex space-x-8 py-4 pl-12 text-[#FFFFFF] font-semibold justify-center">
            {mainCategories.map((category) => (
              <li key={category.categoryId} className="relative">
                <a
                  href="#"
                  onClick={() => toggleDropdown(category.categoryId)} // Call toggleDropdown on click
                  className={`hover:text-[#0099B1] ${activeCategory === category.categoryId ? 'underline' : ''}`} // Add underline if active
                >
                  {category.categoryName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Dropdown for Subcategories */}
        {subCategory.length > 0 && (
          <div>
            {openDropdown && ( // Check if there is an open dropdown
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white shadow-lg grid grid-cols-3 gap-6 p-6 z-10">
                {/* Iterate through subCategory array */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white shadow-lg grid grid-cols-3 gap-6 p-6 z-10">
                  {subCategory.map((category) => (
                    <div key={category.categoryId}>
                      <h3 className="font-bold text-[#007b8f] mb-2 text-left">{category.categoryName}</h3> {/* Display category name */}
                      <ul className="text-sm text-[#000000] space-y-1">
                        {/* Iterate through subCategories */}
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory.categoryId} className="hover:text-[#0099B1] cursor-pointer text-left">
                            <a
                            
                              onClick={() => handleItem(subCategory.categoryId)} // Call toggleDropdown on click
                              className={`hover:text-[#0099B1] ${activeCategory === category.categoryId ? 'underline' : ''}`} // Add underline if active
                            >
                            {subCategory.categoryName} {/* Display subcategory name */}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                  }

                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default NavbarLine;
