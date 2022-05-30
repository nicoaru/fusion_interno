import React, {useState, useEffect} from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import './pedidosListContainer.css'
import {Layout} from '../../components/layout/layout'
import { db } from "../../components/firebase/firebase";



function PedidosListContainer() {

    const [loading, setLoading] = useState()
    const [items, setItems] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        setLoading(true)
        
        getDocs(query(collection(db, 'mueblesEncargados'), where('estado.actual', '!=', 'entregado'))) 
            .then((enCursoQuerySnapshot) => {
                enCursoQuerySnapshot.docs.forEach((doc) => {
                    console.log('en curso => ', doc.id, '=>', doc.ref)
                })
                
            })
        
        // enCursoQuerySnapshot.get()
            // .then((querySnapshot) => {
            //     if(querySnapshot.size > 0) {
            //         const itemsTemp = querySnapshot.docs.map(doc => ( { id: doc.id, ...doc.data() }))
            //         setItems(itemsTemp)
            //         console.log('itemsTemp =>', itemsTemp)
            //     }
            //     else {
            //         console.log('No hubo resultados para este pedido al servidor..')
            //     }
            // })
            // .catch((error) => {
            //     console.log(`Hubo un error al procesar el pedido al servidor`, error)
            //     setError(true)
            // })            
            // .finally(() => {
            //     setLoading(false)
            // })
    }, [])


    return(
        <Layout>
            <h1>
                Ver Pedidos
            </h1>

        </Layout>

    )
}

export { PedidosListContainer }