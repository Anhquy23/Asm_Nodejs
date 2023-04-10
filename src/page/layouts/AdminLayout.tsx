import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Tag } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "1", <PieChartOutlined />),
  getItem(
    <Link
      style={{ textDecorationLine: "none", color: "white", opacity: 0.7 }}
      to={"/admin/products"}
    >
      Sản phẩm
    </Link>,
    "sub1",
    <DesktopOutlined />,
    [
      getItem(
        <Link to={"/admin/products/add"}>Thêm sản phẩm</Link>,
        "Tom",
        <AppstoreAddOutlined />
      ),
    ]
  ),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <h2 style={{ color:"white" }}>
              Anh Qúy
            </h2>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Separator>User</Breadcrumb.Separator>
              <Breadcrumb.Separator>Bill</Breadcrumb.Separator> */}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 600,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
