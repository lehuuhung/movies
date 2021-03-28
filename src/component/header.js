import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
const { Header } = Layout;

const HeaderComponent = () => {
  // dùng uselocation để lấy đg link trên url xuống nhận active
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Header>
      <NavLink to="/" >
        <div className="logo" />
      </NavLink>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
        <Menu.Item key="/home">
          <NavLink to="/home" >
            Trang chủ
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/new-film">
          <NavLink to="/new-film" >
            Phim mới
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/search-film">
          <NavLink to="/search-film">
            Tìm kiếm
          </NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
export default HeaderComponent;