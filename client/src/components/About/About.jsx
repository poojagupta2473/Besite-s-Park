import React from "react";
import about from "../../assets/Images/about.jpg";

const About = () => {
  return (
    <>
      <div className="pt-5" style={{ backgroundColor: "#fff4f4" }}>
        <div className="container py-3">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4">
              <img
                src={about}
                alt="Our Mobile Shop"
                className="img-fluid rounded shadow-lg p-4 border border-success"
                style={{ maxWidth: "85%" }}
              />
            </div>
            <div className="col-lg-6">
              <h1 className="text-center mb-5 text-primary">About Us</h1>
              <h2 className="mb-3 text-secondary">Welcome to Bestie"s Park!</h2>
              <p>
                At Bestie"s Park!, we're passionate about bridging the gap
                between technology and people. Since our founding in [Year], our
                journey from a quaint store in [Location] to a premier mobile
                retail app has been nothing short of extraordinary.
              </p>
              <p>
                Our mission is ambitious yet straightforward: to deliver
                cutting-edge mobile technology at unbeatable prices, all while
                providing customer service that's second to none. In today's
                digital age, we believe that staying connected should be easy
                and affordable for everyone.
              </p>
              {/* Additional Content */}
              <h3 className="mb-3 text-success">Our Vision</h3>
              <p>
                We envision a world where everyone has access to the latest
                mobile technology, empowering individuals to learn, share, and
                create in ways never before possible. Our commitment to
                innovation, affordability, and user satisfaction drives every
                decision we make.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-5">
            <h3 className="mb-3 text-danger">Why Choose Us?</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Wide Selection</strong> - Our diverse range of
                    products ensures you find exactly what you're looking for.
                  </li>
                  <li className="mb-2">
                    <strong>Expert Advice</strong> - Our knowledgeable team is
                    always on hand to help you navigate our tech.
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Competitive Prices</strong> - We offer the best
                    deals, making top tech accessible to everyone.
                  </li>
                  <li className="mb-2">
                    <strong>Exceptional Service</strong> - We're dedicated to
                    your satisfaction and always here to help.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-5">
            <h3 className="mb-3 text-info">Hear From Our Customers</h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title">S.Hemalatha</h5>
                    <p className="card-text">
                      "Bestie"s Park! transformed the way I use my phone. Their
                      selection and prices are unbeatable."
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title">L.Rahunathan</h5>
                    <p className="card-text">
                      "The customer service at Bestie"s Park! is top-notch. They
                      really go the extra mile for you."
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title">T.Kavitha</h5>
                    <p className="card-text">
                      "I was amazed by how easy it was to find what I needed.
                      The expert advice helped me make the perfect choice."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
