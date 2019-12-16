import React from 'react';
import { Modal } from 'antd';
import { formatDistance, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function DetalhePedido({ pedido, visible, setVisible, setItemVisible }) {
    if (!pedido.createdAt) return null;
    return (
        <Modal
            title="Detalhe do pedido"
            visible={visible}
            onOk={() => { setItemVisible({}); setVisible(false); }}
            onCancel={() => { setItemVisible({}); setVisible(false);}}
        >
            <p>
                <strong>Cliente:</strong> {pedido.nome}
            </p>
            <p>
                <strong>CPF:</strong> {pedido.cpf}
            </p>
            <p>
                <strong>Status:</strong> {pedido.status}
            </p>
            <p>
                <strong>Descrição:</strong> {pedido.descricao}
            </p>
            <p>
                <strong>Tempo de espera:</strong>{' '}
                {formatDistance(parseISO(pedido.createdAt), new Date(), {
                    locale: pt,
                })}
            </p>
        </Modal>
    );
}
