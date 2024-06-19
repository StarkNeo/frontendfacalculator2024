import React from "react";
import { useState, useEffect } from "react";
import {NumericFormat} from 'react-number-format';

import './output.css';
export const RenderOutput = (props)=>{
    const [inpcAdq, setInpcAdq] = useState(props.inpcData[0].indice);
    const [inpcDisp, setinpcDisp] = useState(props.inpcData[1].indice);
    const [factor, setFactor]= useState(Number((props.inpcData[1].indice/props.inpcData[0].indice).toFixed(4)))
    const [monthLast, setMonthLast] = useState(props.inpcData[1].mes);
    const [yearLast, setYearLast]=useState(props.inpcData[1].ejercicio);
    const [bookValue, setBookValue] = useState(props.cost - props.depreciation);
    const [gainLose, setGainLose]= useState(props.salePrice-bookValue);
    const [fiscalValue, setFiscalValue] = useState(bookValue*factor);
    const [fiscalGainLose, setFiscalGainLose] = useState(Number((props.salePrice-fiscalValue).toFixed(2)));

    useEffect(()=>{
        setInpcAdq(props.inpcData[0].indice);
        setinpcDisp(props.inpcData[1].indice);
        setFactor(Number((props.inpcData[1].indice/props.inpcData[0].indice).toFixed(4)));
        setMonthLast(props.inpcData[1].mes);
        setYearLast(props.inpcData[1].ejercicio);
        setBookValue(props.cost - props.depreciation);
        setGainLose(props.salePrice-bookValue);
        setFiscalValue(
            Number(props.cost - props.depreciation)*Number((props.inpcData[1].indice/props.inpcData[0].indice).toFixed(4))
        )
        setFiscalGainLose(
            props.salePrice-Number(props.cost - props.depreciation)*Number((props.inpcData[1].indice/props.inpcData[0].indice).toFixed(4))
        )
    });


        
    return(
        <div className='summary'>

            <table>
                <tbody>
                
      
                    <tr>
                        <td>Fecha adquisicion: </td>
                        <td>{props.dateAdq}</td>
                    </tr>
                    <tr>
                        <td>Fecha ultimo periodo de uso:</td>
                        <td>{props.dateDisp}</td>
                    </tr>
                    <tr>
                        <td>Primera mitad periodo de uso: </td>
                        <td>{monthLast} {yearLast}</td>
                    </tr>
                    <tr>
                        <td>INPC fecha de adquisicion:</td>
                        <td>{inpcAdq}</td>
                    </tr>
                    <tr>
                        <td>INPC ultimo mes de 1a. mitad del periodo de uso:</td>
                        <td>{inpcDisp}</td>
                    </tr>
                    <tr>
                        <td>Factor de actualizacion:</td>
                        <td>{factor}</td>
                    </tr>
                    <tr><td>------Calculo Contable-------</td></tr>
                     
                    <tr>
                        <td>Monto original de la inversion:</td>
                        <td><NumericFormat className="numeric" value={props.cost} thousandSeparator disabled /></td>
                    </tr>
                    <tr>
                        <td>Depreciacion Acumulada:</td>
                        <td><NumericFormat className="numeric" value={props.depreciation} thousandSeparator disabled/></td>
                    </tr>
                    <tr>
                        <td>Valor en libros:</td>
                        <td><NumericFormat className="numeric" value={bookValue} decimalScale={2} thousandSeparator disabled/></td>
                    </tr>
                    <tr>
                        <td>Valor de Venta del activo:</td>
                        <td><NumericFormat className="numeric" value={props.salePrice} thousandSeparator disabled/></td>
                    </tr>
                    <tr>
                        <td>Ganancia o perdida contable:</td>
                        <td><NumericFormat className="numeric" value={gainLose} decimalScale={2} thousandSeparator disabled/></td>
                    </tr>
                    <tr><td>------Calculo Fiscal --------</td></tr>
                    <tr>
                        <td>Valor de Venta del activo:</td>
                        <td><NumericFormat className="numeric" value={props.salePrice} decimalScale={2} thousandSeparator disabled/></td>
                    </tr>
                    <tr>
                        <td>Valor en libros actualizado:</td>
                        <td><NumericFormat className="numeric" value={fiscalValue} decimalScale={2} thousandSeparator disabled/></td>
                    </tr>
                    <tr>
                        <td>Ganancia o perdida fiscal:</td>
                        <td><NumericFormat className="numeric" value={fiscalGainLose} decimalScale={2} thousandSeparator disabled/></td>
                    </tr>
                
                </tbody>

            </table>
              
    </div>

    )
    
}