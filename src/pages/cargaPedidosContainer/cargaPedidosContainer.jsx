import React from 'react';
import './cargaPedidosContainer.css';
import {Layout} from '../../components/layout/layout';
import { CargaPedidos } from '../../components/cargaPedidos/cargaPedidos';
import {generarObjetoMuebleEncargado} from "../../clases/clases";
import { mueblesEncargadosDB } from "../../components/firebase/firebase";
import { addDoc, getDoc, Timestamp } from 'firebase/firestore'



function CargaPedidosContainer() {

    // funcion para caragar los pedidos al servidor

    const cargarPedidos = async (rows) => {
        console.log("rows que llegan al container => ", rows)
        let mueblesParaCargar = rows.map( obj => {  
            return generarObjetoMuebleEncargado(undefined, undefined, undefined, obj.nCajones, obj.codigoColor, obj.referenciaColor, undefined, obj.estado, obj.estandar, obj.fechaPedido, obj.fechaEntrega, obj.tipoFrentes, undefined, obj.largo, obj.alto, obj.profundidad, obj.modelo, obj.notas, obj.tipoPata, obj.alturaPata, obj.colorPata, obj.puertas)}
        );
        
        console.log("Muebles para cargar => ", mueblesParaCargar);
        
        mueblesParaCargar.forEach( obj => {
            addDoc(mueblesEncargadosDB, obj)
                .then ((docRef) => {
                    getDoc(docRef)
                        .then ((docSnapshot) => {
                        console.log("El doc ", docRef.id, "fue creado el ", docSnapshot.get("timeStampCreationDoc").toDate())
                        console.log(docSnapshot.data())
                        console.log(docSnapshot.data().timeStampCreationDoc.toDate())
                        console.log(docSnapshot.data().fecha.toDate())
                    })
                })
                .catch ((error) => alert("salio mal => ", error))
        })
    }


    return (
        <Layout>
            <div>
                <h1>Página de carga de pedidos</h1>
                <CargaPedidos cargarPedidosHandler={cargarPedidos}/>
            </div>
        </Layout>
    )

};

export {CargaPedidosContainer};