

//SPLIT DATE, RETRIEVE THE MONTH AND YEAR AS INTEGERS
const getDate = async (date) => {
    return {
        month:Number(date.substring(5, 7)),
        year: Number(date.substring(0, 4)) 
    };    
}

//Determina el ultimo periodo de uso
function getLastPeriod(dateRef1, dateRef2) {
    let firstHalfMonth;
    let firstHalfYear;
    let isSame = dateRef1.year === dateRef2.year;
    if (isSame) {
        //determinar el ultimo mes de la primera mitad del periodo de uso
        let reference = (dateRef2.month - dateRef1.month) / 2
        
        if (reference <= 1) firstHalfMonth = dateRef1.month;
        else if (reference <= 2) firstHalfMonth = dateRef1.month + 1;
        else if (reference <= 3) firstHalfMonth = dateRef1.month + 2;
        else if (reference <= 4) firstHalfMonth = dateRef1.month + 3;
        else if (reference <= 5) firstHalfMonth = dateRef1.month + 4;
        else firstHalfMonth = dateRef1.month + 5;

    } else {
        let reference = dateRef2.month / 2
        
        reference <= 1 ? firstHalfMonth = 1 : firstHalfMonth = Math.floor(dateRef2.month / 2);
    }
    firstHalfYear = dateRef2.year
    
    return [firstHalfMonth, firstHalfYear];
}


//REQUEST INPC TO DATABASE
//dateAdq = Asset Adquisition date
//dateDisp = Asset last period date
export async function getInpc(dateAdq, dateDisp) {
    //TRANSFORM dates of dateAdq and dateDisp to month, year 
    let dataAdq= await getDate(dateAdq);
    let dataDisp = await getDate(dateDisp);
  
    
   
    //CALCULATE LAST PERIOD OF USE
    let dataLastPeriod = getLastPeriod(dataAdq, dataDisp);
    
    let data ={ 
        monthAdq:dataAdq.month, 
        yearAdq:dataAdq.year,
        monthDisp:dataLastPeriod[0], 
        yearDisp:dataLastPeriod[1]
    }
    
    //REQUEST INPC'S
    let url = `${process.env.REACT_APP_ENDPOINT}/getInpc`;
    let init = {
        method: 'POST',
        body: JSON.stringify({data}),
        cache: 'default',
        headers: { 'Content-Type': 'application/json', }
    };
    let response = await fetch(url, init);
    let json = await response.json();
  
    return json.data
}
/*
const getIndex = async () => {
    ASSET.option === false ? getLastPeriod(ASSET.adq_date, ASSET.sell_date) : getLastPeriod(ASSET.adq_date, ASSET.opt_date);
    try {
        let index = await getInpc(ASSET.last_period.month, ASSET.last_period.year)
        //Almacena el indice en el objeto
        ASSET.last_period.index = Number(index.data.toFixed(4));
        //Ejecuta metodo que calcula y almacen el factor de actualizacion dentro del objeto ASSET
        ASSET.calculate();
        Render()
    } catch (error) {
        console.log(error)
    }


}*/


/*
const validateData = () => {
    let fields = ['adqDate', 'dispDate', 'select', 'moi', 'accDep', 'sellPrice'];
    let isComplete = true
    
    fields.forEach(field => {
        let id = document.getElementById(field).value;
        
        if (id === '') isComplete = false
    })
    
    let dateAdq = document.getElementById('adqDate').value;
    let dateSell = document.getElementById('dispDate').value;
    if (dateSell < dateAdq){
        alert("la fecha de la venta no puede ser menor a la fecha de adquisicion");
        return
    }
    if (ASSET.opt_date.year === ASSET.adq_date.year) {
        if (ASSET.adq_date.month > ASSET.opt_date.month) return alert("El mes del ultimo periodo de uso no puede ser menor al mes de adquisicion");
    }
    isComplete ? getIndex() : alert('alguno de los campos esta vacio') 
}
*/