import React from 'react';
import { Layout as LayoutAntd, Menu, Icon } from 'antd';
import history from '../config/history';

const { Header, Content, Footer } = LayoutAntd;

export default function Layout({ children }) {
    return (
        <LayoutAntd>
            <Header  style={{ padding: 0}} >
                <Menu defaultSelectedKeys={['1']} mode="horizontal" style={{ lineHeight: '64px'}}>
                    <Menu.Item key="1" onClick={() => history.push('acompanhamento')}>
                        <Icon type="history" />
                        <span>Acompanhamento</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => history.push('avancar-pedido')}>
                        <Icon type="step-forward" />
                        <span>Avançar pedidos</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('caixa')}>
                        <Icon type="credit-card" />
                        <span>Caixa</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => history.push('novo-pedido')}>
                        <Icon type="plus" />
                        <span>Novo pedido</span>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    margin: '20px 20px',
                    marginTop: 50,
                    padding: 20,
                    background: '#fff',
                    minHeight: 280,
                }}
            >
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>UNI7 ©2019 Pós Graduação</Footer>
        </LayoutAntd>
    );
}
