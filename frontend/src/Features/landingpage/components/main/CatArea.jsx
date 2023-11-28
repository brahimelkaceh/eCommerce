import React from 'react'

const CatArea = () => {
  return (
    <section className="category-area pt-80 pb-45">
  <div className="container">
    <div className="cat-title-line">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9">
          <div className="cat-section-title text-center">
            <span className="sub-title">PREMIUM QUALITY</span>
            <h2 className="title">Unlocking inspiration through a one-of-a-kind blend <br /> of products, creativity, and cultural insight
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
              <img src="img/icon/s_cat_icon01.png" alt />
            </div>
            <p>Furniture <span>( 9 Items )</span></p>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="shop-cat-item">
          <a href="shop-sidebar.html">
            <div className="icon">
              <img src="img/icon/s_cat_icon02.png" alt />
            </div>
            <p>Electronics <span>( 8 Items )</span></p>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="shop-cat-item">
          <a href="shop-sidebar.html">
            <div className="icon">
              <img src="img/icon/s_cat_icon03.png" alt />
            </div>
            <p>Jewelry <span>( 12 Items )</span></p>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="shop-cat-item">
          <a href="shop-sidebar.html">
            <div className="icon">
              <img src="img/icon/s_cat_icon04.png" alt />
            </div>
            <p>Desk Suplies <span>( 10 Items )</span></p>
          </a>
        </div>
      </div>
      <div className="col">
        <div className="shop-cat-item">
          <a href="shop-sidebar.html">
            <div className="icon">
              <img src="img/icon/s_cat_icon05.png" alt />
            </div>
            <p>Artifacts <span>( 19 Items )</span></p>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default CatArea
