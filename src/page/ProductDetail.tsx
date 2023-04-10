import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Divider, Row } from "antd";
import { IProduct } from "../types/product";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/products/${id}`)
      .then((response: any) => {
        setProduct(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
   
    <>
      <Divider orientation="left">Sản phẩm</Divider>
      <Row>
          <Col style={{textAlign: "center"}} className="gutter-row" span={6} key={product._id}>

              <img
                src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889_1.jpg"
                alt="" 
              ></img>
              <h2>Tên: {product.name}</h2>
              <h5> Giá: {product.price}</h5>
              <h5> Mô tả: {product.description}</h5>
          </Col>
      </Row>


  </>
  );
};

export default ProductDetailPage;

