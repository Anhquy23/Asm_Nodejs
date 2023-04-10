import React, { useEffect, useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/product";
import axios from "axios";

const { Title } = Typography;

interface DataType {
  key: string | number;
  _id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number | string;
}

interface IProps {
  products: IProduct[];
  onRemove: (_id: number) => void;
}

const ProductManagement = (props: IProps) => {
  const [category, setcategory] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/category`)
      .then((response) => {
        setcategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCategoryName = (categoryId: number | string) => {
    const selectedCategory = category.find((item) => item._id === categoryId);
    return selectedCategory?.name;
  };


  const removeProduct = (id: number) => {
    props.onRemove(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Products Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Products Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Products Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: number | string) => getCategoryName(categoryId),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => removeProduct(record._id)} danger>
            Delete
          </Button>
          <Button type="primary">
            <Link to={`/admin/products/${record._id}/update`}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ];

  const data = props.products.map((item) => {
    return {
      key: item._id,
      ...item
  }
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={4} type="success">
        Sản phẩm
      </Title>
      <Button type="primary">
        <Link to={"/admin/products/add"}>Add New Product</Link>
      </Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductManagement;
