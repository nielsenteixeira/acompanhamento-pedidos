import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';

import { getStatusReady, next } from '../../store/orders';
import Legenda from '../../components/Legenda';
import Status from '../../components/Status';

export default function CaixaF() {
    const { list } = useSelector(state => state.order);
    const dispatch = useDispatch();

    const state = useMemo(
        () =>
            list
                .filter(l => l.status === 'PRONTO')
                .map(l => ({ ...l, key: l.id, action: l }))
                .sort((a, b) => a.id - b.id),
        [list]
    );

    useEffect(() => dispatch(getStatusReady()), [dispatch]);

    const columns = [
        { title: 'Cliente', dataIndex: 'nome', key: 'client' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '200px',
            render: type => <Status type={type} />,
        },
        {
            title: 'Finalizar',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: '200px',
            render: item => {
                return (
                    <Button
                        onClick={() => dispatch(next(item))}
                        style={{ margin: '0 5px 0 5px' }}
                        title="Finalizar pedido."
                        size="medium"
                        type="primary"
                        icon="check-circle"
                    />
                );
            },
        },
    ];

    return (
        <>
            <Table
                bordered
                title={() => <h2>Caixa</h2>}
                columns={columns}
                dataSource={state}
                footer={() => (
                    <span>
                        <strong>ATENÇÃO:</strong> Dirija-se ao caixa quando seu pedido estiver azul
                    </span>
                )}
            />
            <Legenda />
        </>
    );
}
