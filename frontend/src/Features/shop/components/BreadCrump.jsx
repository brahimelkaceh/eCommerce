import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  return (
    <div>
      <section
        className="breadcrumb-area breadcrumb-bg"
        data-background="img/bg/breadcrumb_bg01.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2>Shop All</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BreadCrumb;
