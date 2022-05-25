import React from 'react';
import { Grid } from '@mui/material'; 
import { FalladoCardOpcionesDespiece } from '../FALLADOcardOpcionesDespiece/FALLADOcardOpcionesDespiece';


function FalladoListaOpcionesDespiece({opcionesDespiece}) {
  let opcionesCardsJsx = opcionesDespiece.map((obj, index)=> {
    return <Grid item xs={4}> <FalladoCardOpcionesDespiece key={index} modeloDespiece={obj}/> </Grid>
  })

  return (
    <div>
      <Grid container spacing={2}>
        {opcionesCardsJsx}
      </Grid>
    </div>
  );
};

export { FalladoListaOpcionesDespiece }

 