import React from "react";

const chooseArea = () => {
  return (
    <section className="h9-choose-area">
      <div
        className="h9-choose-img"
        data-background="img/images/h9_choose_img.jpg"
      ></div>
      <div
        className="h9-choose-bg"
        data-background="img/bg/h9_choose_bg.jpg"
      ></div>
      <div className="container">
        <div className="row justify-content-center justify-content-lg-end">
          <div className="col-lg-6 col-md-9">
            <div className="h9-choose-content">
              <div className="cat-section-title mb-40">
                <span className="sub-title">CHOOSE A TYPE</span>
                <h2 className="title">Winter Strong Breakfast Sale upto 30%</h2>
              </div>
              <div className="h9-choose-list">
                <ul>
                  <li>
                    <div className="icon">
                      <img src="img/icon/h9_choose_icon01.png" alt="" />
                    </div>
                    <div className="content">
                      <h5>Hot Burger</h5>
                      <p>
                        Lorem Ipsum placeholder text for use in your graphic,
                        print and web layouts, and discover plugins
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="img/icon/h9_choose_icon02.png" alt="" />
                    </div>
                    <div className="content">
                      <h5>Double Cheese Pizza</h5>
                      <p>
                        Lorem Ipsum placeholder text for use in your graphic,
                        print and web layouts, and discover plugins
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="img/icon/h9_choose_icon03.png" alt="" />
                    </div>
                    <div className="content">
                      <h5>Fresh Juice</h5>
                      <p>
                        Lorem Ipsum placeholder text for use in your graphic,
                        print and web layouts, and discover plugins
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default chooseArea;
