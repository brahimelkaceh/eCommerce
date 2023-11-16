import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const SubcategoriesContext = createContext();

// Create context provider component
export const SubcategoriesProvider = ({ children }) => {
  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories data
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/subcategories');
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <SubcategoriesContext.Provider value={{ subcategories }}>
      {children}
    </SubcategoriesContext.Provider>
  );
};

// Create a custom hook for using the SubcategoriesContext
export const useSubcategories = () => {
  const context = useContext(SubcategoriesContext);
  if (!context) {
    throw new Error('useSubcategories must be used within a SubcategoriesProvider');
  }
  return context;
};
