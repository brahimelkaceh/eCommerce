import React from "react";

const Newsletter = () => {
  return (
    <main>
      <section className="newsletter-area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="newsletter-bg newsletter-style-two"
                data-background="img/bg/newsletter_bg02.jpg"
                style={{ backgroundImage: 'url("img/bg/newsletter_bg02.jpg")' }}
              >
                <div className="newsletter-title mb-65">
                  <h2 className="title">NEWSLETTER!</h2>
                  <h6 className="sub-title">
                    SUBSCRIBE AND GET DISCOUNT 25% OFF
                  </h6>
                </div>
                <form action="#" className="newsletter-form">
                  <input
                    className="input"
                    type="email"
                    placeholder="Your email address..."
                  />
                  <button>
                    <span>Subscribe</span>{" "}
                    <i className="far fa-arrow-alt-circle-right" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Newsletter;
