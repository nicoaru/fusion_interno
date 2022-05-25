import React, {useState, useEffect} from 'react';
import './FALLADOgenerarDespieceContainer.css';
import {Layout} from '../../components/layout/layout';
import { FalladoListaOpcionesDespiece } from '../../components/FALLADOlistaOpcionesDespiece/FALLADOlistaOpcionesDespiece';
import {ref, getDownloadURL} from "firebase/storage";
import { storage } from "../../components/firebase/firebase";



function FalladoGenerarDespieceContainer() {

    //DEFINO EL STATE donde voy a guardar la lista de opciones con url de imagen
    const [opcionesConUrl, setOpcionesConUrl] = useState([])
    console.log("Opciones con url al principio: ", opcionesConUrl)

    //array con los datos que tengo inicialmente (las opciones sin url)
    const opcionesInit = [
      {modelo: 'Consola Praga', imgPath: 'imagenes/PragaConsola3.PNG', imgUrl:''},
      {modelo: 'Mesa de luz Praga', imgPath: 'imagenes/PragaLuzGris4.PNG', imgUrl:''},
      {modelo: 'Consola Niza', imgPath: 'imagenes/NizaConsolaNegra.PNG', imgUrl:''},
      {modelo: 'Consola Frank', imgPath: 'imagenes/FrankNegra.PNG', imgUrl:''},
      {modelo: 'Vajillero Niza', imgPath: 'imagenes/vajillero niza 4.jpg', imgUrl:''}
    ];

    //efecto que se dispara solo al montar el componente, para descargar las url de las imagenes
    //y almacenarlas con los otros datos en el state "opcionesConUrl"
  
    useEffect(() => {
      const traerUrls = async () => {
        let opcionesTemp = [...opcionesInit]
        for (const obj of opcionesTemp) {
          var imgRef = ref(storage, obj.imgPath)
          const url = await getDownloadURL(imgRef)
          obj.imgUrl = url;
        }
        setOpcionesConUrl(opcionesTemp)
      }
      traerUrls()
      console.log("Se ejecutó el useEffect")
    }, []);

  
    console.log("opcionesInit: ", opcionesInit)
    console.log("opcionesConUrl: ", opcionesConUrl)
  
  
    return (
        <Layout>
            <div>
                <h1>Página fallada de generación de despieces</h1>
                <FalladoListaOpcionesDespiece opcionesDespiece={opcionesConUrl}/>
            </div>
        </Layout>
    )

};

export {FalladoGenerarDespieceContainer};