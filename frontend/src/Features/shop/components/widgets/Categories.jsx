import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ catData, SubcatData, onSubcategoryClick }) => {
  return (
    <div className="widget">
      {catData &&
        catData.map((category) => (
          <div key={category.id}>
            <h4 className="widget-title">{category.categoryName}</h4>
            <div className="sidebar-brand-list">
              <ul>
                {SubcatData.filter(
                  (subcategory) => subcategory.categoryId._id === category._id
                ).map((subcategory) => (
                  <li key={subcategory._id}>
                    <a
                      onClick={() => onSubcategoryClick(subcategory._id)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {subcategory.subCategoryName}{" "}
                      <i className="fas fa-angle-double-right" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Categories;
