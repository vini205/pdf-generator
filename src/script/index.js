console.log("Working");

/*
  Functions
*/
function c(txt) {
      console.log(txt);
} 
function getElement(id=undefined,className=undefined,tag=undefined) {
  if(className===undefined && tag === undefined){
    return document.getElementById(id);
  }else if(tag===undefined){
    return document.getElementsByClassName(className);
  } else{
    return document.querySelectorAll(tag);
  }
}
function putInInput(data,input) {
  for (const i of input) {
    i.value=data; 
  }
}

function addInObj([data,name=data], obj) {
  obj[name]=data;
}
function fixDate(date) {
  let ano = date.slice(0,4);
  let mes = date.slice(5,7);
  let dia = date.slice(8);
  return `${dia}/${mes}/${ano}`;
}
function addTOTable(data,where) {  
  if(data.tagNAme=='TEXTAREA'){

    where.value=`${data.value}`;  

  } else if(data.type=='date'){

    let date = fixDate(data.value);

    if(where.innerHTML=='/2023'){

      where.innerHTML =`${date}`; 

    }else{

      where.innerHTML +=`: ${date}`; 
    }
  }else if(data.type=='time'){
    where.innerHTML =`${data.value}`; 
  }
   else{
    where.innerHTML+=`: ${data.value}`;
  }    
}

/*
  Variables
*/

const ICHAMADO = getElement('ichamado'),
INAMETEC = getElement('inametec'),
ICLIENTE = getElement('icliente'),
IDATA = getElement('idata'),
IENDERECO = getElement('iendereco'),
ICIDADE = getElement('icidade'),
IESTADO = getElement('iestado'),
ITIPO = document.getElementsByName('itipo'),
ITIPOoUTRO = getElement('itipoOutro'),
IMOTIVO = getElement('imotivo'),
IHORAIN = getElement('iHoraIn'),
IHORAOUT = getElement('iHoraOut'),
IDATAOUT = getElement('idataOut'),
IESPACO =  getElement('iespaco'),
IDEFEITO = getElement('idefeito'),
ICAUSA = getElement('icausa'),
ISERVICO = getElement('iservico'),
IMATERIALNUMBER = getElement('imaterialNumber'),
IOBS = getElement('iobs');

const TCHAMADO = getElement('tchamado'),
TCLIENTE = getElement('tcliente'),
TDATA = getElement('tdata'),
TENDERECO = getElement('tendereco'),
TCIDADE = getElement('tcidade'),
TESTADO = getElement('testado'),
TTABLETYPE = document.getElementsByName('iTableType'),
TTIPOOUTRO = getElement('ttipoOutro'),
TMOTIVO = getElement('tmotivo'),
TDATAIN = getElement('tdataIn'),
TDATAOUT = getElement('tdataOut'),
ThoraIN = getElement('thoraIn'),
THORAOUT = getElement('thoraOut'),
TESPACO = getElement('tespaco'),
TDEFEITO = getElement('tdefeito'),
TCAUSA = getElement('tcausa'),
TSERVICO = getElement('tservico'),
TOBS = getElement('tobs'),
TCLI = getElement('tcli'),
TTEC = getElement('ttec');

const btn = getElement('btn');

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();

putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
putInInput(['SP'],[IESTADO]);

IDATAOUT.oninput=c(IDATAOUT.value);


const pass1 = [INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,IDATA,TDATAIN,IDATAOUT,TDATAOUT,
IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO,IOBS,TOBS,ICAUSA,TCAUSA,IDEFEITO,TDEFEITO,ISERVICO,TSERVICO,
IHORAIN,ThoraIN,IHORAOUT,THORAOUT,IMOTIVO,TMOTIVO];

btn.addEventListener('click',add);
/* 
Add funciona porque é como se fosse um atributo que é atribuido ao evento, e dps roda como uma função
para mais shorturl.at/bdi39. 
Se colocar add() ele roda a função que retorna undefined.

*/ 
function add() {
  for (let i = 0; i < pass1.length; i+=2) {
    addTOTable(pass1[i],pass1[i+1]);
  }
  TESPACO.innerHTML = IESPACO.value+ ' Km';
  let i = 0;
    if (ITIPO[i].checked) {
      TTABLETYPE[i].checked= true;
    }else if(ITIPO[i+1].checked){
      TTABLETYPE[i+1].checked=true;
    }else{
      TTABLETYPE[2].checked=true;
      TTIPOOUTRO.innerHTML= ITIPOoUTRO.value;
    }
  document.querySelector('.table').style.display='block';
  document.querySelector('.form').style.display='none';
}


 