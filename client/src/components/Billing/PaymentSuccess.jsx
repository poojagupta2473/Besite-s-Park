import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const reference_no = searchQuery.get("reference");

  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(timer);
          navigate("/orders");
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h1 className="display-4 text-center mb-4">
                Payment Receipt Page
              </h1>
              <h4 className="text-center mb-4">
                Your payment has been completed successfully
              </h4>
              <p className="lead text-center">
                Your Payment ID is: {reference_no}
              </p>
              <p className="text-center">
                Now you will be redirected to the Home page in {counter}{" "}
                seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
