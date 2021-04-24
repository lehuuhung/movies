import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import * as api from '../services/login'
const { Header } = Layout;

const HeaderComponent = () => {
  // dùng uselocation để lấy đg link trên url xuống nhận active
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;
  const infoUser = api.decodeTokenFromLocalStorage();
  const logOut = () => {
    if (infoUser !== null) {
      api.removeTokenLocalStorage();
      history.push('./login');
    }
  }
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
        {infoUser !== null ? (
          <Menu.Item >
            <strong>{infoUser.username} </strong>
          </Menu.Item>
        ) : null}
       
        {infoUser === null && (
          <Menu.Item key="/login">
            <NavLink to="/login">Dang nhap</NavLink>
          </Menu.Item>
        ) }
        {infoUser !== null && (
          <Menu.Item key="/login">
            <span onClick={() => logOut()}>logout</span>
          </Menu.Item>
        )}

      </Menu>
    </Header>
  )
}
export default React.memo(HeaderComponent) ;