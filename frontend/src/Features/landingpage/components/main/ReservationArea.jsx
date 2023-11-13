import React from 'react'

const ReservationArea = () => {
  return (
    <section
      className="reservation-area reservation-bg"
      data-background="img/bg/res_bg.jpg"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="reservation-wrap text-center">
              <div className="reservation-title">
                <div className="icon">
                  <img src="img/icon/res_icon.png" alt="" />
                </div>
                <h2 className="title">
                  Reservation<span>!</span>
                </h2>
              </div>
              <div className="reservation-contact">
                <p>
                  Reservation Form Powered by Adara Tables{" "}
                  <span>+9 845 854 7458</span> – contact@info.com
                </p>
              </div>
              <div className="reservation-action">
                <form action="#">
                  <div className="reservation-form-top">
                    <div className="form-grp">
                      <i className="far fa-calendar-alt"></i>
                      <input
                        type="text"
                        className="date"
                        placeholder="Select Date"
                      />
                    </div>
                    <div className="form-grp">
                      <i className="far fa-clock"></i>
                      <input
                        type="text"
                        value="6 : 30 PM"
                        placeholder="Select Time"
                      />
                    </div>
                    <div className="form-grp">
                      <i className="far fa-user"></i>
                      <input
                        type="text"
                        value="1 Person"
                        placeholder="Select Person"
                      />
                    </div>
                  </div>
                  <button className="btn">shop now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationArea