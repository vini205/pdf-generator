console.log("Working");

/*
  Functions
*/
function c(txt) {
  console.log(txt);
} 
function getElement(id,className) {
  if(className===undefined){
    return document.getElementById(id);
  }
  return document.getElementsByClassName(className);
}
function putInInput(data,input) {
  for (const i of input) {
    i.value=data; 
  }
}

function addInObj([data,name=data], obj) {
  obj[name]=data;
}

function addTOTable(data,where,sobrescrever=false) {
  if (sobrescrever===false) {
    c(where)
    where.innerHTML+=`: ${data.value}`;
  }else{
    where.innerHTML=data.value;
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
ITIPO = getElement('itipo'),
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
TTABLETYPE = getElement('iTableType'),
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

const info = [INAMETEC,ICHAMADO,ICLIENTE,IDATA,IENDERECO,ICIDADE,IESTADO,ITIPO,ITIPOoUTRO,
  IMOTIVO,IHORAIN,IHORAOUT,IDATAOUT,IESPACO,IDEFEITO,ICAUSA,ISERVICO,IOBS,IMATERIALNUMBER];
const table = [TTEC,TCHAMADO,TCLIENTE,TDATA,TENDERECO,TCIDADE,TESTADO,TTIPOOUTRO,
  TMOTIVO,ThoraIN,THORAOUT,TDATAOUT,TESPACO,TDEFEITO,TCAUSA,TSERVICO,TOBS];

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();

class Relatorio {
  constructor(test){
    
  }
}
const relatorio = new Relatorio();

putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
putInInput(['SP'],[IESTADO]);


for (const i of info) {//adiciona inputs na class
  addInObj([i,i.id],relatorio);
}


const pass1 = [INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,
IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO]


document.querySelector('.table').style.display='block';

function add() {
  for (let i = 0; i < pass1.length; i+=2) {
    addTOTable(pass1[i],pass1[i+1]);
  }
  TESPACO.innerHTML = IESPACO.value+ 'Km';
}


 