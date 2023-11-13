import React from 'react'

const CatArea = () => {
  return (
    <section className="category-area pt-100 pb-45">
      <div className="container">
        <div className="cat-title-line">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              <div className="cat-section-title text-center">
                <div className="icon">
                  <img src="img/icon/logo_icon.png" alt="" />
                </div>
                <span className="sub-title">CHOOSE A TYPE</span>
                <h2 className="title">
                  Online shopping defined by fashion <br /> popular aesthetic
                  expression at a particular place
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <div className="shop-cat-item">
              <a href="shop-sidebar.html">
                <div className="icon">
                  <img src="img/icon/b_cat_icon01.png" alt="" />
                </div>
                <p>
                  King Bread <span>( 9 Items )</span>
                </p>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="shop-cat-item">
              <a href="shop-sidebar.html">
                <div className="icon">
                  <img src="img/icon/b_cat_icon02.png" alt="" />
                </div>
                <p>
                  Spring Roll <span>( 8 Items )</span>
                </p>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="shop-cat-item">
              <a href="shop-sidebar.html">
                <div className="icon">
                  <img src="img/icon/b_cat_icon03.png" alt="" />
                </div>
                <p>
                  Donet Sweet <span>( 12 Items )</span>
                </p>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="shop-cat-item">
              <a href="shop-sidebar.html">
                <div className="icon">
                  <img src="img/icon/b_cat_icon04.png" alt="" />
                </div>
                <p>
                  Hot Pizza <span>( 10 Items )</span>
                </p>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="shop-cat-item">
              <a href="shop-sidebar.html">
                <div className="icon">
                  <img src="img/icon/b_cat_icon05.png" alt="" />
                </div>
                <p>
                  Chocolate Cake <span>( 19 Items )</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatArea