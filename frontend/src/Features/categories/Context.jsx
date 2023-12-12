// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchSubcategoriesData,
  fetchSubcategoryById,
  updateSubcategory,
  createSubcategory,
  deleteSubcategory,
} from "./SubCategorisServices";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "./CategoriesService";

const DataSubcategoriesContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const [SubcatData, setSubcatData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subcategory, setSubcategory] = useState([]);
  const [refresh, setRefresh] = useState(new Date().getMilliseconds());
  const [refreshSub, setRefreshSub] = useState(new Date().getMilliseconds());

  const [subCategoryID, setSubcategoryID] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // ! ====== CATEGORIES MANAGEMENT =====
  console.log("hello from context : ", selectedSubcategory);
  useEffect(() => {
    const getCategoriesData = async () => {
      setLoading(true);
      try {
        const response = await fetchCategories("");
        setCatData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCategoriesData();
  }, [refresh]);

  const createCat = async (newCategoryData) => {
    try {
      const createdCategory = await createCategory(newCategoryData);
      if (createdCategory.status !== "success") {
        setCategoryError("duplicate category");
      } else {
        setCategoryError("");
        console.log("Created category:", createdCategory);
      }
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };
  const deleteCat = async (id) => {
    try {
      await deleteCategory(id);
      setCatData((prevData) =>
        prevData.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };
  const updateCat = async (id, updatedCategoryData) => {
    try {
      await updateCategory(id, updatedCategoryData);
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };
  // ! ======== SUBCATEGORIES MANAGEMENT =================================
  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);

      try {
        const responseData = await fetchSubcategoriesData("");
        setSubcatData(responseData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [refresh, refreshSub]);
  const getSubcategoryById = async (id) => {
    try {
      const fetchedSubcategory = await fetchSubcategoryById(id);
      setSubcategory(fetchedSubcategory.data);
    } catch (error) {
      console.error("Error fetching subcategory:", error);
    }
  };

  const updateSubCat = async (id, updatedSubcategoryData) => {
    try {
      await updateSubcategory(id, updatedSubcategoryData);
      setRefreshSub(new Date().toISOString());
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const createSubCat = async (newSubcategoryData) => {
    try {
      const createdSubcategory = await createSubcategory(newSubcategoryData);
      console.log("Created subcategory:", createdSubcategory);
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  const deleteSubCat = async (id) => {
    try {
      await deleteSubcategory(id);
      setSubcatData((prevData) =>
        prevData.filter((subcategory) => subcategory.id !== id)
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const values = {
    catData,
    createCat,
    setRefresh,
    deleteCat,
    updateCat,
    categoryError,
    loading,
    // ! =================================================================
    SubcatData,
    error,
    getSubcategoryById,
    updateSubCat,
    setRefreshSub,
    createSubCat,
    deleteSubCat,
    subcategory,
    selectedSubcategory,
    setSelectedSubcategory,
    subCategoryID,
    setSubcategoryID,
  };

  return (
    <DataSubcategoriesContext.Provider value={values}>
      {children}
    </DataSubcategoriesContext.Provider>
  );
};

export const useSubCatData = () => {
  return useContext(DataSubcategoriesContext);
};
