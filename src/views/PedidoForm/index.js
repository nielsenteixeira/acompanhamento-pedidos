import React from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';

import { save } from '../../store/orders';
import FormComponent from '../../components/Form';

export default function PedidoForm() {
    const dispatch = useDispatch();

    return (
        <Card>
            <FormComponent
                title="Cadastro de pedidos"
                fields={[
                    { placeholder: 'Nome do Cliente', name: 'nome' },
                    { placeholder: 'CPF', name: 'cpf' },
                    { placeholder: 'Descrição', name: 'descricao', type: 'area' },
                ]}
                onSubmit={data => dispatch(save({ ...data, status: 'NOVO' }))}
            />
        </Card>
    );
}
