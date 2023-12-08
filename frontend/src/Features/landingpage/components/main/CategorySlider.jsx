import React from "react";
import { useSubCatData } from "../../../categories/Context";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const { catData } = useSubCatData();
  console.log("catData: ", catData);
  return (
    <main>
      <section className=" pt-20">
        <div className="container-fluid">
          <div className="row justify-content-center">
            {catData?.slice(-4).map((category, i) => (
              <div key={category._id} className="col-xl-3 col-md-6">
                <div className="h7s-bottom-item mb-20">
                  <img src={`/src/assets/img/images/${i + 1}.png`} alt="" />
                  <div className="content">
                    <h5>
                      <Link to={`/shop?category=${category._id}`}>
                        {category.categoryName}
                      </Link>
                    </h5>
                    <Link to={`/shop?category=${category._id}`} className="btn">
                      shop now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategorySlider;
