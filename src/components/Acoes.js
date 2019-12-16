import React from 'react';
import { Button } from 'antd';

export default function Acoes({ item, mostraItem, proximoItem, deleteItem }) {
    return (
        <>
            <Button
                onClick={mostraItem}
                style={{ margin: '0 5px 0 5px' }}
                size="medium"
                icon="eye" />
            <Button
                style={{ margin: '0 5px 0 0px' }}
                onClick={proximoItem}
                disabled={item.status === 'PRONTO'}
                type="primary"
                icon="step-forward"
                size="medium"
            />
            <Button
                onClick={deleteItem}
                icon="close"
                size="medium"
            />
        </>
    );
}