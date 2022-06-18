import React, {useState} from "react";
import './cargaPedidos.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack, Box, Typography, Button } from '@mui/material';
import { DataGrid,  GridEditSingleSelectCell, useGridApiContext, } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'
import { MuebleEncargado } from "../../clases/clases"




function CargaPedidos({cargarPedidosHandler}) {
    


        // Funcion processRowUpdate y auxiliares
    const alreadyExists = (newValuesRow) => {
        console.log("alreadyExists? => ", (rows[rows.length-1].id !== newValuesRow.id))
        return (rows[rows.length-1].id !== newValuesRow.id)
    }
    const updateRow = (newValuesRow, rowsArray) => {
        return rowsArray.map(row => row.id === newValuesRow.id ? newValuesRow : row)
    }
    const addEmptyRow = (rowsArray) => {
        const emptyRow = { id: idGenerator(),
            fechaPedido: " ",
            fechaEntrega: '', 
            estado: '',
            linea: '',
            modelo: '', 
            largo: '', 
            alto: '',
            profundidad: '',
            codigoColor: '',
            referenciaColor: "", 
            colorCorrederas: "",
            nPuertas: '', 
            nCajones: '', 
            tipoFrentes: '', 
            estandar: '', 
            tipoPata: '',
            alturaPata: '',
            colorPata: '',
            notas: ''
            }

        return [...rowsArray, emptyRow]
    }
    function processUpdate(newValuesRow) {
        let rowsTemp = rows
        rowsTemp = updateRow(newValuesRow, rowsTemp);
        if (alreadyExists(newValuesRow) === false) {
            rowsTemp = addEmptyRow(rowsTemp)
        }     
        setRows(rowsTemp)
        return newValuesRow
    }
        //  //

    const [idCount, setIdCount] = useState(1)
   
    const idGenerator = () => {
        const newId = idCount+1
        setIdCount(newId)
        console.log('newId => ', newId)
        return newId
    }
    const initialRows = [{ id: idCount,
        fechaPedido: " ",
        fechaEntrega: '', 
        estado: '',
        linea: '',
        modelo: '', 
        largo: '', 
        alto: '',
        profundidad: '',
        codigoColor: '',
        referenciaColor: "", 
        colorCorrederas: "",
        nPuertas: '', 
        nCajones: '', 
        tipoFrentes: '', 
        estandar: '', 
        tipoPata: '',
        alturaPata: '',
        colorPata: '',
        notas: ''
    }]
    const [rows, setRows] = useState(initialRows)


    console.log('rows => ', rows)

    const columns = [
        { 
            field: 'fechaPedido', 
            headerName: 'Fecha Pedido', 
            type: "date", 
            width: 125,
            headerAlign: "center", 
            align: "center", 
            editable: true 
        },
        {
            field: 'fechaEntrega', 
            headerName: 'Entrega', 
            type: "date", 
            width: 125, 
            headerAlign: "center", 
            align: "center", 
            editable: true 
        },
        { 
            field: 'estado', 
            headerName: 'Estado',  
            type: "singleSelect", 
            valueOptions: ["En cola", "Cortado", "Armando", "Listo para laquear", "En laqueador", "Volvio del laqueador", "Listo para entregar", "Entregado", "Otro"],
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'estandar', 
            headerName: 'Estandar', 
            type: "singleSelect", 
            valueOptions: [{value:true, label: "SI"}, {value: false, label: "NO"}], 
            align: "center", 
            renderCell: (params) => {
                console.log("gridRenderCellParams => ", params);
                if (params.value === true) { 
                    return <img src={check} alt="tick-icon"/> } 
                else if (params.value === false) {
                    return <img src={cross} alt="cross-icon"/>  }
                else return " "
                },
            valueFormatter: (params) => {
                console.log("valueFormaterParams => ", params)
                if (params.value === true) { 
                    return "SI" } 
                else if (params.value === false) {
                    return "NO" }
                else return " "
                }, 
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'linea', 
            headerName: 'Linea', 
            type: "singleSelect", 
            valueOptions: ["Praga", "Niza", "Frank", "Buet", "Visby", "Otro"],    

            headerAlign: "center", 
            align: "center",
            editable: true 
        },
        { 
            field: 'modelo', 
            headerName: 'Modelo', 
            type: "singleSelect", 
            valueOptions: ({ row }) => {
                console.log("param de ValueOptions => ", row);
                switch (row.linea) {
                    case "Praga":
                        return ["Consola", "Mesa de luz", "Comoda"]
                        break;
                    case "Niza":
                        return ["Consola", "Mesa de luz", "Vajillero", "Mesa alta Niza", "Mesa alta Menton", "Recibidor", "Escritorio"]
                        break;
                    case "Frank":
                        return ["Consola", "Mesa de luz"]
                        break;
                    case "Visby":
                        return ["Bar", "Consola", "Mesa de luz"]
                        break;       
                    case "Buet":
                        return ["Mesa ratona"]
                        break;       
                    case "Otro":
                        return ["Bar", "Comoda", "Consola", "Escritorio", "Mesa", "Mesa de luz", "Mesa ratona", "Recibidor", "Vajillero", "Otro"]
                        break;       
                    default:
                        return [{value: "", label: "Seleccionar Línea"}]
                    break;
                }
            },
            width: 150, 
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'largo', 
            headerName: 'Largo', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'alto', 
            headerName: 'Alto', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'profundidad', 
            headerName: 'Profundidad', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'codigoColor', 
            headerName: 'Codigo Color', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            ditable: true 
        },
        { 
            field: 'referenciaColor', 
            headerName: 'Referencia Color',
            type: "string",
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'colorCorrederas', 
            headerName: 'Color Correderas', 
            type: "singleSelect", 
            valueOptions: [{value: "Zincada", label: "Zincada"}, {value: "Negra", label: "Negra"}],             
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true
        },
        { 
            field: 'nPuertas', 
            headerName: 'Puertas', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'nCajones', 
            headerName: 'Cajones', 
            type: "number", 
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'tipoFrentes', 
            headerName: 'Tipo de puerta o frente', 
            type: "string", 
            width: 150, 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'tipoPata', 
            headerName: 'Tipo de pata', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'alturaPata', 
            headerName: 'Altura de pata', 
            type: "number", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'colorPata', 
            headerName: 'Color de pata', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'notas', 
            headerName: 'Notas', 
            type: "string", 
            minWidth: 150, 
            flex: 1, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        }
    ];


    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{ m: 2,
                        '.MuiDataGrid-cell': { py: '8px', px: '4px' },
                        '.rowGrid': {minHeight: '52px !important'}
                      }}
                    getRowHeight={() => 'auto'}
                    getRowClassName={(params) => 'rowGrid'}
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    editMode='row'
                    processRowUpdate={processUpdate}
                />
                
            </div>
            <Button color="primary"  onClick={() => {
                setRows(initialRows)
                cargarPedidosHandler(rows.filter(obj => rows.indexOf(obj) !== rows.length-1))}}>
                CARGAR LOS PEDIDOS
            </Button>
        </div>



    )


}

export { CargaPedidos }