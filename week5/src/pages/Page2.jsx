import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";

const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the product details passed via state from Page1
  const product = location.state;

  if (!product) {
    return <div>No product selected.</div>;
  }

  const {
    title,
    price,
    category,
    description,
    images,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
  } = product;

  const handleConfirm = async () => {
    try {
      // Making a POST request to create the product
      const response = await axios.post("https://dummyjson.com/products/add", {
        title,
        price,
        category,
        description,
        // images,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
      });

      if (response.status === 201) {
        message.success("Product successfully created!");
        navigate("/"); // Redirecting to Page1 after success
      }
    } catch (error) {
      message.error("Error creating product: " + error.message);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Back Button */}
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back to Products
      </Button>

      {/* Product Title */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
        {title}
      </h1>

      {/* Carousel for Product Images */}
      <Carousel autoplay>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                style={{
                  // width: "100%",
                  margin: 'auto',
                  maxWidth: '500px',
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=No+Image+Available"
              alt="No Image"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </Carousel>

      {/* Product Details */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Product Details</h2>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Price:</strong> ₹{price}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Weight:</strong> {weight}g
        </p>
        {dimensions ?
        <p>
          <strong>Dimensions:</strong> {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
        </p>: <p>
          <strong>Dimensions:</strong> NA
        </p>
}
        <p>
          <strong>Warranty Information:</strong> {warrantyInformation ? warrantyInformation: "NA"}
        </p>
        <p>
          <strong>Shipping Information:</strong> {shippingInformation ? shippingInformation : "NA"}
        </p>
      </div>

      {/* Confirm and Post Button */}
      <Button
        type="primary"
        size="large"
        onClick={handleConfirm}
        style={{ marginTop: "20px" }}
      >
        Confirm and Create Product
      </Button>
    </div>
  );
};

export default Page2;
