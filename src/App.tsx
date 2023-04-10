import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import './App.css'
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/product";
import { sighup } from "./api/user";
import AddProductPage from "./page/admin/AddProduct";
import ProductManagement from "./page/admin/ProductManagement";
import UpdateProductPage from "./page/admin/UpdateProduct";
import HomePage from "./page/HomePage";
import ProductPage from "./page/ProductPage";
import ProductDetailPage from "./page/ProductDetail";
import Dashboard from "./page/admin/Dashboard";
import WebsiteLayout from "./page/layouts/WebsiteLayout";
import AdminLayout from "./page/layouts/AdminLayout";
import { IProduct } from "./types/product";
import { IUser } from "./types/user";
import Register from "./page/Register";
import Login from "./page/Login";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data.docs));
  }, []);

  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() =>
      setProducts(products.filter((item: IProduct) => item._id !== id))
    );
  };

  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(
      () => {
        const data = [...products, product];
        setProducts(data);
      }
      // getAllProduct().then(({ data }) => setProducts(data))
    );
  };

  const register = (user: IUser) => {
    sighup(user).then(
      () => {
        const data = [...users, user];
        setUsers(data);
      }
    );
  };

  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => { 
        setProducts(data.docs);
      })
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<Register onAdd={register} />}/>
          <Route path="/login" element={<Login />}/>
          {/* <Route
            path="/products"
            // element={
            //   <ProductPage products={products} onRemove={onHandleRemove} />
            // }
          > */}
            <Route
              path="/products/:id"
              element={<ProductDetailPage />}
            />
          {/* </Route> */}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductManagement
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path="add"
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateProductPage
                  products={products}
                  onUpdate={onHandleUpdate}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
