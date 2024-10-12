import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Input,
  Button,
  Modal,
  Form,
  Carousel,
  Collapse,
  Rate,
  Upload,
  BackTop,
  Select,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const Page1 = () => {
  const [startDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [endDate, setEndDate] = useState(moment());
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories, setCategories] = useState([
    "beauty",
    "fragrances",
    "furniture",
  ]);
  const navigate = useNavigate();

  const allCat = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  useEffect(() => {
    fetchProducts();
  }, [categories]);

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const fetchProducts = async () => {
    try {
      const promises = categories.map((category) =>
        axios.get(`https://dummyjson.com/products/category/${category}`)
      );
      const responses = await Promise.all(promises);

      const mergedProducts = responses.reduce((acc, response) => {
        return acc.concat(response.data.products);
      }, []);

      setProducts(mergedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleChange = (value) => {
    setCategories(value);
  };

  const handleAddProduct = (values) => {
    const productWithImages = { ...values, images: uploadedImages };
    setNewProduct(productWithImages);
    setIsModalOpen(false);
    navigate("/page2", { state: productWithImages });
  };

  const groupByCategory = (products) => {
    return products.reduce((groups, product) => {
      const category = product.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {});
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImages((prev) => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const categorizedProducts = groupByCategory(filteredProducts);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          margin: "auto",
          width: "max(350px, 80%)",
          maxWidth: "1000px",
          marginBlock: "10px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: ".25rem",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: 600,
              color: "#dc3848",
              fontFamily:
                "Rubik, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Products
          </div>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ marginTop: 20 }}
          >
            <PlusOutlined /> Add Product
          </Button>
        </div>

        <Input.Search
          placeholder="Search products"
          value={searchText}
          size="large"
          onChange={handleSearch}
          style={{ width: "100%" }}
        />
        <div style={{ marginBlock: "10px" }}>
          <Select
            mode="multiple"
            allowClear
            size="large"
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={categories}
            onChange={handleChange}
          >
            {allCat.map((category) => (
              <Select.Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <RangePicker
            defaultValue={[startDate, endDate]}
            onChange={handleDateChange}
            size="large"
            disabledDate={(current) =>
              current && current > moment().endOf("day")
            }
          />
        </div>
        <hr />

        {Object.keys(categorizedProducts).map((category) => (
          <div key={category}>
            <div
              style={{
                fontFamily:
                  "Rubik, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                position: "sticky",
                zIndex: 1,
                color: "white",
                fontWeight: 500,
                top: 10,
                paddingInline: "1.5rem",
                fontSize: "2rem",
                borderRadius: ".25rem",
                textTransform: "capitalize",
                marginBlock: "20px",
              }}
            >
              {category}
            </div>

            {categorizedProducts[category].map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  columnGap: "10px",
                  flexWrap: "wrap",
                  fontFamily:
                    "Rubik, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                }}
              >
                <div>
                  <img alt={item.title} src={item.thumbnail} />
                </div>
                <div>
                  <div style={{ fontSize: "1.6em", fontWeight: 500 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    {"₹" + item.price}
                  </div>
                  <div
                    style={{
                      fontSize: ".9em",
                      color: "#6c757d",
                      maxWidth: "50ch",
                    }}
                  >
                    {item.description}
                  </div>
                  <div style={{ display: "flex", paddingBlock: "5px" }}>
                    <div style={{ paddingInline: "5px" }}>{item.rating}</div>
                    <Rate disabled defaultValue={item.rating} allowHalf />
                  </div>

                  <span
                    style={{
                      color: "white",
                      fontFamily:
                        "Rubik, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                      padding: "3px 5px",
                      borderRadius: ".25rem",
                      backgroundColor:
                        item.availabilityStatus === "Low Stock"
                          ? "#f33c3c"
                          : item.availabilityStatus === "In Stock"
                          ? "#2c902c"
                          : "black",
                    }}
                  >
                    {item.availabilityStatus}
                  </span>
                  <Button type="link" onClick={() => handleProductClick(item)}>
                    View Details
                  </Button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      <Modal
        title="Product Details"
        open={selectedProduct !== null}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <Carousel autoplay>
              {selectedProduct.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <p>
              <strong>Product Name:</strong> {selectedProduct.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>
            <p>
              <strong>SKU:</strong> {selectedProduct.sku}
            </p>
            <p>
              <strong>Weight:</strong> {selectedProduct.weight}g
            </p>
            <p>
              <strong>Dimensions:</strong> {selectedProduct.dimensions.width} x{" "}
              {selectedProduct.dimensions.height} x{" "}
              {selectedProduct.dimensions.depth} cm
            </p>
            <p>
              <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {selectedProduct.shippingInformation}
            </p>
            <p>
              <strong>Availability Status:</strong>{" "}
              {selectedProduct.availabilityStatus}
            </p>
            <p>
              <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
            </p>
            <p>
              <strong>Minimum Order Quantity:</strong>{" "}
              {selectedProduct.minimumOrderQuantity}
            </p>
          </div>
        )}
      </Modal>

      {/* Add New Product Modal */}
      <Modal
        title="Add New Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form labelCol={{ span: 6 }} onFinish={handleAddProduct}>
          <Form.Item
            name="title"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="brand" label="Brand">
            <Input />
          </Form.Item>
          <Form.Item name="sku" label="SKU">
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight (grams)">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Upload Images">
            <Upload
              listType="picture"
              beforeUpload={handleImageUpload}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <BackTop size="small" />
    </div>
  );
};

export default Page1;
