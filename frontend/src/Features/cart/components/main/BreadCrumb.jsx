import React from "react";

const BreadCrumb = () => {
  return (
    <section
      className="breadcrumb-area breadcrumb-bg"
      data-background="img/bg/breadcrumb_bg03.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2>Cart Page</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumb;
