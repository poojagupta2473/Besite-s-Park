import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance ";

const UpdateProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [ram, setRam] = useState("");
  const [processor, setProcessor] = useState("");
  const [camera, setCamera] = useState("");
  const [screen, setScreen] = useState("");
  const [storage, setStorage] = useState("");
  const [color, setColor] = useState("");
  const [about, setAbout] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleCameraChange = (e) => setCamera(e.target.value);
  const handleRamChange = (e) => setRam(e.target.value);
  const handleProcessorChange = (e) => setProcessor(e.target.value);
  const handleScreenChange = (e) => setScreen(e.target.value);
  const handleStorageChange = (e) => setStorage(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleAboutChange = (e) => setAbout(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/getProduct/${id}`
      );
      const product = await response.data;
      setTitle(product?.title);
      setBrand(product?.brand);
      setModel(product?.model);
      setPrice(product?.price);
      setRam(product?.ram);
      setProcessor(product?.processor);
      setCamera(product?.camera);
      setScreen(product?.screen);
      setStorage(product?.storage);
      setColor(product?.color);
      setAbout(product?.about);
      setQuantity(product?.quantity);
    } catch (error) {
      console.log(error);
      setError("Internal Serever Error");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // if (!image) {
    //   console.error("Please select an image to upload");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("ram", ram);
      formData.append("processor", processor);
      formData.append("camera", camera);
      formData.append("screen", screen);
      formData.append("storage", storage);
      formData.append("color", color);
      formData.append("about", about);
      formData.append("quantity", quantity);

      const response = await axiosInstance.patch(
        `/updateProduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 204) {
        setSuccess("Data uploaded successfully");
        setTimeout(() => {
          setSuccess("");
          navigate("/admin/allproducts");
        }, 3000);
      } else {
        setError("Somthing went's wrong");
      }
    } catch (error) {
      setError("Internal Serever Error");
      console.error("Error uploading image", error);
    }
  };

  setTimeout(() => {
    setError("");
  }, 3000);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="card" style={{ backgroundColor: "#eeffee" }}>
          <div className="card-body m-3">
            <form encType="multipart/form-data" onSubmit={handleUpload}>
              <div className="mb-1">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter product title"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="mb-1">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={brand}
                  onChange={handleBrandChange}
                  placeholder="Enter brand name"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="model" className="form-label">
                  Model
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={model}
                  onChange={handleModelChange}
                  placeholder="Enter model"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="ram" className="form-label">
                  Ram
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ram"
                  value={ram}
                  onChange={handleRamChange}
                  placeholder="Enter RAM capacity"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="processor" className="form-label">
                  Processor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="processor"
                  value={processor}
                  onChange={handleProcessorChange}
                  placeholder="Enter processor details"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="camera" className="form-label">
                  Camera
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="camera"
                  value={camera}
                  onChange={handleCameraChange}
                  placeholder="Enter camera specifications"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="screen" className="form-label">
                  Screen
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="screen"
                  value={screen}
                  onChange={handleScreenChange}
                  placeholder="Enter screen size"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="storage" className="form-label">
                  Storage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="storage"
                  value={storage}
                  onChange={handleStorageChange}
                  placeholder="Enter storage capacity"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="color" className="form-label">
                  Color
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={color}
                  onChange={handleColorChange}
                  placeholder="Enter color"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="about" className="form-label">
                  About
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="about"
                  value={about}
                  onChange={handleAboutChange}
                  placeholder="Describe the product"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Enter quantity"
                />
              </div>

              <div className="mb-1">
                <label htmlFor="productImage" className="form-label">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  id="productImage"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Upload Product
              </button>
            </form>
            {success && (
              <div className="alert alert-success mt-3" role="alert">
                {success}
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
