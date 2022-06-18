import React from "react";
import './pedidosList.css';
import { Stack, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'


function PedidosList({ loading, muebles, error }) {
    
    console.log('muebles => ', muebles)
    
    function generateDate(timeStamp) {
        const date = timeStamp.toDate()
        const year = date.getFullYear().toString().slice(-2)
        const fecha = `${date.getDate()}/${date.getMonth()+1}/${year}`
        console.log(fecha)
        return fecha
    }


    const rows = muebles.map((obj, index) => {
        return         { id: obj.id, 
                        estado: obj.estado.actual,
                        entrega: obj.fechaEntrega, 
                        // entrega: generateDate(obj.fechaEntrega), 
                        modelo: obj.modelo, 
                        medida: `${obj.medidaTotal.largo} x ${obj.medidaTotal.alto} x ${obj.medidaTotal.profundidad}`, 
                        color: `${obj.color.codigo} ${obj.color.referencia}`, 
                        nPuertas: obj.puertas, 
                        nCajones: obj.cajones, 
                        tipoPuertasFrentes: obj.frentes, 
                        estandar: `${obj.estandar === true ? 'si' : 'no'}`, 
                        pata: `${obj.pata.tipoPata} ${obj.pata.altura}cm ${obj.pata.color} `,
                        notas: obj.notas
                        }
    })
    
    rows.push({ id: '', 
        entrega: '', 
        modelo: '', 
        medida: '', 
        color: '', 
        nPuertas: '', 
        nCajones: '', 
        tipoPuertasFrentes: '', 
        estandar: '', 
        pata: '',
        notas: ''
        }
    )


    console.log('rows => ', rows)
    console.log('muebles post => ', muebles)

    const columns = [
        { field: 'entrega', headerName: 'Entrega'},
        { field: 'estado', headerName: 'Estado'},
        { field: 'estandar', headerName: 'Estandar' },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
        { field: 'medida', headerName: 'Medida', width: 150 },
        { field: 'color', headerName: 'Color', width: 150 },
        { field: 'nPuertas', headerName: 'Puertas' },
        { field: 'nCajones', headerName: 'Cajones' },
        { field: 'tipoPuertasFrentes', headerName: 'Tipo de puerta o frente', width: 150 },
        { field: 'pata', headerName: 'Pata', width: 150 },
        { field: 'notas', headerName: 'Notas', minWidth: 150, flex: 1 }
    ];


    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                {
                    rows.length > 0 ?
                    <DataGrid
                        getRowHeight={() => 'auto'}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        checkboxSelection
                    />
                    : <div> Loading </div>
                }
            </div>

        </div>



    )


}

export { PedidosList }