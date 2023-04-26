import { Badge, IconButton, Tooltip } from "@mui/material";
import React, {useState} from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';


const ViewChanger= ({indice, handleChange, total}) => {
    const handleClick = (x) => {
        if (x === 1 && indice < total) {
            handleChange(indice + 1) 
        }
        else if ( indice > 1 && x === 0){
            handleChange(indice - 1)
        }
    }
    return(
        <div className="switch">
           <ArrowBackIcon onClick={() => {handleClick(0)}}/> 
           <DirectionsBoatFilledIcon/>
           <p>{indice}/{total}</p>
           <ArrowForwardIcon onClick={() => {handleClick(1)}}/> 
        </div>
      )

  }
export default ViewChanger;
