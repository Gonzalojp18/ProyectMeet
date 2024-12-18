import React, { useState, useRef, useEffect } from 'react';
import useMenuStore from '../../store/menuStore';
import meetingLogo from '../../assets/miselaneous/meetinglogo.png';

const CategoryNav = () => {
  const { menu } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 80; // Ajuste para el header fijo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setActiveCategory(categoryId);
  };

  // Detectar la categoría activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const categories = menu.categories.map((cat) => ({
        id: cat.id,
        element: document.getElementById(`category-${cat.id}`),
      }));

      const activeCategory = categories.find((cat) => {
        if (!cat.element) return false;
        const rect = cat.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (activeCategory) {
        setActiveCategory(activeCategory.id);
        // Scroll el botón activo a la vista
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
  }, [menu.categories]);

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
            {menu.categories.map((category) => (
              <button
                key={category.id}
                id={`cat-button-${category.id}`}
                onClick={() => scrollToCategory(category.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200 transform hover:scale-105
                  ${activeCategory === category.id
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
