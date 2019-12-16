import React from 'react';

import Status from './Status';

export default function Legenda() {
  return (
    <div>
      <h3>Legenda</h3>
      <div >
        <Status type="novo" />
        <strong >Pedido novo</strong>
      </div>
      <div >
        <Status type="preparando" />
        <strong >Pedido sendo preparado</strong>
      </div>
      <div >
        <Status type="conferencia" />
        <strong >Pedido em conferência</strong>
      </div>
      <div >
        <Status type="pronto" />
        <strong >Pronto para pagamento</strong>
      </div>
    </div>
  );
}
