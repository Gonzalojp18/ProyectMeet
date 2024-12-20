import React, { useState, useRef, useEffect } from 'react';
import meetingLogo from '../../assets/miselaneous/meetinglogo.png';

const CategoryNav = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setActiveCategory(categoryId);
  };

  useEffect(() => {
    const categoriesWithElements = categories.map((cat) => ({
      id: cat._id,
      element: document.getElementById(`category-${cat._id}`),
    }));

    const handleScroll = () => {
      const activeCategory = categoriesWithElements.find((cat) => {
        if (!cat.element) return false;
        const rect = cat.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (activeCategory) {
        setActiveCategory(activeCategory.id);
        const activeButton = document.getElementById(`cat-button-${activeCategory.id}`);
        if (activeButton && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            left: activeButton.offsetLeft - scrollContainerRef.current.offsetWidth / 2 + activeButton.offsetWidth / 2,
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 backdrop-blur-md shadow-sm z-50 flex items-center p-2">
      <a href="/">
        <img src={meetingLogo} alt="Logo" id="logo" />
      </a>
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex space-x-2 py-3 px-2">
            {categories.map((category) => (
              <button
                key={category._id}
                id={`cat-button-${category._id}`}
                onClick={() => scrollToCategory(category._id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200 transform hover:scale-105
                  ${activeCategory === category._id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
