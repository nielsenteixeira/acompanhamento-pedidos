import api from '../config/api';
import { loadingStart, loadingStop } from './loading';
import { message } from 'antd';
import history from '../config/history';

const INITIAL_STATE = {
    list: [],
};

const types = {
    NOVO_PEDIDO: 'NOVO_PEDIDO',
    LISTAGEM_PEDIDOS: 'LISTAGEM_PEDIDOS',
    PEDIDO_EXCLUIDO: 'PEDIDO_EXCLUIDO',
    NOVO_STATUS_PEDIDO: 'NOVO_STATUS_PEDIDO',
};

export function save(obj) {
    const type = types.NOVO_PEDIDO;
    const order = { ...obj, status: 'NOVO', createdAt: new Date() };

    return dispatch => {
        dispatch(loadingStart());
        api.post('pedidos', order)
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
                message.success('Pedido salvo com sucesso!');
                history.push('acompanhamento');
            })
            .catch(e => {
                dispatch(loadingStop());
                message.error(e.message);
            });
    };
}

export function getStatusReady() {
    const type = types.LISTAGEM_PEDIDOS;

    return dispatch => {
        dispatch(loadingStart());
        api.get('pedidos?status=PRONTO')
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
            })
            .catch(e => {
                dispatch(loadingStop());
                message.error(e.message);
            });
    };
}

export function getAll() {
    const type = types.LISTAGEM_PEDIDOS;

    return dispatch => {
        dispatch(loadingStart());
        api.get('pedidos')
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
            })
            .catch(e => {
                dispatch(loadingStop());
                message.error(e.message);
            });
    };
}

export function next(obj) {
    const type = types.NOVO_STATUS_PEDIDO;
    const nextStatus = {
        NOVO: { status: 'PREPARANDO' },
        PREPARANDO: { status: 'CONFERENCIA' },
        CONFERENCIA: { status: 'PRONTO', readedAt: new Date() },
        PRONTO: { status: 'PAGO' },
    };
    const order = { ...obj, ...nextStatus[obj.status] };

    return dispatch => {
        dispatch(loadingStart());
        api.put(`pedidos/${order.id}`, order)
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
                message.success('Pedido Avançado...');
            })
            .catch(e => {
                dispatch(loadingStop());
                message.error(e.message);
            });
    };
}

export function deleted(obj) {
    const type = types.PEDIDO_EXCLUIDO;
    const order = { ...obj, status: 'EXCLUIDO' };

    return dispatch => {
        dispatch(loadingStart());
        api.put(`pedidos/${order.id}`, order)
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
                message.success('Pedido excluído!');
            })
            .catch(e => {
                dispatch(loadingStop());
                message.error(e.message);
            });
    };
}

export function orderReducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case types.NOVO_PEDIDO:
            return { ...state, list: [...state.list, payload] };
        case types.LISTAGEM_PEDIDOS:
            return { ...state, list: payload };
        case types.PEDIDO_EXCLUIDO:
            return { ...state, list: state.list.filter(l => l.id !== payload.id) };
        case types.NOVO_STATUS_PEDIDO:
            return { ...state, list: [...state.list.filter(l => l.id !== payload.id), payload] };
        default:
            return state;
    }
}
