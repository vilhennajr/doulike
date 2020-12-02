import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Company from '../../pages/company';
import Unit from '../../pages/unit';
import Sensor from '../../pages/sensor';
import SensorType from '../../pages/sensorType';
import MealType from '../../pages/mealType';
import Survey from '../../pages/survey';

import '../../antd.compact.css';
//import '../../antd.antigo.css';

//import 'antd/dist/antd.css';

import Logo from '../../logo-icon.png';

import { Layout, Menu } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  ShopOutlined,
  TabletOutlined,
  UserOutlined,
  FileDoneOutlined,
  SettingOutlined,
  LogoutOutlined,
  DiffOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const { SubMenu } = Menu;

export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo"><img src={Logo} /></div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<ShopOutlined />}>
                  <Link to="/companies">Empresas</Link>
                </Menu.Item>

                <Menu.Item key="3" icon={<TabletOutlined />}>
                  <Link to="/units">Unidades</Link>
                </Menu.Item>

                <Menu.Item key="4" icon={<UserOutlined />}>
                  <Link to="/users">Usuários</Link>
                </Menu.Item>

                <Menu.Item key="5" icon={<DiffOutlined />}>
                  <Link to="/surveys">Pesquisas</Link>
                </Menu.Item>

                <Menu.Item key="6" icon={<FileDoneOutlined />}>
                  <Link to="/reports">Relatórios</Link>
                </Menu.Item>

                <Menu.Item key="7" icon={<SettingOutlined />}>
                  <Link to="/sensors">Sensores</Link>
                </Menu.Item>
                
                <Menu.Item key="8" icon={<FileDoneOutlined />}>
                  <Link to="/alerts">Alertas</Link>
                </Menu.Item>

                <SubMenu key="sub2" icon={<SettingOutlined />} title="Configurações">
                  <Menu.Item key="9">
                    <Link to="/mealtypes">Tipos de Refeição</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to="/sensortypes">Tipos de Sensores</Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="11" icon={<LogoutOutlined />}>
                  <Link to="/logout">Sair</Link>
                </Menu.Item>

              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#2B3C61', color: 'white', fontWeight: 'bold' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </Header>

              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                
                <Route path="/dashboard" exact component={ Company } />
                <Route path="/companies" exact component={ Company } />
                <Route path="/units" exact component={ Unit } />
                <Route path="/users" exact component={ Company } />
                <Route path="/surveys" exact component={ Survey } />
                <Route path="/reports" exact component={ Company } />
                <Route path="/sensors" exact component={ Sensor } />
                <Route path="/alerts" exact component={ Company } />
                <Route path="/accesscontrol" exact component={ Company } />
                <Route path="/sensortypes" exact component={ SensorType } />
                <Route path="/mealtypes" exact component={ MealType } />
                <Route path="/logout" exact component={ Company } />

              </Content>

              <Footer style={{ textAlign: 'center' }}>DouLike © 2020 - Powered By: Instituto Creathus</Footer>

            </Layout>
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}