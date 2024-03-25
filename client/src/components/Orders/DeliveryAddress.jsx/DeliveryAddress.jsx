import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../../Utils/axiosInstance";
import jsPDF from "jspdf";
// import logo from "../../../../fevicon/apple-touch-icon.png";

const DeliveryAddress = ({ orders, products }) => {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authState = useContext(authContext);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/profile/${authState.id}`);
      setAddress(response?.data?.address);
    } catch (error) {
      console.error("Failed to fetch address", error);
      setError("Failed to load address data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let currentY = 50;
    doc.setFillColor(230, 230, 230);
    doc.rect(0, 0, pageWidth, 45, "F");

    // doc.addImage(logo, "JPEG", margin, 8, 20, 20);

    let formattedDate = "Date not available";
    if (orders?.purchaseDate) {
      const purchaseDate = new Date(orders.purchaseDate);
      formattedDate = purchaseDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    doc.setFontSize(12);
    const dateWidth = doc.getTextWidth(formattedDate);
    doc.text(`Date: ${formattedDate}`, pageWidth - margin - dateWidth, 15);

    // Title
    doc.setFontSize(25);
    doc.setFont(undefined, "bold");
    doc.setTextColor("#444444");
    doc.text(
      "CityWide Product Invoice",
      pageWidth / 2,
      40,
      null,
      null,
      "center"
    );

    // Underline for title
    doc.setDrawColor(0); // Black color for line
    doc.setLineWidth(0.5);
    doc.line(margin, 45, pageWidth - margin, 45);

    // Reset font size for the rest of the document
    doc.setFontSize(12);

    // Section Title Function (reusable)
    const drawSectionTitle = (title) => {
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.setTextColor("#000000"); // Black color for text
      doc.text(title, margin, currentY);
      currentY += lineHeight / 2; // Slight space before underline
      doc.setLineWidth(0.2);
      doc.line(margin, currentY, pageWidth - margin, currentY); // Underline
      currentY += lineHeight / 2; // Space after underline before text starts
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.setTextColor("#333333"); // Dark grey for text
    };

    // Delivery Address
    drawSectionTitle("Delivery Address");
    doc.text(`${address.name}`, margin, currentY);
    currentY += lineHeight;
    doc.text(
      `${address.street}, ${address.city} - ${address.pincode}`,
      margin,
      currentY
    );
    currentY += lineHeight;
    doc.text(`${address.state}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Phone Number: ${address.mobile}`, margin, currentY);
    currentY += lineHeight * 1.5; // Ext

    // Order Details
    drawSectionTitle("Order Details");
    doc.text(`Order ID: ${orders?.orderId}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Payment ID: ${orders?.paymentId}`, margin, currentY);
    currentY += lineHeight;
    doc.text(
      `Quantity: ${orders?.cartProducts.reduce(
        (acc, item) => acc + item.quantity,
        0
      )}`,
      margin,
      currentY
    );
    currentY += lineHeight;
    doc.text(`Total Pay Amount: ₹${orders?.allProductCost}`, margin, currentY);
    currentY += lineHeight * 1.5;

    // Product Details
    drawSectionTitle("Product Details");
    products.forEach((product, index) => {
      currentY += lineHeight;
      doc.text(
        `${index + 1}. ${product.title} - ${product.model}`,
        margin,
        currentY
      );
      currentY += lineHeight;
      doc.text(
        `Brand: ${product.brand}, Price: ₹${product.price}, RAM: ${product.ram}GB, Storage: ${product.storage}GB`,
        margin,
        currentY
      );
      currentY += lineHeight; // Adjust spacing as needed
    });

    // Footer Border
    doc.setLineWidth(0.5);
    doc.line(
      margin,
      doc.internal.pageSize.getHeight() - 30,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 30
    );

    // Footer Text
    doc.setFontSize(10);
    doc.setTextColor("#666666"); // Lighter grey for footer
    doc.text(
      "Thank you for your business!",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 20,
      null,
      null,
      "center"
    );
    doc.text(
      `All rights reserved`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 12,
      null,
      null,
      "center"
    );

    // Save the PDF
    doc.save("invoice.pdf");
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-8">
            <h5 className="fs-4 fw-bold lh-1 mb-3 card-header">
              Delivery Address
            </h5>
            <div className="card-body">
              <h4 className="mb-2">{address.name}</h4>
              <p className="mb-1">
                {address.street}, {address.city} - {address.pincode}
              </p>
              <p className="mb-2">{address.state}</p>
              <p className="fw-bold mb-0">Phone Number: {address.mobile}</p>
            </div>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-between">
            <div className="ms-3">
              <h5 className="fs-4 fw-bold lh-1 mb-3 card-header">
                More Action
              </h5>
            </div>
            <div className="mb-3 ms-4">
              <strong>Download Invoice: </strong>
              <button className="btn btn-success" onClick={downloadInvoice}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryAddress;
