import React from "react";
import { useState } from "react";

export const Select = (props) => {
    const [lastMonth, setLastMonth]= useState(null);

    
    const handleSelect=(e)=>{
        setLastMonth(e.target.value);
        
    }
    return (
        <>
            <fieldset id="fieldOpt">
                <label htmlFor="inpcMonth">Ultimo mes del periodo de uso?</label>
                <select name="month" id="select" onChange={handleSelect}>
                    <option value="0"></option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>

            </fieldset><br />


        </>

    )
}