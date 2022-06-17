import React, {useState} from "react";
import './cargaPedidos.css';
import { Stack, Box, Typography, Button } from '@mui/material';
import { DataGrid,  } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'




function CargaPedidos() {
    


    // Funcion processRowUpdate y auxiliares

    const alreadyExists = (newValuesRow) => {
        console.log("alreadyExists? => ", (rows[rows.length-1].id !== newValuesRow.id))
        return (rows[rows.length-1].id !== newValuesRow.id)
        //rows.some(row => (row.id === newValuesRow.id) && (rows.indexOf(row) !== rows.length-1))
    }
    const updateRow = (newValuesRow, rowsArray) => {
        return rowsArray.map(row => row.id === newValuesRow.id ? newValuesRow : row)
        // setRows(rows.map(row => row.id === newValuesRow.id ? updatedRow : row))
    }
    const addEmptyRow = (newValuesRow, rowsArray) => {
        const emptyRow = { id: idGenerator(),
            entrega: '', 
            estado: '',
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

        return [...rowsArray, emptyRow]

    }

   

    function processUpdate(newValuesRow) {
            console.log("newValuesRow => ", newValuesRow)          
        let rowsTemp = rows
            console.log("rowsTemp 1 =>", rowsTemp)
        rowsTemp = updateRow(newValuesRow, rowsTemp);
            console.log("updateRow ok")        
            console.log("rowsTemp 2 =>", rowsTemp)

        if (alreadyExists(newValuesRow) === false) {
            rowsTemp = addEmptyRow(newValuesRow, rowsTemp)
            console.log("addEmptyRow ok")
            console.log("rowsTemp 3 =>", rowsTemp)
        }     
        setRows(rowsTemp)
        return newValuesRow
    }
    

    const [idCount, setIdCount] = useState(1)
   
    const idGenerator = () => {
        const newId = idCount+1
        setIdCount(newId)
        console.log('newId => ', newId)
        return newId
    }

    const [rows, setRows] = useState([{ id: idCount,
        entrega: '', 
        estado: '',
        modelo: '', 
        medida: '', 
        color: '', 
        nPuertas: '', 
        nCajones: '', 
        tipoPuertasFrentes: '', 
        estandar: '', 
        pata: '',
        notas: ''
    }])


    console.log('rows => ', rows)

    const columns = [
        { field: 'entrega', headerName: 'Entrega', editable: true },
        { field: 'estado', headerName: 'Estado', editable: true },
        { field: 'estandar', headerName: 'Estandar', editable: true },
        { field: 'modelo', headerName: 'Modelo', width: 150, editable: true },
        { field: 'medida', headerName: 'Medida', width: 150, editable: true },
        { field: 'color', headerName: 'Color', width: 150, editable: true },
        { field: 'nPuertas', headerName: 'Puertas', editable: true },
        { field: 'nCajones', headerName: 'Cajones', editable: true },
        { field: 'tipoPuertasFrentes', headerName: 'Tipo de puerta o frente', width: 150, editable: true },
        { field: 'pata', headerName: 'Pata', width: 150, editable: true },
        { field: 'notas', headerName: 'Notas', minWidth: 150, flex: 1, editable: true }
    ];


    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowHeight={() => 'auto'}
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    editMode='row'
                    processRowUpdate={processUpdate}
                />
            </div>
            <Button></Button>
        </div>



    )


}

export { CargaPedidos }