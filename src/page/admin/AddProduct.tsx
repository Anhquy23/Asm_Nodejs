import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../types/product";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Upload from "antd/es/upload/Upload";
import { PlusOutlined } from "@ant-design/icons";

interface IProps {
  onAdd: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values: IProduct) => {
    props.onAdd(values);
    navigate("/admin/products");
    message.success("Thêm sản phẩm thành công", 2);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        hasFeedback
        rules={[
          { required: true, message: "Vui lòng nhập tên" },
          { whitespace: true },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        hasFeedback
        rules={[
          { required: true, message: "Vui lòng nhập giá" },
          { whitespace: true },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description" hasFeedback>
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        hasFeedback
        rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
      >
        <Select placeholder="Select a category">
          {categories.map((category: IProduct) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Image" valuePropName="fileList">
        <Upload action="http://localhost:8081/api/images/upload" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button block type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductPage;
