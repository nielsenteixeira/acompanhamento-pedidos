import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';

import Status from '../../components/Status';
import Legenda from '../../components/Legenda';
import DetalhePedido from '../../components/DetalhePedido';
import Acoes from '../../components/Acoes';
import { getAll, deleted, next } from '../../store/orders';

export default function AcompanhamentoPedido() {
    const { list } = useSelector(state => state.order);
    const [visible, setVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState({});
    const dispatch = useDispatch();

    const state = useMemo(() => {
        const data = list.filter(l => !(l.status === 'PAGO' || l.status === 'EXCLUIDO'));

        return data.map(l => ({ ...l, key: l.id, actions: l })).sort((a, b) => a.id - b.id);
    }, [list]);

    useEffect(() => dispatch(getAll()), [dispatch]);

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
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            width: '200px',
            render: item => (
                <Acoes
                    item={item}
                    proximoItem={() => dispatch(next(item))}
                    deleteItem={() => dispatch(deleted(item))}
                    mostraItem={() => {
                        setItemVisible(item);
                        setVisible(!visible);
                    }}
                />
            ),
        },
    ];

    return (
        <>
            <Table
                title={() => <h2>Avançar status do pedido</h2>}
                columns={columns}
                dataSource={state}
                disabled
                footer={() => (
                    <span>
                        <strong>ATENÇÃO:</strong> Dirija-se ao caixa quando seu pedido estiver azul
                    </span>
                )}
            />
            <Legenda />
            <DetalhePedido pedido={itemVisible} visible={visible} setItemVisible={setItemVisible} setVisible={setVisible} />
        </>
    );
}