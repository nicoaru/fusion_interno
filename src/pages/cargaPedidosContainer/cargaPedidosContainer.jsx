import React from 'react';
import './cargaPedidosContainer.css';
import {Layout} from '../../components/layout/layout';
import { CargaPedidos } from '../../components/cargaPedidos/cargaPedidos';





function CargaPedidosContainer() {

    return (
        <Layout>
            <div>
                <h1>Página de carga de pedidos</h1>
                <CargaPedidos/>
            </div>
        </Layout>
    )

};

export {CargaPedidosContainer};