import React from "react";
import { useState, useEffect } from "react";
import { Select } from "./SelectField";
import { RenderOutput } from "./Output";
import './calculator.css';
import { getInpc } from "../services/serverRequest";

export const FaCalculator = (props) => {
    const [dateAdq, setDateAdq] = useState('');
    const [dateDisp, setDateDisp] = useState('');
    const [cost, setCost] = useState(0);
    const [depreciation, setDepreciation] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [result, setResult] = useState([{id:0, ejercicio: 0, mes:0, indice:1},{id:0, ejercicio: 0, mes:0, indice:1}]);
    
   
  

    const handleDate = (e) => {
        e.target.id === 'adqDate' ? setDateAdq(e.target.value) : setDateDisp(e.target.value);
    }

        
    const handleSubmit = async (e) => {
        e.preventDefault()
        let resultado = await getInpc(dateAdq, dateDisp);
        if (resultado !== 1) {
            setResult(resultado);
        };
        
        
    }

    return (
        <div>
            <h1 id="title"> Calculadora enajenacion de activos fijos</h1>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="adqDate">Fecha de adquisicion</label>
                    <input type="date" id="adqDate" onChange={handleDate} value={dateAdq} /><br />

                </div>
                <div className="field">
                    <label htmlFor="dispDate">Fecha ultimo periodo de uso</label>
                    <input type="date" id="dispDate" value={dateDisp} onChange={handleDate} /><br />

                </div>


                <Select/>

                <div className="field">
                    <label htmlFor="moi">Monto original de la inversion</label>
                    <input type="text" id="moi" onChange={e=>setCost(e.target.value)} min={0} value={cost} required /><br />

                </div>
                <div className="field">
                    <label htmlFor="accDep">Depreciacion acumulada</label>
                    <input type="text" id="accDep" onChange={e=>setDepreciation(e.target.value)} min={0} value={depreciation} required /><br />
                </div>
                <div className="field">
                    <label htmlFor="sellPrice">Precio de venta</label>
                    <input type="text" id="sellPrice" onChange={e=>setSalePrice(e.target.value)} value={salePrice} required /><br />
                </div>
                

                <fieldset>
                    <legend>Calculo de la ganancia o perdida fiscal en ventas de activo fijo</legend>
                    <input id="calculate" type="submit" value="Calcular" />
                </fieldset>
                <fieldset id="summary">
                <RenderOutput inpcData={result} dateAdq={dateAdq} dateDisp={dateDisp} cost={cost} depreciation={depreciation} salePrice={salePrice} />
                </fieldset>
            </form>
        
        </div>

    )
}