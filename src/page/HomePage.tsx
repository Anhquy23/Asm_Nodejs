import React from "react";
import { useState, useEffect } from "react";
import { Col, Divider, Row } from "antd";
import { IProduct } from "../types/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style: React.CSSProperties = { padding: "8px 0" };

interface IProps {
  products: IProduct[];
  onRemove: (_id: number) => void;
}

const HomePage = (props: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => {
        setProducts(response.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGetone = (product: IProduct) => {
    navigate(`/products/${product._id}`);
  };
  return (
    <>
      <Divider orientation="left">Sản phẩm</Divider>
      <Row>
        {products.map((product) => (
          <Col style={{textAlign: "center"}} className="gutter-row" span={6} key={product._id}>
            <div
              onClick={() => {
                handleGetone(product);
              }}
              style={style}
            >
              <img
                src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889_1.jpg"
                alt="" 
              ></img>
              <h3>{product.name}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
