import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div
        className="text-white pt-5 pb-4"
        style={{ backgroundColor: "#172337" }}
      >
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                CityWide
              </h5>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Products
              </h5>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  The North Face
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Adidas
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Nike
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Under Armour
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Useful links
              </h5>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Your Account
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Shipping Rates
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
                Contact
              </h5>
              <p>
                <i className="fas fa-home mr-3"></i> Mirzatola Bettiah, Bth
                845438, IN
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> er.rajeev.mca@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> +91 8084602358
              </p>
              <p>
                <i className="fas fa-print mr-3"></i> +91 8084602358
              </p>
            </div>
          </div>

          <hr className="mb-4" />
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <span className="text-left text-md-left me-5">
                Developer: Rajeev Ranjan
              </span>
              <span className="text-left text-md-left">
                © {currentYear} CityWide.com
              </span>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="text-center text-md-right">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="#"
                      className="btn-floating btn-sm text-white"
                      style={{ fontSize: "23px" }}
                    >
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
