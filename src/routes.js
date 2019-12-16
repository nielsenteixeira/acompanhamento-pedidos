import React from 'react';

const routes = [
    { path: '/home', name: 'Home', component: React.lazy(() => import('./views/Home')) },
    {
        path: '/acompanhamento',
        name: 'AcompanhamentoPedido',
        component: React.lazy(() => import('./views/AcompanhamentoPedido')),
    },
    {
        path: '/novo-pedido',
        name: 'PedidoForm',
        component: React.lazy(() => import('./views/PedidoForm')),
    },
    {
        path: '/avancar-pedido',
        name: 'AvancarPedido',
        component: React.lazy(() => import('./views/AvancarPedido')),
    },
    {
        path: '/caixa',
        name: 'Caixa',
        component: React.lazy(() => import('./views/Caixa')),
    },
];

export default routes;
