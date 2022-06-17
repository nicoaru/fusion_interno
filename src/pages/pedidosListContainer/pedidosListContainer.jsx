import React, {useState, useEffect} from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import './pedidosListContainer.css'
import {Layout} from '../../components/layout/layout'
import { db } from "../../components/firebase/firebase";
import { PedidosList } from "../../components/pedidosList/pedidosList"


function PedidosListContainer() {

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [error, setError] = useState()


    useEffect(() => {
        setLoading(true)
        
        getDocs(query(collection(db, 'mueblesEncargados'), where('estado.actual', '!=', 'entregado'))) 
            .then((enCursoQuerySnapshot) => {
                
                if (enCursoQuerySnapshot.size > 0) {
                    let docsTemp = enCursoQuerySnapshot.docs.map(doc => ( {id: doc.id, ...doc.data()}) )  
                    console.log('docsTemp => ', docsTemp)
                    setItems(docsTemp)
                } 
                else console.log('No hay pedidos en curso')
            })
            .catch((error) => {
                console.log('Estamos teniendo inconvenientes con el servidor, por favor intanta de nuevo mas tarde...')
                setError(error)
            })
            .finally (
                setLoading(false)
            )
    }, [])  


    return(
        <Layout>
            <h1>
                Ver Pedidos
            </h1>
            <PedidosList loading={loading} muebles={items} error={error} />

        </Layout>

    )
}

export { PedidosListContainer }